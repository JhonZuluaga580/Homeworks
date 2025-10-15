import { createSlice } from '@reduxjs/toolkit';
import { Stack } from '../../data-structures/Stack';

const initialState = {
  notifications: new Stack(),
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state) => {
      state.notifications.pop();
    },
    setNotifications: (state, action) => {
      state.notifications = new Stack();
      action.payload.forEach(notif => state.notifications.push(notif));
    },
  },
});

export const { addNotification, removeNotification, setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;