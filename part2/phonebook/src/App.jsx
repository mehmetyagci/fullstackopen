import { useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter'
import Person from './components/Person'

const App = () => {
  console.log('App');
  const [persons, setPersons] = useState([
    {  name: 'Arto Hellas', number: '040-123456', id: 1 },
    {  name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    {   name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    {  name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newPhone={newPhone} 
      handlePhoneChange={handlePhoneChange} />
      <h3>Numbers</h3>
      <ul>
        {personsFiltered.map(person => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App