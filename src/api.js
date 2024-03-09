import axios from "axios";

const API_KEY = "470eda317ae1ab1b6c31a36159a932cd";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    APPID: API_KEY,
  },
});

export default api;
