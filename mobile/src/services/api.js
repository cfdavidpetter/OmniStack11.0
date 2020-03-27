import axios from "axios";

const api = axios.create({
    baseURL: 'http://feb3bd17.ngrok.io'
});

export default api;