import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
  userId: string | null;
  role: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('user') || null,
  role: 'buyer',
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
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
    clearUserData: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setToken, setUser, clearUserData, setRole } = userSlice.actions;

export default userSlice.reducer;
