const Persons = ({ persons, filterText, onClick }) => {
  return (
    <>
      {
        persons
          .filter(person => 
            person.name.slice().toLowerCase().includes(filterText.slice().toLowerCase()))
          .map(person => 
            <div key={person.id}><p>{person.name} {person.number}</p><button onClick={onClick(person)}>delete</button></div>)
      }
    </>
  )
}

export default Persons;