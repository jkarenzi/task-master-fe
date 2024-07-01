import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


interface User {
  _id:string,
  fullName: string,
  email: string,
  password: string,
  role: string,
  profileImg: {
    publicId: string,
    url?: string
  },
  isVerified: boolean,
  twoFactorAuth: {
      isEnabled: boolean,
      code: number,
  },
  createdAt: string,
  updatedAt: string,
  __v: number 
}

export interface InitState {
  token: string | null,
  userInfo: User | null
}

interface DecodedToken {
  user: User
}

const tokenFromStorage = localStorage.getItem('token')
let userFromToken: User | null = null
if(tokenFromStorage){
  try {
    const decodedToken = jwtDecode<DecodedToken>(tokenFromStorage);
    userFromToken = decodedToken.user
  } catch (error) {
    localStorage.removeItem('token');
  }
}

const initialState:InitState = {
  token: tokenFromStorage,
  userInfo: userFromToken,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', action.payload)
      state.token = action.payload
      const decodedToken = jwtDecode<DecodedToken>(action.payload)
      state.userInfo = decodedToken.user
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
