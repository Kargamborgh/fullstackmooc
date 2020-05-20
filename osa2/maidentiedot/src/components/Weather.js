import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {

    const [weatherData, setWeatherData] = useState([
        {
            request: {
            type: "City",
            query: "New York, United States of America",
            language: "en",
            unit: "m"
            },
            location: {
            name: "New York",
            country: "United States of America",
            region: "New York",
            lat: "40.714",
            lon: "-74.006",
            timezone_id: "America/New_York",
            localtime: "2020-05-20 10:50",
            localtime_epoch: 1589971800,
            utc_offset: "-4.0"
            },
            current: {
            observation_time: "02:50 PM",
            temperature: 666,
            weather_code: 113,
            weather_icons: [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
            ],
            weather_descriptions: [
            "Sunny"
            ],
            wind_speed: 0,
            wind_degree: 69,
            wind_dir: "ENE",
            pressure: 1032,
            precip: 0,
            humidity: 49,
            cloudcover: 0,
            feelslike: 13,
            uv_index: 8,
            visibility: 16,
            is_day: "yes"
            }
            }
    ])
    const api_key = process.env.REACT_APP_API_KEY

    /*const weatherDataHook = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
        .then(response => {
            console.log(response.data)
            setWeatherData(response.data.current)
        })
    }

    useEffect(weatherDataHook, []) */

    console.log(weatherData)

        return (
            <div>
                {weatherData.filter(w => w.current).map(y => y.temperature)}
            </div>
        )
}

export default Weather