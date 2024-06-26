import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  const token = useSelector((state: RootState) => state.user.token);
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});

export default axiosInstance;
