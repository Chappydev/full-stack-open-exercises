import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "205-12345" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleInputChange = callback => e => callback(e.target.value);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
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