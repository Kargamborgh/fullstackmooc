import React, {useState, useEffect } from 'react'
import Languages from './Languages'
import Weather from './Weather'

const SingleCountry = ({ country, filterValue, api_key }) => {
    const ThisCountry = country.filter(country => country.name.toLowerCase().includes(`${filterValue}`))
    const theseLanguages = ThisCountry.map(c => c.languages)
    const [ weatherData, setWeatherData ] = useState([])

    //console.log(ThisCountry)
    //console.log(theseLanguages)

        if (ThisCountry.length === 1) {
            return (
                <>
                <h1>
                {ThisCountry.map(country => country.name)}
                </h1>
                <div>
                    {'Capital: '}
                    {ThisCountry.map(country => country.capital)}
                </div>
                <div>
                    {'Population: '}  
                    {ThisCountry.map(country => country.population)}
                </div>
                <h2>
                    Languages:   
                </h2>
                    <ul>
                        {ThisCountry.map((c, i) =>
                        <Languages key={i} languages={c.languages.map(d => d.name)} length={i} />
                        )}
                    </ul>
                <div>
                    Flag:
                    <img src={ThisCountry.map(country => country.flag)} alt={`flag of ${ThisCountry.map(country => country.name)}`} />
                </div>
                <div>
                    {`Weather in ${ThisCountry.map(country => country.capital)}:`}
                    <Weather city={ThisCountry.map(country => country.capital)} />
                </div>
                </>
            )
        }
        else {
            return (
                null
            )
        }
    
}

export default SingleCountry