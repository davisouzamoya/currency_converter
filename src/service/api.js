import axios from 'axios';

const api = axios.create({
    baseURL: 'https://free.currconv.com',
    params:{
            apiKey:'32826f3a596ab82e3d51'
          } 
});

export default api;