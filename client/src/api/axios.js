import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Adjust the base URL as needed
  withCredentials: true, // This allows cookies to be sent with requests
});
export default axiosInstance;