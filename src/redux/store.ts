// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { mavericksApi } from '../services';
import { setupListeners } from '@reduxjs/toolkit/query';
import registerReducer from './slices/registerSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productsSlice';
import categoriesReducer from './slices/categorySlice';
import sidebarSlice from './slices/sidebarSlice';
import orderReducer from './slices/orderSlice';
import activeMenuReducer from './slices/buyerDashboard';
import cartReducer from './slices/cartSlice';
import orderItemsReducer from './slices/orderItemsSlice';
import wishlistReducer from './slices/wishlistSlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    register: registerReducer,
    sidebar: sidebarSlice,
    category: categoriesReducer,
    orders: orderReducer,
    activeMenu: activeMenuReducer,
    orderItems: orderItemsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [mavericksApi.reducerPath]: mavericksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mavericksApi.middleware),
});

// Setup listeners for RTK Query feature
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
