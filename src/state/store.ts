import { configureStore } from '@reduxjs/toolkit';
import { mavericksApi } from '../services';
import counterReducer from './counter/counterSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import registerReducer from './register/registerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    register: registerReducer,
    [mavericksApi.reducerPath]: mavericksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mavericksApi.middleware),
});

// Setup listeners for RTK Query features
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
