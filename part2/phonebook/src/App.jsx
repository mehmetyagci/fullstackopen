import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '111-222-333' }]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
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
        <div><input value={newName} onChange={handleNameChange} /></div> 
        <div><input value={newPhone} onChange={handlePhoneChange} /></div> 
        <div><button type="submit">add</button></div>
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