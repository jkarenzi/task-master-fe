import axios from 'axios';
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
      return Promise.reject('Network Error')
    }

    return Promise.reject(error.response.data.message)
  }
)

export default axiosInstance;
