import axios from 'axios';
import { useState } from 'react';

export interface IApiResponse<TData = Record<string, unknown>>{
    responseData: TData;
    status: 'success' | 'failure';
    statusCode: number;
    message: string;
}

export const useAxios = (multipart?: boolean) => {
    const { REACT_APP_API_URL } = process.env;
    if (!REACT_APP_API_URL) throw new Error('base url not set');
    const [instance] = useState(() => {
        const axiosInstance = axios.create({
            baseURL: REACT_APP_API_URL,
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
                    config.maxBodyLength = Infinity;
                    config.headers['Content-Type'] = multipart
                        ? 'multipart/form-data'
                        : 'application/json';
                    config.headers.Accept = 'multipart/form-data';
                }
                return config;
            }, error => {
                return Promise.reject(error);
            });
        return axiosInstance;
    });
    return instance;
    
}