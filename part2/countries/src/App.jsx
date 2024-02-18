import { useState, useEffect } from 'react'

import countriesService from './services/countries';

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

  if(countriesFiltered != undefined && countriesFiltered.length > 0) {
     console.log(countriesFiltered[0].name.common)  
  }

  return (
    <div>
      <Notification notification={notification}  />
      <Filter filter={filter} setFilter={setFilter} />
      {countriesFiltered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesFiltered.length === 1 ? (
        <CountryDetail
              key={countriesFiltered[0].name.common}
              country={countriesFiltered[0]}
            />
      ) : (
        <div>
          {countriesFiltered.map(country =>
            <Country
              key={country.name.common}
              country={country}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App