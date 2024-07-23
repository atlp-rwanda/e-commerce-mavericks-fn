import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFormValues } from '../../types/Types';

export interface UserState {
  token: string | null;
  userId: string | null;
  role: string | null;
  is2FAEnabled: boolean;
  photoUrl: File | null;
  userInfo: UserFormValues | null | string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('user') || null,
  role: 'buyer',
  photoUrl: null,
  is2FAEnabled: false,
  userInfo: null,
  isLoading: false,
  error: null,
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
      } else {
        localStorage.removeItem('user');
      }
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
    setProfile: (state, action: PayloadAction<File | null>) => {
      state.photoUrl = action.payload;
    },
    enable2FA: (state, action: PayloadAction<boolean>) => {
      state.is2FAEnabled = action.payload;
    },
    clearUserData: state => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.userId = null;
      state.role = 'guest';
      state.photoUrl = null;
      state.is2FAEnabled = false;
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<UserFormValues>) => {
      state.userInfo = action.payload;
      state.photoUrl = action.payload.photoUrl || state.photoUrl;
    },
    setFetchedUser: (state, action: PayloadAction<UserFormValues>) => {
      state.userInfo = action.payload;
    }
  },
});

export const { setToken, setUser, clearUserData, setRole, setProfile, setLoading, setError, updateUserInfo, setFetchedUser, enable2FA } = userSlice.actions;

export default userSlice.reducer;
