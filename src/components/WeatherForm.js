import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForm = ({ onWeatherData }) => {
  const [location, setLocation] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setLocation(inputValue);
  };

  const handleCitySelect = (event) => {
    const selectedValue = event.target.value;
    setLocation(selectedValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onWeatherData(location);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Fetch city options from the backend after a delay
      axios
        .get(`http://localhost:8000/api/available_cities/?search=${location}`)
        .then((response) => {
          setCityOptions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500); // Adjust the delay as needed (e.g., 500ms)

    // Cleanup the timeout on component unmount and before the next effect
    return () => clearTimeout(delayDebounce);
  }, [location]);

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="location">Enter location:</label>
      <input
        type="text"
        id="location"
        name="location"
        placeholder="e.g., New York"
        value={location}
        onChange={handleInputChange}
        list="cityOptions"
      />
      {cityOptions.length > 0 && (
        <select
          id="cityOptions"
          style={{ backgroundColor: 'white', color: 'black', width: 200 }}
          onChange={handleCitySelect}
        >
          <option value="">Select an option</option>
          {cityOptions.map((city, index) => (
            <option key={index} value={city.name}>
              {`${city.name}, ${city.country}`}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default WeatherForm;
