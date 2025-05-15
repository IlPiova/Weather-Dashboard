//

import { useContext, useEffect } from "react";
import useFetch from "../../stores/usefetch";
import { geoContext, AQContext } from "../../stores/context";
import "./air-quality.scss";

export default function AirQualityComponent() {
  const { AQData, setAQData } = useContext(AQContext);
  const { geoCoords } = useContext(geoContext);
  const baseUrl = "https://api.openweathermap.org/";

  let lat = null;
  let lon = null;
  let endPoint = null;
  let compArr = null;

  if (geoCoords && geoCoords.length > 0) {
    lat = geoCoords[0].lat;
    lon = geoCoords[0].lon;
    endPoint = `data/2.5/air_pollution?lat=${lat}&lon=${lon}`;
  }

  const [data, loading, error] = useFetch(baseUrl, endPoint);

  useEffect(() => {
    if (data) {
      setAQData(data.list);
    }
  }, [data, setAQData]);

  //Oggetto sviluppato con l'ausilio di Gemini 2.0
  //Mi servirà per scegliere il colore adatto in base alla pericolosità dell'inquinante
  const pollutantRanges = {
    so2: [
      { level: "Good", min: 0, max: 20, backgroundColor: "green" },
      { level: "Fair", min: 20, max: 80, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 80, max: 250, backgroundColor: "yellow" },
      { level: "Poor", min: 250, max: 350, backgroundColor: "orange" },
      { level: "Very Poor", min: 350, max: Infinity, backgroundColor: "red" },
    ],
    no2: [
      { level: "Good", min: 0, max: 40, backgroundColor: "green" },
      { level: "Fair", min: 40, max: 70, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 70, max: 150, backgroundColor: "yellow" },
      { level: "Poor", min: 150, max: 200, backgroundColor: "orange" },
      { level: "Very Poor", min: 200, max: Infinity, backgroundColor: "red" },
    ],
    pm10: [
      { level: "Good", min: 0, max: 20, backgroundColor: "green" },
      { level: "Fair", min: 20, max: 50, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 50, max: 100, backgroundColor: "yellow" },
      { level: "Poor", min: 100, max: 200, backgroundColor: "orange" },
      { level: "Very Poor", min: 200, max: Infinity, backgroundColor: "red" },
    ],
    pm2_5: [
      { level: "Good", min: 0, max: 10, backgroundColor: "green" },
      { level: "Fair", min: 10, max: 25, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 25, max: 50, backgroundColor: "yellow" },
      { level: "Poor", min: 50, max: 75, backgroundColor: "orange" },
      { level: "Very Poor", min: 75, max: Infinity, backgroundColor: "red" },
    ],
    o3: [
      { level: "Good", min: 0, max: 60, backgroundColor: "green" },
      { level: "Fair", min: 60, max: 100, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 100, max: 140, backgroundColor: "yellow" },
      { level: "Poor", min: 140, max: 180, backgroundColor: "orange" },
      { level: "Very Poor", min: 180, max: Infinity, backgroundColor: "red" },
    ],
    co: [
      { level: "Good", min: 0, max: 4400, backgroundColor: "green" },
      { level: "Fair", min: 4400, max: 9400, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 9400, max: 12400, backgroundColor: "yellow" },
      { level: "Poor", min: 12400, max: 15400, backgroundColor: "orange" },
      { level: "Very Poor", min: 15400, max: Infinity, backgroundColor: "red" },
    ],
    nh3: [
      { level: "Good", min: 0, max: 50, backgroundColor: "green" },
      { level: "Fair", min: 50, max: 100, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 100, max: 150, backgroundColor: "yellow" },
      { level: "Poor", min: 150, max: 200, backgroundColor: "orange" },
      { level: "Very Poor", min: 200, max: Infinity, backgroundColor: "red" },
    ],
    no: [
      { level: "Good", min: 0, max: 25, backgroundColor: "green" },
      { level: "Fair", min: 25, max: 50, backgroundColor: "lightgreen" },
      { level: "Moderate", min: 50, max: 75, backgroundColor: "yellow" },
      { level: "Poor", min: 75, max: 100, backgroundColor: "orange" },
      { level: "Very Poor", min: 100, max: Infinity, backgroundColor: "red" },
    ],
  };

  //Funzione sviluppata con l'ausilio di Gemini 2.0
  // Attribuisce il colore all'inquinante in base alla sua pericolosità
  function getColorByPollutant(pollutantName, value) {
    const ranges = pollutantRanges[pollutantName.toLowerCase()];
    if (!ranges) {
      return "gray";
    }
    for (const range of ranges) {
      if (value >= range.min && value < range.max) {
        return range.backgroundColor;
      }
    }
    return ranges[ranges.length - 1].backgroundColor;
  }

  let main, components;
  if (AQData && AQData.length > 0) {
    ({ main, components } = AQData[0]);

    compArr = Object.entries(components);
  }
  return (
    <div className="aqi-general-container">
      {AQData && <h2>Air Quality Index</h2>}
      <div className="aqi-container">
        {AQData &&
          compArr.map((singleComp, i) => (
            <div
              key={i}
              className="comp-container"
              style={{
                backgroundColor: getColorByPollutant(
                  singleComp[0],
                  singleComp[1]
                ),
              }}
            >
              <p className="comp-amount">{singleComp[1]}</p>
              <p className="comp-name">{singleComp[0].toUpperCase()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
