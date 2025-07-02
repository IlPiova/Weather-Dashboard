import {
  CityProvider,
  GeoProvider,
  WeatherProvider,
  ForecastProvider,
  AQProvider,
  HourlyProvider,
} from "./stores/context";
import GeoReq from "./components/GeoReq";
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
