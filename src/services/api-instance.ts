import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://api.adsbdb.com/v0",
});