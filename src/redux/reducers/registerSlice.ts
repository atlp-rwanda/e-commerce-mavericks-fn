import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userInfo: null,
    isRegistered: false,
    isVerified: false,
  },
  reducers: {
    setUserRegistered: (state, action) => {
      state.isRegistered = true;
      state.userInfo = action.payload;
    },
    setUserVerified: state => {
      state.isVerified = true;
      state.isRegistered = true;
    },
  },
});

export const { setUserRegistered, setUserVerified } = authSlice.actions;
export default authSlice.reducer;
