import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import api from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getCurrentWeather = async () => {
    try {
      const response = await api.get("/weather", {
        params: {
          lat: "your_latitude",
          lon: "your_longitude",
          units: "metric"
        }
      });

      setCurrentWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const getForecast = async () => {
    try {
      const response = await api.get("/forecast", {
        params: {
          lat: "your_latitude",
          lon: "your_longitude",
          units: "metric",
          cnt: 5
        }
      });

      setForecast(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentWeather();
    getForecast();
  }, []);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Current Weather</Link>
            </li>
            <li>
              <Link to="/forecast">5-Day Forecast</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact>
          <CurrentWeather weather={currentWeather} />
        </Route>
        <Route path="/forecast">
          <ForecastWeather weather={forecast} />
        </Route>
      </div>
    </Router>
  );
}

function CurrentWeather({ weather }) {
  const { main, name, sys, weather: [currentWeather] } = weather;

  return (
    <div>
      <h2>
        Weather in {name}, {sys.country}
      </h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.description}
          />
        </div>
        <div className="weather-details">
          <h3>{currentWeather.description}</h3>
          <p>
            Temp: {main.temp}°C | Feels like: {main.feels_like}°C
          </p>
        </div>
      </div>
    </div>
  );
}

function ForecastWeather({ weather }) {
  const { list } = weather;
  const forecast = list.slice(0, 5)}