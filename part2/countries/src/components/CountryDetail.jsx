const CountryDetail = ({ country }) => {
    console.log('Country');
    console.log(country);
    // console.log(`${country.name.common} ${country.name.official}`);
    return (
      <div>
        <h2>{country.name.common}</h2>
         <h3>capital</h3> 
         <ul>
           {Object.values(country.capital).map(capital => <li key={capital}>{capital}</li>)}
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
      </div>
    )
  }
  
  export default CountryDetail