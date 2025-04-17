import { useContext } from "react";
import { forecastContext } from "../../stores/context";

import "./forecast.scss";

export default function ForecastComponent() {
  const { forecastData } = useContext(forecastContext);

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const dateOptions = {
    weekday: "short",
  };

  function makeTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("gb-GB", timeOptions);
  }

  function makeWeekDay(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString("gb-GB", dateOptions);
  }
  if (forecastData) {
    //Impostazione variabile currentWeather
    // curWeather = weatherData.current;
    //Calcolo giorno corrente
    // today = new Date(curWeather.dt * 1000);
    // today = today.toLocaleDateString("gb-GB", dateOptions);
  }

  return (
    <div className="forecast-container">
      {forecastData && <h2>Next days</h2>}
      {forecastData &&
        forecastData.map((day, i) => (
          <div key={i} className="day-container">
            <p className="day-name">{makeWeekDay(day.dt)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={`in-${i}-days-weather-icon`}
            />
            <p className="day-temp">{Math.round(day.temp.day)}°</p>
          </div>
        ))}
    </div>
  );
}
