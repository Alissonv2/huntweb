import axios from 'axios';


const api = axios.create(
    {
        baseURL: 'https://cors-anywhere.herokuapp.com/https://glue-api.vivareal.com/v1/listings'
    });

export default api;