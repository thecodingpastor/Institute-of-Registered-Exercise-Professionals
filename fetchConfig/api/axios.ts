import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";
console.log(BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
