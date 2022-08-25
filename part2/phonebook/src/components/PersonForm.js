const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, onChange, onClick }) => {
  return (
    <form>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={onChange(setNewName)} 
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber} 
            onChange={onChange(setNewNumber)} 
          />
        </div>
        <div>
          <button onClick={onClick} type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm;