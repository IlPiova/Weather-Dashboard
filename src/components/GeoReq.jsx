import { useContext, useEffect } from "react";
import useFetch from "../stores/usefetch";
import { geoContext, cityContext } from "../stores/context";

export default function GeoReq() {
  //Dichiarazione contesti utili
  const { geoCoords, setGeoCoords } = useContext(geoContext);
  const { cityName } = useContext(cityContext);

  let endPoint = null;
  //Dichiarazione endpoint richiesta api
  if (cityName.trim() && cityName !== "")
    endPoint = `geo/1.0/direct?q=${cityName}`;

  // Salvataggio dati ottenuti
  const [data, loading, error] = useFetch(endPoint);

  //Inserimento dati nel contesto corretto
  useEffect(() => {
    if (data) {
      setGeoCoords(data);
    }
  }, [data, setGeoCoords]);
}
