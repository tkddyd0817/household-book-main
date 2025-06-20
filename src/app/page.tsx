"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  Transaction,
} from "@/features/finance/financeSlice";
import { RootState } from "@/store/store";
import BalanceCard from "@/components/BalanceCard";
// import DataManager from "@/components/DataManager";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import LanguageSelector from "@/components/LanguageSelector";
import { useState } from "react";
import DateFilter from "@/components/DateFilter";


export default function Home() {
  const dispatch = useDispatch();
  const { transactions, balance } = useSelector(
    (state: RootState) => state.finance
  );

const [year, setYear] = useState(new Date().getFullYear());
const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleAddTransaction = (transactionData: Omit<Transaction, "id">) => {
    dispatch(
      addTransaction({
        ...transactionData,
        id: Date.now().toString(),
      })
    );
  };

  // **수정 함수**
  const handleUpdateTransaction = (transaction: Transaction) => {
    dispatch(updateTransaction(transaction));
  };

  // // **삭제 함수**
  const handleDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id));
  };

   const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);


  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">가계부</h1>
        <LanguageSelector />
      <DateFilter
  year={year}
  month={month}
  onYearMonthChange={(y, m) => {
    setYear(y);
    setMonth(m);
  }}
/>
        <BalanceCard
          balance={balance}
          income={totalIncome}
          expense={totalExpense}
        />
        {/* <DataManager transactions={transactions} balance={balance} /> */}
        <TransactionForm onSubmit={handleAddTransaction} />
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleUpdateTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </main>
  );
}


