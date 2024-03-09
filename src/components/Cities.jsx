import React, {useState} from "react";
import { cities } from "../assets/cities";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function Cities(){

const [selectedCity, setSelectedCity]= useState("New York");
const [data, setData]= useState(null);
const [loading, setLoading]= useState(true);
const [buttonClick, setButtonClick]= useState(false);

const handleSubmit= ()=> {
    setLoading(true);
    setButtonClick(true);
    const citySelected= cities.filter(city=> city.name === selectedCity);
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${citySelected[0].lat}&lon=${citySelected[0].lon}&appid=${apiKey}`)
    .then(res=> res.json())
    .then(res=> {
      // console.log(res)
         setData(res)
         setLoading(false);
         setButtonClick(false);
    })   
}


  return (
    <div className="city">
      <h2>Current Weather By City</h2>
   
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
   {data ? (<div>
       <h2>
         Current Weather in {data.name}, {data?.sys?.country}
       </h2>
       <div className="weather-info">
         <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
            alt={data?.weather?.[0]?.description}
          />
        </div>
        <div className="weather-details">
          <h3>{data?.weather?.[0]?.description}</h3>
          <p>
            Temp: {Math.round(data?.main?.temp) - 273}&deg;C | Feels like:{" "}
             {Math.round(data?.main?.feels_like) - 273}&deg;C
          </p>
          <p>Humidity: {data?.main?.humidity}%</p>
          <p>Wind Speed: {Math.round(data?.wind?.speed)}km/h</p>
        </div>
      </div>
    </div>) 
    :
    <></>
   }
    </div>
  );
};

export default Cities;
