import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(err => {
        setIsError(true);
        setNotificationMessage('Could not get phonebook data from server');
        setTimeout(() => {
          setNotificationMessage('');
        }, 4000);
        console.error(err.message);
      })
  }, [])

  const handleInputChange = callback => e => callback(e.target.value);

  const handleFormSubmit = e => {
    e.preventDefault();

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName);
        const newPerson = {...existingPerson, number: newNumber};
        personsService
          .updateNumber(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map((person) => {
              return person.id !== returnedPerson.id ? person : returnedPerson;
            }))
            setIsError(false);
            setNotificationMessage(`Successfully updated ${returnedPerson.name}'s number`);
            setTimeout(() => {
              setNotificationMessage('');
            }, 4000);
          })
          .catch(err => {
            setIsError(true);
            setNotificationMessage('That person has already been removed from the server');
            setTimeout(() => {
              setNotificationMessage('');
            }, 4000);
            console.error(err.message);
          })
      }
      
      return;
    }

    const newPerson = { name: newName, number: newNumber }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setIsError(false);
        setNotificationMessage(`Successfully added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage('');
        }, 4000);
      })
      .catch(err => {
        setIsError(false);
        setNotificationMessage('Failed to add person to the server');
        setTimeout(() => {
          setNotificationMessage('');
        }, 4000);
        console.error(err.message);
      })

  }

  const deletePerson = obj => () => {
    if (window.confirm(`Are you sure you want to delete ${obj.name}`)) {
      personsService
        .deleteAtId(obj.id)
        .then(res => {
          setPersons(persons.filter(person => person !== obj));
        })
        .catch(err => {
          alert("Failed to delete the person. This user may already be deleted on the server");
          console.error(err.message);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter
        filterText={filterText}
        setFilterText={setFilterText}
        onChange={handleInputChange}
      />
      <h3>Add New</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onChange={handleInputChange}
        onClick={handleFormSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterText={filterText} onClick={deletePerson} />
    </div>
  )
}

export default App