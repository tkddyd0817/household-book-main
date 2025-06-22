"use client";

import { useSelector } from "react-redux";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,

} from "@/features/finance/financeSlice";
import { RootState } from "@/store/store";
import BalanceCard from "@/components/BalanceCard";
// import DataManager from "@/components/DataManager";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import LanguageSelector from "@/components/LanguageSelector";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAll } from "@/features/finance/financeSlice";
import DateFilter from "@/components/DateFilter";
import { useTranslation } from "next-i18next";
import { Transaction } from "@/types/TransactionTypes";

export default function Home() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { transactions, balance } = useSelector(
    (state: RootState) => state.finance
  );

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("financeState");
      if (serializedState) {
        const state = JSON.parse(serializedState);
        dispatch(setAll(state)); // 전체 상태를 store에 반영
      }
    }
  }, [dispatch]);

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
        <h1 className="text-3xl font-bold mb-8 text-center">{t("title")}</h1>
        {/* 반응형 필터 영역 */}
        <div className="flex flex-row items-center gap-2 mb-4">
          <LanguageSelector />
          <DateFilter
            year={year}
            month={month}
            onYearMonthChange={(y, m) => {
              setYear(y);
              setMonth(m);
            }}
          />
        </div>
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
