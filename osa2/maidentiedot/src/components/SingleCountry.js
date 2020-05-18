import React from 'react'

const SingleCountry = ({ country, filterValue }) => {
    const ThisCountry = country.filter(country => country.name.toLowerCase().includes(`${filterValue}`))

    /*const languageMap = ({ country }) => {
        country.languages.map((lang, i) => lang.name)
        } */
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
                        <li>{ThisCountry.map(country => country.languages[0].name)}</li>
                    </ul>
                <div>
                    Flag:
                    <img src={ThisCountry.map(country => country.flag)} />
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