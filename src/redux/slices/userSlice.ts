import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearUserData: state => {
      localStorage.removeItem('token');
      state.token = null;
    },
  },
});

export const { setToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;
