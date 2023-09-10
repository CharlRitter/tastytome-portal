import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8000'
});

// TODO remove and put on all endpoints
const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNjk0Mzc2MTA4LCJleHAiOjE2OTQzOTc3MDh9.aM1WlWi30Hb9Pl4D7rgr3gENhn14MjqQzrQSVvnApX0';

axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;

export type { AxiosResponse };

export default axiosInstance;
