import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import notificationsReducer from './slices/notificationsSlice';
import dmsReducer from './slices/dmsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
    dms: dmsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Esto ignora las advertencias de no-serializable
    }),
});