import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';
import axios from 'axios';
import './App.css'; // Import your custom CSS file

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (location) => {
    const formData = new URLSearchParams();
    formData.append('location', location);

    // Set the proper headers for x-www-form-urlencoded data
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // Make the API request to the Django backend to get weather data
    axios.post('http://localhost:8000/api/weather/', formData, config)
      .then((response) => {
        // Handle the response data and update the state
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <WeatherForm onWeatherData={handleWeatherData} />
      {weatherData ? (
        <WeatherInfo weatherData={weatherData} />
      ) : (
        <p className="loading-text">Enter a location to get the weather information.</p>
      )}
    </div>
  );
}

export default App;
