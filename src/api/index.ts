import axios from "axios";

const apiURL: string | null = import.meta.env.VITE_API_URL;

if (!apiURL) {
  throw new Error("VITE_API_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: apiURL,
});

export default axiosInstance;
