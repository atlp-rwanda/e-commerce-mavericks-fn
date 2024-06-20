import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: any | null;
  isRegistered: boolean;
  isVerified: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  isRegistered: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserRegistered: (state, action: PayloadAction<any>) => {
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
