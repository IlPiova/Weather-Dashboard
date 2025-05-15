import { useContext, useEffect } from "react";
import useFetch from "../../stores/usefetch";
import {
  geoContext,
  weatherContext,
  forecastContext,
  hourlyContext,
} from "../../stores/context";
import "./currentWeather.scss";

export default function CurrentWeather() {
  const { weatherData, setWeatherData } = useContext(weatherContext);
  const { geoCoords } = useContext(geoContext);
  const { setForecastData } = useContext(forecastContext);
  const { setHourlyData } = useContext(hourlyContext);
  const baseUrl = "https://api.openweathermap.org/";

  //Costante utile per il calcolo della data
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  let curWeather, alarms, today, sunrise, sunset;

  let lat = null;
  let lon = null;
  let endPoint = null;

  if (geoCoords && geoCoords.length > 0) {
    lat = geoCoords[0].lat;
    lon = geoCoords[0].lon;
    endPoint = `data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=it&exclude=minutely`;
  }

  const [data, loading, error] = useFetch(baseUrl, endPoint);

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      setForecastData(data.daily);
      setHourlyData(data.hourly);
    }
  }, [data, setWeatherData]);
  if (weatherData) {
    //Impostazione variabile currentWeather
    curWeather = weatherData.current;
    //Calcolo giorno corrente
    today = new Date(curWeather.dt * 1000);
    today = today.toLocaleDateString("gb-GB", dateOptions);

    //Calcolo orario alba
    sunrise = new Date(curWeather.sunrise * 1000);
    sunrise = sunrise.toLocaleTimeString("gb-GB", timeOptions);

    //Calcolo orario tramonto
    sunset = new Date(curWeather.sunset * 1000);
    sunset = sunset.toLocaleTimeString("gb-GB", timeOptions);
  }
  return (
    <>
      {weatherData && <h3 className="today"> {today}</h3>}
      {weatherData && (
        <div className="current-weather-container">
          <img
            src={`https://openweathermap.org/img/wn/${curWeather.weather[0].icon}@2x.png`}
            alt="weather-icon "
          />
          <h2 className="temp">{Math.round(curWeather.temp)}°</h2>
          <p className="description"> {curWeather.weather[0].description}</p>
        </div>
      )}
      {weatherData && (
        <div className="day-phases-container">
          <p>Sunrise: {sunrise}</p>
          <p>Sunset: {sunset}</p>
        </div>
      )}

      {weatherData && (
        <div className="other-info">
          <p>
            wind: {curWeather.wind_speed} | {curWeather.wind_deg} deg
          </p>

          <p>humidity: {curWeather.humidity} %</p>
        </div>
      )}
    </>
  );
}
