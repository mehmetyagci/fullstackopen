import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.some(person => person.name === newName);
    console.log('existingPerson', existingPerson)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    console.log(`Adding ${newName} since it doesn't exist in the phonebook.`);
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <input value={newName} onChange={handleNameChange} />
        <button type="submit">add</button>
      </form> 
      
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => 
          <Person key={index} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App