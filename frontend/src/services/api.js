import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001",
});

export const chatAPI = (data) => API.post("/chat", data);
