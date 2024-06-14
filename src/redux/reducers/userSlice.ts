import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  subscription: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    clearUserData: state => {
      state.user = null;
      state.token = null;
      state.subscription = null;
    },
  },
});

export const { setUser, setToken, setSubscription, clearUserData } = userSlice.actions;
export default userSlice.reducer;
