// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { mavericksApi } from '../services';
import { setupListeners } from '@reduxjs/toolkit/query';
import registerReducer from './slices/registerSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    [mavericksApi.reducerPath]: mavericksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mavericksApi.middleware),
});

// Setup listeners for RTK Query features
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
