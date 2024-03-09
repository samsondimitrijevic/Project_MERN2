import React from "react";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function Forecast() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleGeolocation = () => {
    // Wrap the geolocation call in a promise to use async/await
    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    getPosition()
      .then(async (position) => {
        const { latitude, longitude } = position.coords;

        if (latitude && longitude) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          const result = await response.json();
          // console.log({ result })
          setData(result); // Ensure setData is defined or replace with your implementation
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("You must activate geolocation permissions in your browser!");
        setLoading(false);
        console.log("🚀 ~ getPosition ~ error:", error);
        console.error(error.message);
      });
  };

  if (loading) {
    return <h2>Loading......</h2>;
  } else {
    return (
      <div className="forecast">
        <h2>Weather Forecast</h2>

        {error === "" ? (
          <div>
            <h2>
              Weather Forecast in {data?.city?.name}, {data?.city?.country}
            </h2>
            <div className="forecasts">
              {data?.list?.map((forecast, i) => (
                <div className="weather-info" key={i}>
                  <p>Date & Time: {forecast.dt_txt}</p>
                  <div className="weather-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={forecast.weather[0].description}
                    />
                  </div>
                  <div className="weather-details">
                    <h3>{forecast.weather[0].description}</h3>
                    <p>
                      Temp: {Math.round(forecast.main.temp) - 273}&deg;C | Feels
                      like: {Math.round(forecast.main.feels_like) - 273}&deg;C
                    </p>
                    <p>Humidity: {forecast.main.humidity}%</p>
                    <p>Wind Speed: {Math.round(forecast.wind.speed)}km/h</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="error">{error}</p>
        )}
      </div>
    );
  }
}

export default Forecast;
