const Country = ({ country ,showCountry}) => {
    // console.log('Country');
    // console.log(country);
    // console.log(`${country.name.common} ${country.name.official}`);
    return (
      <div>
        {country.name.common} - {country.name.official}
        <button onClick={showCountry}>show</button>
      </div>
    )
  }
  
  export default Country