import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    stack: [] 
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementBy: (state, action) => {
      state.count += action.payload; 
    },
    push: (state, action) => {
      state.stack.push(action.payload); 
    },
    pop: (state) => {
      state.stack.pop();
    }
  },
});

export const { increment, decrement, incrementBy, push, pop } = counterSlice.actions;
export default counterSlice.reducer;