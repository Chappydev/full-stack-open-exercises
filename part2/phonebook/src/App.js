import { useState } from 'react'

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
      Filter Name 
      <input 
        value={filterText} 
        onChange={handleInputChange(setFilterText)} 
      />
      <h2>Add New</h2>
      <form>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleInputChange(setNewName)} 
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber} 
            onChange={handleInputChange(setNewNumber)} 
          />
        </div>
        <div>
          <button onClick={handleFormSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons
          .filter(person => 
            person.name.slice().toLowerCase().includes(filterText.slice().toLowerCase()))
          .map(person => 
            <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App