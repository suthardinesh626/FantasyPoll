import axios from 'axios'

const ApiManager = axios.create({
    baseURL: 'https://pollbackend-production-ec35.up.railway.app/api/v1',

    responseType: 'json',
    withCredentials: true
})


export default ApiManager;