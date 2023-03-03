import axios from "axios";

// when using next js as only frontend
// const BASE_URL =
//   process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

export default axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
