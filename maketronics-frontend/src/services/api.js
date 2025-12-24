import axios from "axios";

const API_BASE_URL ="https://build-a-self-organizing-system-1.onrender.com/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
