const Filter = ({ filterText, setFilterText, onChange }) => {
  return (
    <div>
      Filter Name 
      <input 
        value={filterText} 
        onChange={onChange(setFilterText)} 
      />
    </div>
  )
}

export default Filter;