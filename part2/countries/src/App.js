import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${capital}&aqi=no`
      )
      .then((response) => {
        setWeather(response.data.current);
        setLoading(false);
      });
  }, [capital]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>temperature:</strong> {weather.temp_c} Celcius
      </p>
      <img src={weather.condition.icon} alt="weather icon" />
      <p>
        <strong>wind:</strong> {weather.wind_mph} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const [searchBox, setSearchBox] = useState("");

  const handleSearchBoxChange = (event) => {
    setSearchBox(event.target.value);
  };

  const countriesToShow = () => {
    if (searchBox === "") {
      return <></>;
    }
    const re = new RegExp(searchBox, "i");
    const filtered = countries.filter((country) =>
      re.test(country.name.common)
    );
    if (filtered.length > 10) {
      return (
        <>
          <p>Too many matches, specify another filter</p>
        </>
      );
    }
    if (filtered.length > 1) {
      return filtered.map((country) => (
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSearchBox(country.name.common)}>
            show
          </button>
        </p>
      ));
    }
    if (filtered.length === 1) {
      const country = filtered[0];
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt="flag" width="200" />
          <Weather capital={country.capital} />
        </div>
      );
    }
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input value={searchBox} onChange={handleSearchBoxChange} />
      </p>
      {countriesToShow()}
    </div>
  );
}

export default App;
