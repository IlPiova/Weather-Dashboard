import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "../searchBar/Searchbar";

import "./landing.scss";
import "../current-weather/currentWeather.scss";

export default function Landing() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const citiesArr = [
    "milan",
    "london",
    "new york",
    "dubai",
    "pechino",
    "tokyo",
    "helsinki",
    "bangkok",
    "copenaghen",
    "yaoundé",
    "Brasilia",
    "Mosca",
  ];

  const [citiesArrData, setCitiesArrData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCityData = (lat, long, name) => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        if (!response.data) {
          throw new Error("I dati richiesti non sono validi");
        }
        response.data.name = name;
        setCitiesArrData((prevData) => [...prevData, response.data]);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    for (let i = 0; i < citiesArr.length; i++) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${citiesArr[i]}&appid=${apiKey}`
        )
        .then((response) => {
          if (!response.data) {
            throw new Error("I dati richiesti non sono validi");
          }
          console.log(response.data);
          fetchCityData(
            response.data[0].lat,
            response.data[0].lon,
            response.data[0].name
          );
        })
        .catch((e) => console.log(e.message));
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <h1 className="landing-container">LOADING...</h1>}
      {!loading && (
        <div className="landing-container">
          <SearchBar />

          <div className="cities-container">
            {citiesArrData.map((city, i) => {
              const weather = city.current;
              const weatherInfo = weather.weather[0];
              return (
                <div key={i}>
                  <div className="general-weather-container">
                    <div className="current-weather-container">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                        alt="weather-icon"
                      />
                      <h1 className="today" style={{ fontSize: "2em" }}>
                        {city.name}
                      </h1>
                      <h2 className="today">
                        {new Date(weather.dt * 1000).toLocaleDateString()}
                      </h2>
                      <h2 className="temp">
                        {weather.temp !== undefined
                          ? Math.round(weather.temp) + "°"
                          : "--"}
                      </h2>
                      <p className="description">
                        {weatherInfo.description || ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
