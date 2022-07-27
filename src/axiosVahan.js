import axios from "axios";

const axiosVahan = axios.create({
  baseURL: process.env.REACT_APP_BaseURL,
});

export default axiosVahan;
