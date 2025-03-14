import { useState, useEffect } from 'react'
import './App.css'
import LineGraph from './LineGraph'

function App() {
  const [dataLast2Hours, setDataLast2Hours] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mangaorestreamapi.azurewebsites.net/api/MangaoreStreamAPIFunction?scale=L2H')
        const data = await response.json()
        setDataLast2Hours(data)
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function checkRiverStatus(data) {
    if (data[0].IsSwimmable === false || data[0].IsSwimmable === 0) {
      return '*WARNING* Swimming not recommended due to contamination - check Lawa for updates'
    }
    if (data[0].Flow > 2) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].Flow < 2) {
          if (j < 45) {
              const date = new Date(data[j].Date)
              const formattedTime = `${date.getHours()}:${date.getMinutes()}`
              const dangerTime = new Date(date.getTime() + 45 * 60000)
              const formattedDangerTime = `${dangerTime.getHours()}:${dangerTimeTime.getMinutes()}`
              return `*WARNING* Swimming not recommended` // - Dam was opened at ${formattedTime}, river should rise by ${formattedDangerTime}`
          }
        }
        return '*WARNING* Swimming not recommended'
      }
    }
    else {
      for (let j = 0; j < data.length; j++){
        if (data[j].Flow > 2) {
          if (j < 105) {
            const date = new Date(data[j].Date)
            const formattedTime = `${date.getHours()}:${date.getMinutes()}`
            const safeTime = new Date(date.getTime() + 105 * 60000)
            const formattedSafeTime = `${safeTime.getHours()}:${safeTime.getMinutes()}`
            return `*WARNING* Swimming not recommended` // - Dam was closed at ${formattedTime}, river should subside by ${formattedSafeTime}`
          }
        }
      }
    }
  return 'Good for swimming'
}


  return (
    <>
      <div className="Header">
        <div className='HeaderText'>Mangaore Stream Monitor</div>
      </div>
      <div className="ContentBar">
        <div className='ContentCard'>
          <div className="CardHeader">Status</div>
          <div className="CardValue">
            {dataLast2Hours.length === 0 ? '  Loading' : `${checkRiverStatus(dataLast2Hours)}`}
          </div>
        </div>
        <div className='ContentCard'>
          <div className="CardHeader">Power Station Outflow (m3/s)</div>
          <div className="CardValue">
            <div className='GiantNumber'>{dataLast2Hours.length === 0 ? '...' : `${dataLast2Hours[0].Flow}`}</div>
          </div>
        </div>
      </div>
      <div className="GraphCard">
        {dataLast2Hours.length === 0 ? 'Loading' : LineGraph({ data: dataLast2Hours })}
      </div>
      <div className="Footer"> 
        <div className='FooterDisclaimer'>This website is not affiliated with Manawa Energy, LAWA, or Horowhenua District Council.  Swimming in the river is done at your own risk.</div>
      </div>
      <div className="Footer">
        {/* <div className='FooterText'><a href='https://donaldanixon.github.io/me'>Website by Donald Nixon</a></div> */}
        <div className='FooterText'><a href='https://www.manawaenergy.co.nz/mangahao-power-station'>View River Flow Data from Manawa Energy</a></div>
        <div className='FooterText'><a href='https://www.lawa.org.nz/explore-data/manawatu-whanganui-region/swimming/mangaore-stream-at-downstream-mangahao-power-station/swimsite'>View Water Quality Data from LAWA</a></div>
      </div>
    </>
  )
}

export default App
