const SearchResults = ({ countries, searchText }) => {
  let countryMatches = countries
    .filter(country => 
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
  console.log(countryMatches);

  if (countryMatches.length > 10 || countryMatches.length === 0) {
    return <p>Too many matches, try being more specific</p>
  } else if (countryMatches.length > 1) {
    return countryMatches.map(country => <p key={country.name.common}>{country.name.common}</p>)
  } else {
    const country = countryMatches[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png || country.flags.svg} alt="{country.name} flag"></img>
      </div>
    )
  }
}

export default SearchResults;