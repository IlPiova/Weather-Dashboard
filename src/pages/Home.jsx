import AirQualityComponent from "../components/air-quality/AirQualityComponent";
import ForecastComponent from "../components/forecast/ForecastComponent";
import HourlyComponent from "../components/hourly-forecast/hourlyComponent";
import SideBar from "../components/sidebar/SideBar";

export default function Home() {
  return (
    <>
      <div className="dashboard-container">
        <SideBar />
        <ForecastComponent />
        <HourlyComponent />
        <AirQualityComponent />
      </div>
    </>
  );
}
