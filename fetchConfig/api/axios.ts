import axios from "axios";

// const BASE_URL =
//   process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

console.log(process.env.NODE_ENV);

export default axios.create({
  baseURL: "/api",
  // baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
