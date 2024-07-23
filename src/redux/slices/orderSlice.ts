import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/Types'; 

interface OrdersStateProps {
  error: any;
  isLoading: boolean;
  ordersFetched: boolean;
  ordersDataList: Order[];
}

const initialState: OrdersStateProps = {
  isLoading: true,
  error: null,
  ordersFetched: false,
  ordersDataList: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrdersFetched: (state, action: PayloadAction<boolean>) => {
      state.ordersFetched = action.payload;
    },
    setOrdersDataList: (state, action: PayloadAction<Order[]>) => {
      state.ordersDataList = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrdersFetched, setOrdersDataList, setIsLoading, setError } = orderSlice.actions;

export default orderSlice.reducer;