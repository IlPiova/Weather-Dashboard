import { useContext } from "react";
import { hourlyContext } from "../../stores/context";
import LineChartComponent from "../lineChart/LineChart";

import "./hourly.scss";

export default function HourlyComponent() {
  const { hourlyData } = useContext(hourlyContext);
  console.log(hourlyData);

  return (
    <>
      {hourlyData && (
        <div className="hourly-container">
          <h2>Next 24h</h2>
          <LineChartComponent data={hourlyData} />
        </div>
      )}
    </>
  );
}
