import { useContext, useState } from "react";
import { cityContext } from "../../stores/context";

import "./searchbar.scss";

export default function SearchBar() {
  const { setCityName } = useContext(cityContext);

  const [newCity, setNewCity] = useState("");

  function handleChange(e) {
    setNewCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCityName(newCity);
    setNewCity("");
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
        {/* <button type="submit">Cerca</button> */}
      </form>
    </>
  );
}
