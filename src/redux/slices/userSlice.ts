import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse, User } from '../../types/types';
import axios from '../../api/axiosInstance'
import { errorToast, successToast } from '../../utils/toast';
import { emailFormData, nameFormData, passwordFormData, twoFAFormData } from '../../pages/Settings';


export interface InitUserState {
  token: string | null,
  userInfo: User | null,
  isLoadingName: boolean,
  isLoadingPassword: boolean,
  isLoadingImage: boolean,
  status: 'idle'|'successful'|'failed',
  imageStatus: 'idle'|'successful'|'failed'
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



const initialState:InitUserState = {
  token: tokenFromStorage,
  userInfo: userFromToken,
  isLoadingName: false,
  isLoadingPassword: false,
  isLoadingImage: false,
  status: 'idle',
  imageStatus: 'idle'
}

export const changeFullName = createAsyncThunk<ApiResponse, nameFormData>('user/changeFullName', async(formData, thunkAPI) => {
  try{
      const response = await axios.patch('/users/fullName', formData)
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})

export const changeEmail = createAsyncThunk<ApiResponse, emailFormData>('user/changeEmail', async(formData, thunkAPI) => {
  try{
      const response = await axios.patch('/users/email', formData)
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})

export const changePassword = createAsyncThunk<ApiResponse, passwordFormData>('user/changePassword', async(formData, thunkAPI) => {
  try{
      const response = await axios.patch('/users/password', formData)
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})

export const changeProfileImg = createAsyncThunk<ApiResponse, FormData>('user/changeProfileImg', async(formData, thunkAPI) => {
  try{
      const response = await axios.patch('/users/profileImg', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})

export const removeProfileImg = createAsyncThunk('user/removeProfileImg', async(_, thunkAPI) => {
  try{
      const response = await axios.delete('/users/profileImg')
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})

export const change2faStatus = createAsyncThunk<ApiResponse, twoFAFormData>('user/change2faStatus', async(formData, thunkAPI) => {
  try{
      const response = await axios.patch('/auth/toggle_2fa', formData)
      return response.data
  }catch(err){
      return thunkAPI.rejectWithValue(err)
  }
})


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
      localStorage.removeItem('token')
    },
    resetStatus: (state) => {
      state.status = 'idle'
    },
    resetImageStatus: (state) => {
      state.imageStatus = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(changeFullName.pending, (state) => {
      state.isLoadingName = true
    })
    .addCase(changeFullName.fulfilled, (state, action) => {
      const token = ((action.payload as ApiResponse).data!.token) as string
      localStorage.setItem('token', token)
      state.token = token
      const decodedToken = jwtDecode<DecodedToken>(token)
      state.userInfo = decodedToken.user
      state.isLoadingName = false
      state.status = 'successful'
    })
    .addCase(changeFullName.rejected, (state, action) => {
      state.isLoadingName = false
      state.status = 'failed'
      errorToast(action.payload as string)
    })
    .addCase(changeEmail.pending, (state) => {
      state.isLoadingPassword = true
    })
    .addCase(changeEmail.fulfilled, (state, action) => {
      const token = ((action.payload as ApiResponse).data!.token) as string
      localStorage.setItem('token', token)
      state.token = token
      const decodedToken = jwtDecode<DecodedToken>(token)
      state.userInfo = decodedToken.user
      state.isLoadingPassword = false
      state.status = 'successful'
    })
    .addCase(changeEmail.rejected, (state, action) => {
      state.isLoadingPassword = false
      state.status = 'failed'
      errorToast(action.payload as string)
    })
    .addCase(changePassword.pending, (state) => {
      state.isLoadingPassword = true
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      state.isLoadingPassword = false
      state.status = 'successful'
      successToast(action.payload.message as string)
    })
    .addCase(changePassword.rejected, (state, action) => {
      state.isLoadingPassword = false
      state.status = 'failed'
      errorToast(action.payload as string)
    })
    .addCase(changeProfileImg.pending, (state) => {
      state.isLoadingImage = true
    })
    .addCase(changeProfileImg.fulfilled, (state, action) => {      
      const token = ((action.payload as ApiResponse).data!.token) as string
      localStorage.setItem('token', token)
      state.token = token
      const decodedToken = jwtDecode<DecodedToken>(token)
      state.userInfo = decodedToken.user
      state.imageStatus = 'successful'
      state.isLoadingImage = false
      successToast(action.payload.message as string)
    })
    .addCase(changeProfileImg.rejected, (state, action) => {
      state.imageStatus = 'failed'
      state.isLoadingImage = false
      errorToast(action.payload as string)
    })
    .addCase(removeProfileImg.pending, (state) => {
      state.isLoadingImage = true
    })
    .addCase(removeProfileImg.fulfilled, (state, action) => {
      const token = ((action.payload as ApiResponse).data!.token) as string
      localStorage.setItem('token', token)
      state.token = token
      const decodedToken = jwtDecode<DecodedToken>(token)
      state.userInfo = decodedToken.user
      state.imageStatus = 'successful'
      state.isLoadingImage = false
      successToast(action.payload.message as string)
    })
    .addCase(removeProfileImg.rejected, (state, action) => {
      state.imageStatus = 'failed'
      state.isLoadingImage = false
      errorToast(action.payload as string)
    })
    .addCase(change2faStatus.fulfilled, (state, action) => {
      const token = ((action.payload as ApiResponse).data!.token) as string
      localStorage.setItem('token', token)
      state.token = token
      const decodedToken = jwtDecode<DecodedToken>(token)
      state.userInfo = decodedToken.user
    })
    .addCase(change2faStatus.rejected, (_, action) => {
      errorToast(action.payload as string)
    })
  }
});

export const { login, logout, resetStatus, resetImageStatus } = userSlice.actions;

export default userSlice.reducer;
