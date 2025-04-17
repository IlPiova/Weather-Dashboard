import CurrentWeather from "../current-weather/CurrentWeather";
import SearchBar from "../searchBar/Searchbar";
import "./sidebar.scss";

export default function SideBar() {
  return (
    <div className="sidebar">
      <SearchBar />
      <CurrentWeather />
    </div>
  );
}
