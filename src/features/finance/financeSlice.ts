import { FinanceState, Transaction } from "@/types/TransactionTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FinanceState = {
  transactions: [],
  balance: 0,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      state.balance +=
        action.payload.type === "income"
          ? action.payload.amount
          : -action.payload.amount;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transaction) {
        state.balance -=
          transaction.type === "income"
            ? transaction.amount
            : -transaction.amount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      }
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        const oldTransaction = state.transactions[index];
        state.balance -=
          oldTransaction.type === "income"
            ? oldTransaction.amount
            : -oldTransaction.amount;
        state.transactions[index] = action.payload;
        state.balance +=
          action.payload.type === "income"
            ? action.payload.amount
            : -action.payload.amount;
      }
    },

    setAll: (state: FinanceState, action: PayloadAction<FinanceState>) => {
      state.transactions = action.payload.transactions;
      state.balance = action.payload.balance;
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction, setAll } =
  financeSlice.actions;
export const financeReducer = financeSlice.reducer;
