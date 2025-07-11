import axios from "axios";

// Create Axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // keep this if you're ever using cookies — otherwise it's safe to remove
});

// Add a request interceptor to attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
