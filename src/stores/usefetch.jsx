import { useState, useEffect } from "react";
import axios from "axios";
function useFetch(endPoint) {
  const baseUrl = "https://api.openweathermap.org/";
  const apiKey = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!endPoint) {
      setData(null);
      setLoading(false);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    axios
      .get(`${baseUrl}${endPoint}&appid=${apiKey}`)
      .then((response) => {
        if (!response.data) {
          throw new Error("I dati richiesti non sono validi");
        }
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [endPoint]);

  return [data, loading, error];
}

export default useFetch;
