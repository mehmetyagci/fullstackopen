import { useState, useEffect } from 'react'

import countriesService from './services/countries';
import weatherService from './services/weather';

import Country from       './components/Country'
import CountryDetail from './components/CountryDetail'
import Filter from        './components/Filter'
import Notification from  './components/Notification'

import './App.css'

const App = () => {
  console.log('App');

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification]  = useState(null)
  const [weather, setWeather] = useState('')

  const showNotification = (message, notificationType) => {
    setNotification({ message, notificationType });
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };
  
  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const countriesFiltered = filter === ''
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  console.log('countriesFiltered', countriesFiltered)

  const showCountry = name => {
    console.log('showCountry', name)
    setFilter(name)

    const lat = countriesFiltered[0].latlng[0];
    console.log('lat', lat); 
    const lon = countriesFiltered[0].latlng[1];
    console.log('lon', lon);

    weatherService
      .get(lat, lon)
      .then(initialWeather => {
        console.log('initialWeather', initialWeather)
        setWeather(initialWeather)
      })
  }
 
  const renderFilteredContent = (countriesFiltered) => {
    if (countriesFiltered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesFiltered.length === 1) {
      return <CountryDetail key={countriesFiltered[0].name.common} country={countriesFiltered[0]} weather={weather} />;
    } else {
      return (
        <div>
          {countriesFiltered.map(country =>
            <Country key={country.name.common} 
            country={country}  
            showCountry={() => showCountry(country.name.common)}
            />
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <Notification notification={notification}  />
      <Filter filter={filter} setFilter={setFilter} />
      {filter !== '' && (
        renderFilteredContent(countriesFiltered)
      )}
     
    </div>
  )
}

export default App