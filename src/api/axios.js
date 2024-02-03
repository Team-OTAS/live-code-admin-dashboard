import axios from "axios";
const BASE_URL = "http://localhost:8000/api";
const token = localStorage.getItem('authToken');
// let usertoken = localStorage.getItem("token");
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios;
