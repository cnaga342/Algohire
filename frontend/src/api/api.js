import axios from "axios";

const api = axios.create({
  baseURL: "https://algohire-algohire-webhook-event-relay.onrender.com",
});

export default api;
