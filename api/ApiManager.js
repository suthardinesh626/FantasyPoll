import axios from 'axios'

const ApiManager = axios.create({
    baseURL: 'http://192.168.0.106:8000/api/v1',
    responseType: 'json',
    withCredentials: true
})


export default ApiManager;