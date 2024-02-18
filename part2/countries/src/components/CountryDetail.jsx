import React from 'react';
import Weather from "./Weather";

const CountryDetail = ({ country }) => {
  console.log('CountryDetail');
  console.log('country', country);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>capital</h3>
      <ul>
        {country.capital.map((capital, index) => <li key={index}>{capital}</li>)}
      </ul>
      <h3>area</h3>
      <ul>
        <li>{country.area}</li>
      </ul>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </div>
  )
}

export default CountryDetail