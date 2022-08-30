import { useEffect, useState } from "react";
import CountryDetails from "./CountryDetails";
import CountryListOption from "./CountryListOption";

const SearchResults = ({ countries, searchText }) => {
  const [isDetails, setIsDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  let countryMatches = countries
    .filter(country => 
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
  console.log(countryMatches);

  const displayCountryDetails = (countryReference) => () => {
    setSelectedCountry(countryReference);
    setIsDetails(true);
  };

  useEffect(() => {
    if (countryMatches.length === 1) {
      setSelectedCountry(countryMatches[0]);
      setIsDetails(true);
    } else {
      setSelectedCountry(null);
      setIsDetails(false);
    }
  }, [searchText]);
  

  if (isDetails) {
    return (
      <CountryDetails country={selectedCountry} />
    )
  } else if (countryMatches.length > 10 || countryMatches.length === 0) {
    return <p>Too many matches, try being more specific</p>
  } else if (countryMatches.length > 1) {
    return (
      <div id="countryList">
        {
          countryMatches.map(country => 
          <CountryListOption 
            key={country.name.common} 
            countryName={country.name.common} 
            onClick={displayCountryDetails(country)} 
          />
          )
        }
    </div>
    )
  }
}

export default SearchResults;