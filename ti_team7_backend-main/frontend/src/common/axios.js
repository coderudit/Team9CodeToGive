// Author: Anuj Dev (B00900887)

import axios from "axios";

const axios_api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default axios_api;
