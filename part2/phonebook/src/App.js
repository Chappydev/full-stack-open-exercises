import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(res => {
        setPersons(persons.concat(res.data));
      })
    
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
      <Persons persons={persons} filterText={filterText} />
    </div>
  )
}

export default App