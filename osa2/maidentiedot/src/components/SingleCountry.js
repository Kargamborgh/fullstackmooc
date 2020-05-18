import React from 'react'

const SingleCountry = ({ countryData, filterValue }) => {
    const ThisCountry = countryData.filter(country => country.name.toLowerCase().includes(`${filterValue}`))

    /*const languageMap = ({ country }) => {
        country.languages.map((lang, i) => lang.name)
        } */
console.log(ThisCountry.map(country => country.languages[0].name))
    return (
        <>
        <h1>
        {ThisCountry.map(country => country.name)}
        </h1>
        <div>
            Capital: 
            {ThisCountry.map(country => country.capital)}
        </div>
        <div>
            Population: 
            {ThisCountry.map(country => country.population)}
        </div>
        <h2>
            Languages:
        </h2>
            <ul>
                <li>{ThisCountry.map(country => country.languages[0].name)}</li>
            </ul>
        <div>
            Flag:
            {ThisCountry.map(country => country.flag)}
        </div>
        </>
    )
}

export default SingleCountry