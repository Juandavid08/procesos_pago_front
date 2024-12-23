// src/redux/slices/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [], // Lista de transacciones
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { addTransaction } = paymentSlice.actions;
export default paymentSlice.reducer;
