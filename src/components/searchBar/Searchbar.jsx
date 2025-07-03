import { useContext, useState } from "react";
import { cityContext } from "../../stores/context";

import "./searchbar.scss";
import { useLocation, useNavigate } from "react-router";

export default function SearchBar() {
  const { setCityName } = useContext(cityContext);

  const [newCity, setNewCity] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  function handleChange(e) {
    setNewCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCityName(newCity);
    setNewCity("");
    if (newCity) {
      if (location.pathname !== "/dashboard") navigate("dashboard");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={newCity}
          onChange={handleChange}
          placeholder="Inserisci la città"
          className="input-text"
        />
      </form>
    </>
  );
}
