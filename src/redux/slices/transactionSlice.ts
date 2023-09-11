import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Transaction } from '@/src/types/transactions';

export interface TransactionState {
  isEditingTransaction: boolean;
  selectedTransaction: Transaction | null;
  showCreateTransactionModal: boolean;
}

const initialState: TransactionState = {
  isEditingTransaction: false,
  selectedTransaction: null,
  showCreateTransactionModal: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setIsEditingTransaction: (
      state,
      action: PayloadAction<{
        transaction: Transaction | null;
        isEditng: boolean;
      }>
    ) => {
      state.isEditingTransaction = action.payload.isEditng;
      state.selectedTransaction = action.payload.transaction;
    },
    setShowCreateTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.showCreateTransactionModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsEditingTransaction, setShowCreateTransactionModal } =
  transactionSlice.actions;

const transactionReducer = transactionSlice.reducer;

export default transactionReducer;
