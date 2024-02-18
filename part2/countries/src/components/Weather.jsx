
const baseUrl = 'https://openweathermap.org/img/wn/';

const Weather = ({ weather }) => {
    console.log('Weather component');
    console.log('weather', weather);

    return (
      <div>
        <h2>Weather info</h2>
        <p>temperature: {weather.main.temp} Celsius</p>
        <img src={`${baseUrl}${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /> 
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
  export default Weather