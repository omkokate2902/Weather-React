import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  // Function to convert temperature from Kelvin to Celsius
  const convertKelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Location: {weatherData.location}</p>
      {/* Convert temperature from Kelvin to Celsius using the function */}
      <p>Temperature: {convertKelvinToCelsius(weatherData.temperature).toFixed(0)} &#8451;</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Description: {weatherData.description}</p>
    </div>
  );
};

export default WeatherInfo;
