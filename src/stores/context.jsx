/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

//Gestione stato nome città
export const cityContext = createContext({});

export const CityProvider = ({ children }) => {
  const [cityName, setCityName] = useState("");

  return (
    <cityContext.Provider value={{ cityName, setCityName }}>
      {children}
    </cityContext.Provider>
  );
};

//Gestione stato contenente coordinate geografiche della città richiesta
export const geoContext = createContext({});

export const GeoProvider = ({ children }) => {
  const [geoCoords, setGeoCoords] = useState(null);

  return (
    <geoContext.Provider value={{ geoCoords, setGeoCoords }}>
      {children}
    </geoContext.Provider>
  );
};

// Gestione stato contenente dati meteo
export const weatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <weatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </weatherContext.Provider>
  );
};

// Gestione stato delle pevvisioni dei prossimi 5 giorni
export const forecastContext = createContext(null);

export const ForecastProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState(null);

  return (
    <forecastContext.Provider value={{ forecastData, setForecastData }}>
      {children}
    </forecastContext.Provider>
  );
};

//Gestione stato contenente dati Qualità dell'aria
export const AQContext = createContext({});

export const AQProvider = ({ children }) => {
  const [AQData, setAQData] = useState(null);

  return (
    <AQContext.Provider value={{ AQData, setAQData }}>
      {children}
    </AQContext.Provider>
  );
};

//Gestione stato contenente le previsioni orarie
export const hourlyContext = createContext({});

export const HourlyProvider = ({ children }) => {
  const [hourlyData, setHourlyData] = useState(null);

  return (
    <hourlyContext.Provider value={{ hourlyData, setHourlyData }}>
      {children}
    </hourlyContext.Provider>
  );
};
