import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/Types';

interface OrdersState {
  isOrdersFetched: boolean;
  error: string | null;
  allOrders: Order[];
}

const initialState: OrdersState = {
  isOrdersFetched: false,
  error: null,
  allOrders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isOrdersFetched = action.payload;
    },
    setIsOrdersFetched: (state, action: PayloadAction<boolean>) => {
        state.isOrdersFetched = action.payload;
      },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    cancelOrder: (state, action: PayloadAction<string>) => {
      state.allOrders = state.allOrders.map(order =>
        order.id === action.payload ? { ...order, status: 'cancelled' } : order
      );
    },
    setAllOrders: (state, action: PayloadAction<Order[]>) => {
      state.allOrders = action.payload;
    },
  },
});

export const { setLoading, setError, setAllOrders, setIsOrdersFetched, cancelOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
