import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import SingleCountry from './components/SingleCountry'

const App = () => {
  const [ countryData, setCountryData ] = useState([])
  const [ filterValue, setFilterValue ] = useState('')

  const countryDataHook = () => {
    console.log('effect logging lol')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('fulfilled promise')
      setCountryData(response.data)
    })
  }

  useEffect(countryDataHook, [])

  const handleFilterValue = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const countriesToShow = countryData.filter(country => country.name.toLowerCase().includes(`${filterValue}`))
  
  const countryArrayLength = countryData.filter(country => country.name.toLowerCase().includes(`${filterValue}`)).length
  
  console.log(countryArrayLength)

  /*Countries matching filter criteria:
  {countriesToShow.map((country, i) =>
  <Country key={country.name} country={country}/>
  )} */

  return (
    <>
    <div>
      <Filter filterValue={filterValue}
      handleFilterValue={handleFilterValue} />
    </div>
    {countryArrayLength > 10 &&
    <div>
     Too many countries, narrow search pls  
    </div>
    }
    <SingleCountry filterValue={filterValue} countryData={countryData} />
    </>
  )
}



export default App
