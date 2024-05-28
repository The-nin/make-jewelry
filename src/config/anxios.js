import axios from "axios";

const api = axios.create({
    baseURL: "http://159.223.64.244:8080/api/"
});

export default api;