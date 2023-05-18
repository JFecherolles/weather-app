// App.jsx
import './App.scss'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Weather from './Weather/Weather';
import Loader from './Loader/Loader';

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.VITE_API_KEY}`
      );
      console.log(process.env.VITE_API_KEY);
      setLoading(true);
      const results = await response.json();
      if (results.length === 0) {
        setError("No matching location found.");
      } else {
        const location = results[0];
        const cityName = location.name;
        setCityName(cityName);
        const forecastResponse = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.VITE_API_KEY}&units=metric&lang=fr`
        );
        const forecastResult = await forecastResponse.json();
        setForecast(forecastResult.list);
        setError("");
        setLoading(false);
      }
    }
     catch (error) {
      console.error(error);
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  function formatDate(dateString){
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}-${hour}h:${minutes}m`;
  } 


  return (
    <>
    <div className="App" />
    <h1 className='tittle'>Weather</h1>
    <div className='items' />
    <form className='form'
      onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search a city...'
        value={city}
        onChange={handleInputChange} />
      <button 
      type='submit'>Search
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
    {loading && <Loader />}
    {forecast.map((item) => (
      <Weather
        key={item.dt}
        date={formatDate(item.dt_txt)}
        minTemp={item.main.temp_min}
        maxTemp={item.main.temp_max}
        condition={item.weather[0].description}
        icon={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
      />
    ))}
  </>
    
    
    
  )
}

export default App
