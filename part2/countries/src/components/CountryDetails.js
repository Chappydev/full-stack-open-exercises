const CountryDetails = ({ country }) => {
  const countryName = country.name.common;
  const { capital, area, languages, flags } = country;

  return (
    <div>
        <h2>{countryName}</h2>
        <p>capital(s): {capital.join(', ')}</p>
        <p>area: {area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={flags.png || flags.svg} alt="{countryName} flag"></img>
      </div>
  )
}

export default CountryDetails;