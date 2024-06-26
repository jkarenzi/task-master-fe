import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
    userInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { setToken, setUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
