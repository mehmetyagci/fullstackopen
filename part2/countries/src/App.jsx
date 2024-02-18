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
 
  const renderFilteredContent = (countriesFiltered) => {
    if (countriesFiltered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesFiltered.length === 1) {
      return <CountryDetail key={countriesFiltered[0].name.common} country={countriesFiltered[0]} />;
    } else {
      return (
        <div>
          {countriesFiltered.map(country =>
            <Country key={country.name.common} country={country} />
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