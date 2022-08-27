import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResults from './components/SearchResults';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  // console.log(countryMatches, countryMatches.map(country => country.name.common), searchText);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data);
      });
  }, []);

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  }

  return (
    <div>
      Search countries <input value={searchText} onChange={handleSearchTextChange} />
      <SearchResults countries={countries} searchText={searchText} />
    </div>
  );
}

export default App;
