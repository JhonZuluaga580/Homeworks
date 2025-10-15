import { createSlice } from '@reduxjs/toolkit';
import { LinkedList } from '../../data-structures/LinkedList';

const initialState = {
  posts: new LinkedList(),
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.append(action.payload);
    },
    removePost: (state, action) => {
      state.posts.remove(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = new LinkedList();
      action.payload.forEach(post => state.posts.append(post));
    },
  },
});

export const { addPost, removePost, setPosts } = postsSlice.actions;
export default postsSlice.reducer;