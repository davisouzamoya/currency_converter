import axios from 'axios';

const api = axios.create({
    baseURL: 'https://free.currconv.com'
});

export default api;