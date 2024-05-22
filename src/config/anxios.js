import axios from "axios";

const api = axios.create({
    baseURL: "https://blearning.vn"
});

export default api;