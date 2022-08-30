const CountryListOption = ({ countryName, onClick }) => {
  return (
    <div>
      {countryName} <button onClick={onClick}>More Info</button>
    </div>
  )
}

export default CountryListOption;