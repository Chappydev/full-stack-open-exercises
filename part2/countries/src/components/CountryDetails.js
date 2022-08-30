import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const countryName = country.name.common;
  const { capital, area, languages, flags, latlng } = country;
  const [weatherData, setWeatherData] = useState(null);
  
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("Effect...");
    axios
      .get(`http://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`)
      .then(res => {
        console.log(res.data);
        const data = res.data.current;
        setWeatherData({ temp: data.temp, wind_speed: data.wind_speed, weather_info: data.weather[0] });
      })
      .catch(err => {
        console.log(err.response.status, err.response.data.message);
      })
  }, [])

  if (weatherData !== null) {
    return (
      <div>
          <h2>{countryName}</h2>
          <p>capital(s): {capital.join(', ')}</p>
          <p>area: {area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(languages).map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={flags.png || flags.svg} alt={`${countryName} flag`}></img>
          <h3>Weather in {capital[capital.length - 1]}</h3>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>{weatherData.weather_info.main}</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather_info.icon}@2x.png`} alt={`${capital[capital.length - 1]}`}></img>
          <p>Wind: {weatherData.wind_speed} m/s</p>
        </div>
    )
  }
}

export default CountryDetails;