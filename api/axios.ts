import axios, { AxiosError, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8000',
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const jwtToken = sessionStorage.getItem('jwtToken');

  if (jwtToken) {
    const updatedConfig = { ...config };
    updatedConfig.headers.Authorization = jwtToken;

    return updatedConfig;
  }

  return config;
});

export { axiosInstance };
export type { AxiosError };
export type CustomAxiosResponse<T> = Omit<AxiosResponse<T>, 'headers' | 'config' | 'request'>;
