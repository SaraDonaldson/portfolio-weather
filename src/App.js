import React, { useState } from "react";
import "./App.css";


export default function App() {
  const [loading, setLoading] = useState(false); // for loading icon/message
  const [location, setLocation] = useState(""); // save location
  const [weather, setWeather] = useState(null); // where we save weather object
  const [error, setError] = useState(""); // store error message
  const [showWeather, setShowWeather] = useState(false);
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`;
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY; 
  // saved in .env

  const handleChange = event => {
    //handle key presses
    setLocation(event.target.value);
  };

  const handleSubmit = e => {
    //prevent auto submit
    e.preventDefault();

    //call get weather
    getWeather(location);
    setShowWeather(true);
    // reset form
    setLocation("");
  };

  const getWeather = location => {
    setLoading(true);
    setError("");
    console.log("get weather function started");
    // concat weather url and location info and api key

    let fullUrl = weatherUrl + apiKey;
    console.log(location);
    console.log(fullUrl);
    // do await fetch with new URL
    request();
    async function request() {
      try {
        let response = await fetch(fullUrl);
        //  if response is ok
        if (response.ok) {
          // wait for data
          let weather = await response.json();

          console.log("this is weather data response", weather);
          // update weather data state
          setWeather(weather);
        } else {
          console.log("Server error:", response.status, response.statusText);
        }
      } catch (err) {
        console.log("Network error:", err);
      }
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="page-title">
        <div>
          <img
            className="banner-image"
            src={
              "https://cdn.pixabay.com/photo/2019/03/03/08/25/rabbit-4031334_1280.png"
          }
          alt ='cute rabbit mascot'
          />
        </div>
      </div>
      <div className="form">
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            <input
              placeholder="your location..."
              name="location"
              type="text"
              value={location}
              onChange={e => handleChange(e)}
            />
          </label>

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="loading">{loading ? <h2>Loading...</h2> : null}</div>

      {weather && (
        <div className="weather-display">
          <h1> {weather && weather.name} Weather</h1>
         
         <div className="info-top">
          <img
            className="icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt= 'weather conditions'/>
          <div className="current-temp">
            {" "}
            {Math.round(weather && weather.main.temp)}°
          </div>
          </div>

          <div className="feels-like, weather-items">
            Feels like {Math.round(weather && weather.main.feels_like)}°
          </div>
          <div className="forecast, weather-items">
            {weather && weather.weather[0].main}
          </div>
          <div className="temp-high, weather-items">
            High {Math.round(weather && weather.main.temp_max)}°
          </div>
          <div className="temp-low, weather-items">
            Low {Math.round(weather && weather.main.temp_min)}°
          </div>
          <div className="wind, weather-items">
            Wind speed {Math.round(weather && weather.wind.speed)} km/h
          </div>
        </div>
      )}
    </div>
  );
}

