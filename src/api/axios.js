import * as axios from 'axios';

export const API = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '11452ed1-3660-45e9-b8d1-a254f78a41b8'
    }
})