import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.jsx";
import Landing from "./components/landing/Landing.jsx";
import {
  CityProvider,
  GeoProvider,
  WeatherProvider,
  ForecastProvider,
  AQProvider,
  HourlyProvider,
} from "./stores/context";
import GeoReq from "./components/GeoReq";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CityProvider>
      <GeoProvider>
        <GeoReq />
        <ForecastProvider>
          <HourlyProvider>
            <WeatherProvider>
              <AQProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="dashboard" element={<App />} />
                  </Routes>
                </BrowserRouter>{" "}
              </AQProvider>
            </WeatherProvider>
          </HourlyProvider>
        </ForecastProvider>
      </GeoProvider>
    </CityProvider>
  </StrictMode>
);
