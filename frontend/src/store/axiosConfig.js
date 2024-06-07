// axiosConfig.js

import axios from "axios";
import store from "./../store"; // Adjust the path to your store

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/server/api", // Adjust the base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.session.token;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
