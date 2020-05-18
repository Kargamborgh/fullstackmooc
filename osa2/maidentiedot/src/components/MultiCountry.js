import React from 'react'

const MultiCountry = ({ filterValue, country }) => {
    //console.log(filterValue)
    //console.log(country.filter(country => country.name.toLowerCase().includes(`${filterValue}`)))
    if (country.filter(country => country.name.toLowerCase().includes(`${filterValue}`)) < 10) {
        return (
                <div>
                    {country.name}
                </div>
        )
    }
    else {
        return (
            null
        )
    }
}

export default MultiCountry