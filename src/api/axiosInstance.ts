import axios from 'axios';
import { errorToast } from '../utils/toast';
import store from '../redux/store';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const state = store.getState()
    const token = state.user.token
    if(token){
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  }
)

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
