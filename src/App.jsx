import React, { useState } from "react";
import "./App.css"; // external CSS

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);

  async function getWeatherData() {
    if (!input) {
      alert("Please enter a city name");
      return;
    }

    const API_KEY = "9570845cc46090241d2bfcdd76fbdf20";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`
    );
    const myresult = await res.json();

    if (myresult.cod === 200) {
      setData(myresult.main);
      setWeather(myresult.weather[0]);
    } else {
      setData(null);
      setWeather(null);
      alert("City not found!");
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">🌤️ Weather App</h1>

        <div className="input-section">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter city name"
            className="input-box"
          />
          <button onClick={getWeatherData} className="btn">
            Get Weather
          </button>
        </div>

        {data && weather ? (
          <div className="weather-info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <h2 className="temp">{data.temp}°C</h2>
            <p className="desc">{weather.description}</p>
            <p className="humidity">Humidity: {data.humidity}%</p>
          </div>
        ) : (
          <p className="placeholder-text">Enter a city to get weather info</p>
        )}
      </div>
    </div>
  );
}

export default App;
