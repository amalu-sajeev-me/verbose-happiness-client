import axios from 'axios';
import { useState } from 'react';

export const useAxios = (baseURL?: string) => {
    const { REACT_APP_API_URL } = process.env;
    if (!REACT_APP_API_URL || baseURL) throw new Error('base url not set');
    const [instance] = useState(() => {
        const axiosInstance = axios.create({
            baseURL: baseURL|| REACT_APP_API_URL,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        axiosInstance
            .interceptors
            .request
            .use(config => {
                const token = localStorage.getItem('auth-token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }, error => {
                return Promise.reject(error);
            });
        return axiosInstance;
    });
    return instance;
    
}