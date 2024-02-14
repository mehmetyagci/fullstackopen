import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  console.log('App');
  const [persons, setPersons] = useState([{ id: 1, name: 'Arto Hellas', phone: '111-222-333' }]) 
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

    const existingPersonName = persons.some(person => person.name === newName);
    console.log('existingPersonName', existingPersonName)
    if (existingPersonName) {
      alert(`${newName} name is already added to phonebook`)
      return;
    }

  const existingPersonPhone = persons.some(person => person.phone === newPhone);
    console.log('existingPersonPhone', existingPersonPhone)
    if (existingPersonPhone) {
      alert(`${newPhone} phone is already added to phonebook`)
      return;
    }

    console.log(`Adding ${newName} since it doesn't exist in the phonebook.`);
    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
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
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App