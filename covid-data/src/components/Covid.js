import  React, { useState, useEffect} from 'react'
import './Covid.css'

export function Covid(){

  const [data, setData] = useState([]);
    const [theme, setTheme] = useState('dark-mode');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const toggle = () => {
        if (theme === "dark-mode") {
            setTheme('light-mode');
        } else {
            setTheme('dark-mode');
        }
    }

    const getCovidData = async () => {
            const res = await fetch('https://data.covid19india.org/data.json');
            const actualData = await res.json();
            console.log(actualData.statewise);
            setData(actualData.statewise)
                  } 

    

    useEffect(() => {
        getCovidData();
    }, []);


  return(
    <>
      <div className='container'>
        <div className='heading'><h1>Covid-19 Live Updates</h1></div>
        <table className='table'>
          <thead>
            <tr>
              <th>STATE</th>
              <th>CONFIRMED</th>
              <th>DEATH</th>
              <th>ACTIVE</th>
              <th>RECOVERED</th>
              <th>UPDATED</th>
            </tr>
          </thead>
          <tbody>

            {data.map((currentElement, index) => {
              return(
                <tr>
                  <td>{currentElement.state}</td>
                  <td>{currentElement.confirmed}</td>
                  <td>{currentElement.deaths}</td>
                  <td>{currentElement.active}</td>
                  <td>{currentElement.recovered}</td>
                  <td>{currentElement.lastupdatedtime}</td>
                </tr>
              )
            })}
            
          </tbody>
        </table>

        <div className='changeTheme'>
                    <button class="btn" onClick={() => toggle()}>Toggle Mode</button>
                </div>
      </div>
    </>
  )
}