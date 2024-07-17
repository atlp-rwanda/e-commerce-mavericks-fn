import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
  userId: string | null;
  role: string | null;
  photoUrl: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('user') || null,
  role: 'buyer',
  photoUrl: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      if (action.payload) {
        localStorage.setItem('user', action.payload);
        localStorage.setItem('user', action.payload);
      } else {
        localStorage.removeItem('user');
      }
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
    setProfile: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
    clearUserData: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.userId = null;
      state.photoUrl = null;
    },
  },
});

export const { setToken, setUser, clearUserData, setRole, setProfile } = userSlice.actions;

export default userSlice.reducer;
