import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {

    const [weatherData, setWeatherData] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    const weatherDataHook = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
        .then(response => {
            setWeatherData(response.data)
            //console.log(response.data)
        })
    }

    useEffect(weatherDataHook, [])
    console.log(weatherData)

    return (
        <div>
            Temperature:
            tähän weather.current.temperature mutta async kusee mun muroihin,
            state ei oo valmis kun sitä koitetaan lukea
        </div>
    )
}

export default Weather