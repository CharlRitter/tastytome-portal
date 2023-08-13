import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8000'
});

// TODO remove and put on all endpoints
const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNjkxOTQwNTk0LCJleHAiOjE2OTE5NjIxOTR9.lCSNvNueb5AiMY-DaUKCQC4xMOPEqMjyJHVIYN7WSFM';

axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;

export default axiosInstance;
