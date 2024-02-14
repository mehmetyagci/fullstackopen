import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  console.log('App');
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456', id: 1 },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { id: 4,name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

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

  const personsFiltered = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div><input value={newName} onChange={handleNameChange} /></div> 
        <div><input value={newPhone} onChange={handlePhoneChange} /></div> 
        <div><button type="submit">add</button></div>
      </form> 
      
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App