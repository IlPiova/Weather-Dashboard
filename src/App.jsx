import "./App.css";

import {
  CityProvider,
  GeoProvider,
  WeatherProvider,
  ForecastProvider,
  AQProvider,
} from "./stores/context";
import GeoReq from "./components/GeoReq";
import SearchBar from "./components/searchBar/Searchbar";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import AirQualityComponent from "./components/air-quality/AirQualityComponent";
import ForecastComponent from "./components/forecast/ForecastComponent";
import SideBar from "./components/sidebar/SideBar";

function App() {
  return (
    <CityProvider>
      <GeoProvider>
        <GeoReq />
        <ForecastProvider>
          <WeatherProvider>
            <ForecastComponent />
            <AQProvider>
              <SideBar />
              <AirQualityComponent />
            </AQProvider>
          </WeatherProvider>
        </ForecastProvider>
      </GeoProvider>
    </CityProvider>
  );
}

export default App;
