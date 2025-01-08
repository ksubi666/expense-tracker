import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://expense-tracker-three-nu.vercel.app',
  timeout: 10000,
  header: {
    'content-Type': 'application/json',
  },
});
