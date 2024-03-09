import {useState, useEffect} from "react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function Home(){

  const [data, setData] = useState({});
  const [error, setError]= useState("");
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    handleGeolocation();
  }, []);

  const handleGeolocation = () => {
    // Wrap the geolocation call in a promise to use async/await
    const getPosition = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  
    getPosition()
    .then(async (position) => {
      const { latitude, longitude } = position.coords;
  
      if (latitude && longitude) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        const result = await response.json();
        // console.log({ result })
        setData(result); // Ensure setData is defined or replace with your implementation
        setLoading(false);
      }

    }).catch((error) => {
      setError("You must activate geolocation permissions in your browser!");
      setLoading(false);
      console.log("🚀 ~ getPosition ~ error:", error)
      console.error(error.message);
    });
  };

if(loading){
  return(
    <h2>Loading......</h2>
  )
}
else{
  return (
    <div> 
      {error === "" ? (
      <div>
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
      : <p className="error">{error}</p>
     }
    </div>
  );
    }
};

export default Home;
