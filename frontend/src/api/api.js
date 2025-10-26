import axios from "axios";

const api = axios.create({
  baseURL: "https://algohire.onrender.com",
});

export default api;
