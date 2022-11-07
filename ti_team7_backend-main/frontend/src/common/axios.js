import axios from "axios";

const axios_api = axios.create({
  baseURL: "http://localhost:6000/api",
});

export default axios_api;
