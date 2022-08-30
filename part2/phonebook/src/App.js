import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  const handleInputChange = callback => e => callback(e.target.value);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber }

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      })
    
  }

  const deletePerson = obj => () => {
    if (window.confirm(`Are you sure you want to delete ${obj.name}`)) {
      personsService
        .deleteAtId(obj.id)
        .then(res => {
          console.log(res);
          setPersons(persons.filter(person => person !== obj));
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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