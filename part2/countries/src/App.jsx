import { useState, useEffect } from 'react'

import countriesService from './services/countries';

import Country from './components/Country'
import CountryDetail from './components/CountryDetail'
import Filter from './components/Filter'

import './App.css'

const App = () => {
  console.log('App');

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      }).catch(error => {
        console.error('Failed to fetch countries:', error);
      });
  }, [])

  const showCountry = name => {
    console.log('showCountry', name)
    setFilter(name)
  }

  const countriesFiltered = filter === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const renderFilteredContent = () => {
    if (filter === '') {
      return null; // Show nothing if filter is empty
    }
    if (countriesFiltered.length === 0) {
      return <p>No matching countries found.</p>; // Inform user if no records found
    }

    if (countriesFiltered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countriesFiltered.length === 1) {
      return <CountryDetail key={countriesFiltered[0].name.common} country={countriesFiltered[0]} />;
    }

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

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {renderFilteredContent(countriesFiltered)}
    </div>
  )
}

export default App