import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/pokemon/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});