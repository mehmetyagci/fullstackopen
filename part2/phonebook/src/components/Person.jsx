const Person = ({ person, deletePerson, getPerson }) => {
    return (
      <li>
        {person.name} {person.phone} 
        <button onClick={deletePerson}>delete</button>
        <button onClick={getPerson}>get</button>
      </li>
    )
  }
  
  export default Person