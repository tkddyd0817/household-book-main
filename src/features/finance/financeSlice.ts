import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
    id:string;
    date:string;
    type:"income"|"expense";
    category:string;
    amount:number;
    description:string;
}

interface FinanceState {
    transactions:Transaction[];
    balance:number;
}

// localStorage에서 데이터 불러오기 (클라이언트 사이드에서만)
const loadState = (): FinanceState => {
  // 서버 사이드에서는 빈 상태 반환
  if (typeof window === 'undefined') {
    return {
      transactions: [],
      balance: 0,
    };
  }

  try {
    const serializedState = localStorage.getItem('financeState');
    if (serializedState === null) {
      return {
        transactions: [],
        balance: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
     console.error(err);
    return {
      transactions: [],
      balance: 0,
    };
  }
};

const initialState: FinanceState = loadState();

const financeSlice = createSlice({
    name:"finance",
    initialState,
    reducers:{
        addTransaction:(state,action:PayloadAction<Transaction>)=>{
            state.transactions.push(action.payload);
            state.balance+=action.payload.type === "income"
            ?action.payload.amount
            :-action.payload.amount;
        },
        deleteTransaction:(state, action:PayloadAction<string>)=>{
            const transaction = state.transactions.find(t=>t.id===action.payload);
            if(transaction) {
                state.balance -= transaction.type === "income"
                ?transaction.amount
                :-transaction.amount;
                state.transactions = state.transactions.filter(t=>t.id !== action.payload);
            
            }
        }
    }
})

export const  {addTransaction,deleteTransaction} = financeSlice.actions;
export  const financeReducer = financeSlice.reducer;


