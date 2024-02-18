import { useState, useEffect } from 'react'

import personService from './services/persons';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter'
import Person from './components/Person'

import Notification from './components/Notification'

const App = () => {
  console.log('App');
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification]  = useState(null)

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
              showNotification(`${newName}'s phone number was updated`, 'success');
          }).catch(error => {
            console.error('Error updating person:', error);
            showNotification(`Error updating ${existingPerson.name}`, 'error');
        });
       }
    } else  // insert
    {
      const existingPersonName = persons.some(person => person.name === newName);
      console.log('existingPersonName', existingPersonName)
      if (existingPersonName) {
        setNotification(`${newName} name is already added to phonebook`,  'error');
        return;
      }

      const existingPersonPhone = persons.some(person => person.phone === newPhone);
      console.log('existingPersonPhone', existingPersonPhone)
      if (existingPersonPhone) {
        setNotification(`${newPhone} phone is already added to phonebook`, 'error');
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
            showNotification(`${newPhone} phone is successfullt added to phonebook`, 'success' );
        }).catch(error => {
          console.error('Error adding person:', error);
          showNotification(`Error adding ${newName} person. Details:${error}`, 'error');
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
      showNotification(`Person with ID ${id} not found in the list`, 'error');
      return;
    }
  
    // Delete the person from the server
    personService
        .deletePerson(id)
        .then(() => {
          console.log(`Successfully deleted person with ID ${id} from the server`);
          showNotification(`Successfully deleted person with ID ${id} from the server`, 'success');
          // Update the state to remove the deleted person
          setPersons(prevPersons => {
            const updatedPersons = [...prevPersons];
            updatedPersons.splice(personIndex, 1);
            return updatedPersons;
          });
      })
      .catch(error => {
        console.error('Error deleting person:', error);
        showNotification(`Information of ${personToDelete.name} has already been removed from server`, 'error');
        setPersons(persons.filter(p => p.id !== id))
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
        showNotification(`the person '${person.name}' was not exist in server`, 'error');
      })
  }

  const personsFiltered = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const showNotification = (message, notificationType) => {
    setNotification({ message, notificationType });
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}  />
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