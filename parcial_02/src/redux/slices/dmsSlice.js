import { createSlice } from '@reduxjs/toolkit';
import { Queue } from '../../data-structures/Queue';

const initialState = {
  dms: new Queue(),
};

export const dmsSlice = createSlice({
  name: 'dms',
  initialState,
  reducers: {
    addDm: (state, action) => {
      state.dms.enqueue(action.payload);
    },
    sendDm: (state) => {
      state.dms.dequeue();
    },
    setDms: (state, action) => {
      state.dms = new Queue();
      action.payload.forEach(dm => state.dms.enqueue(dm));
    },
  },
});

export const { addDm, sendDm, setDms } = dmsSlice.actions;
export default dmsSlice.reducer;