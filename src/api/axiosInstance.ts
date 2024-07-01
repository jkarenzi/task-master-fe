import axios from 'axios';
import { errorToast } from '../utils/toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(!error.response){
      errorToast('An unexpected error occured')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance;
