import { useState, useEffect } from 'react'

import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter'
import Person from './components/Person'

const App = () => {
  console.log('App');
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


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

    const existingPerson = persons.find(person => person.name === newName);
    console.log('existingPerson', existingPerson)

    if(existingPerson) // Update 
    { 
      const confirmUpdate = window.confirm(`${newName} already exists in the phonebook. Do you want to update the phone number?`);
       if(confirmUpdate) {
        console.log(`Updating ${newName}' phone.`);
        const updatedPerson = {
          ...existingPerson,
          phone: newPhone,
        };
        personService
          .update(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
                  setNewName('');
                  setNewPhone('');
          }).catch(error => {
            console.error('Error updating person:', error);
            alert(`Error updating ${existingPerson.name}`);
        });
       }
    } else  // insert
    {
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
        id: (persons.length + 1).toString(),
      }
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewPhone('')
        }).catch(error => {
          console.error('Error adding person:', error);
          alert(`Error adding ${newName}`);
      });
    }
    
    console.log('addPerson button clicked', event.target)
  }

  const deletePersonOf = id => {
    console.log('deletePersonOf', id)
    const url = `http://localhost:3001/persons/${id}`

    // Find the person by id
    const personIndex = persons.findIndex(person => person.id === id);
    const personToDelete = persons[personIndex];

    // If the person doesn't exist, exit the function
    if (personIndex === -1) {
      console.log(`Person with ID ${id} not found in the list`);
      return;
    }
  
    // Delete the person from the server
    personService
        .deletePerson(id)
        .then(() => {
          console.log(`Successfully deleted person with ID ${id} from the server`);
          // Update the state to remove the deleted person
          setPersons(prevPersons => {
            const updatedPersons = [...prevPersons];
            updatedPersons.splice(personIndex, 1);
            return updatedPersons;
          });
      })
      .catch(error => {
        console.error('Error deleting person:', error);
        alert(`Error deleting person with ID ${id} from the server`);
      });
  }

  const getPersonOf = id => {
    console.log('getPersonOf', id)
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    console.log('person', person)
  
    personService
        .get(id)
        .then(returnedPerson => {
          console.log('returnedPerson', returnedPerson)
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was not exist in server`
        )
      })
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
          <Person 
            key={person.id} 
            person={person} 
            deletePerson={() => deletePersonOf(person.id)}
            getPerson={() => getPersonOf(person.id)}
            />
        )}
      </ul>
    </div>
  )
}

export default App