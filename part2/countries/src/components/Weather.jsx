import React, { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const baseUrl = 'https://openweathermap.org/img/wn/';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = "54e45662907323fb69fc5708d8bfc1f3";

    useEffect(() => {
        const lat = country.latlng[0];
        const lon = country.latlng[1];
        
        weatherService.get(lat, lon, apiKey)
            .then(initialWeather => {
                setWeather(initialWeather);
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                setError(`Failed to fetch weather data: ${error.message}`);
            });
    }, [country, apiKey]); // Add country and apiKey to the dependency array

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Weather info</h2>
            {error && <p>Error: {error}</p>}
            {
                <>
                    <p>Temperature: {weather.main.temp} Celsius</p>
                    <img src={`${baseUrl}${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
            }
        </div>
    );
};

export default Weather;
