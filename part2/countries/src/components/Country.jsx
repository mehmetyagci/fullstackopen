const Country = ({ country }) => {
    // console.log('Country');
    // console.log(country);
    // console.log(`${country.name.common} ${country.name.official}`);
    return (
      <div>
        {country.name.common} - {country.name.official}
      </div>
    )
  }
  
  export default Country