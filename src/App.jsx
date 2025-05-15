import {
  CityProvider,
  GeoProvider,
  WeatherProvider,
  ForecastProvider,
  AQProvider,
  HourlyProvider,
} from "./stores/context";
import GeoReq from "./components/GeoReq";
import SearchBar from "./components/searchBar/Searchbar";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import AirQualityComponent from "./components/air-quality/AirQualityComponent";
import ForecastComponent from "./components/forecast/ForecastComponent";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/Home";

function App() {
  return (
    <CityProvider>
      <GeoProvider>
        <GeoReq />
        <ForecastProvider>
          <HourlyProvider>
            <WeatherProvider>
              <AQProvider>
                <Home />
              </AQProvider>
            </WeatherProvider>
          </HourlyProvider>
        </ForecastProvider>
      </GeoProvider>
    </CityProvider>
  );
}

export default App;
