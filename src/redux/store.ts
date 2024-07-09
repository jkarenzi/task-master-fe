import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import stickyReducer from './slices/stickySlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    stickyNote: stickyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
