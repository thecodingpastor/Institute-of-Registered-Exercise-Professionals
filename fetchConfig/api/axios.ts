import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://institute-of-registered-exercise-professionals.vercel.app/"
    : "http://localhost:3000/api";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
