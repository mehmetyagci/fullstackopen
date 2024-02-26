const Person = ({ person, deletePerson, getPerson }) => {
  console.log('Person');
  console.log('person', person)
    return (
      <li>
        {person.name} {person.number} 
        <button onClick={deletePerson}>delete</button>
        <button onClick={getPerson}>get</button>
      </li>
    )
  }
  
  export default Person