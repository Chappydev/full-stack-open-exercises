const Persons = ({ persons, filterText }) => {
  return (
    <>
      {
        persons
          .filter(person => 
            person.name.slice().toLowerCase().includes(filterText.slice().toLowerCase()))
          .map(person => 
            <p key={person.name}>{person.name} {person.number}</p>)
      }
    </>
  )
}

export default Persons;