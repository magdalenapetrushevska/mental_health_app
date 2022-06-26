import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Authorization':`Bearer ${localStorage.getItem("temitope")}`
    }
})

export default instance;