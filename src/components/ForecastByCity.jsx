import React, {useState} from "react";
import { cities } from "../assets/cities";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function ForecastByCity(){

const [selectedCity, setSelectedCity]= useState("New York");
const [data, setData]= useState(null);
const [loading, setLoading]= useState(true);
const [buttonClick, setButtonClick]= useState(false);

const handleSubmit= ()=> {
    setLoading(true);
    setButtonClick(true);
    const citySelected= cities.filter(city=> city.name === selectedCity);
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${citySelected[0].lat}&lon=${citySelected[0].lon}&appid=${apiKey}`)
    .then(res=> res.json())
    .then(res=> {
    //   console.log(res)
         setData(res)
         setLoading(false);
         setButtonClick(false);
    })
   
}



  return (
    <div className="city">
      <h2>Weather Forecast By City</h2>
   
     <div>
       <h2>Select a City</h2>
       <p>
         <select
           value={selectedCity}
          onChange={(e)=> setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>
          Get Weather
        </button>
      </p>
    </div>

    {loading && buttonClick ? <h2>Loading......</h2> : ""}

   {data ? ( 
    <div>
     <h2>
     Weather Forecast in {data?.city?.name}, {data?.city?.country}
   </h2>
   <div className="forecasts">
           {data?.list?.map((forecast, i)=> (
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
                Temp: {Math.round(forecast.main.temp) - 273}&deg;C | Feels like:{" "}
                 {Math.round(forecast.main.feels_like) - 273}&deg;C
              </p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Wind Speed: {Math.round(forecast.wind.speed)}km/h</p>
            </div>
          </div>
           ))}
      </div>
      </div>) 
    :
    <></>
   }

    </div>
  );
};

export default ForecastByCity;
