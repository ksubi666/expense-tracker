import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  header: {
    'content-Type': 'application/json',
  },
});
