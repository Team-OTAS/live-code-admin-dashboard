import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem('authToken');


axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
