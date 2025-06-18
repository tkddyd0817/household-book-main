'use client';

import { useDispatch, useSelector } from 'react-redux';

import { addTransaction, Transaction } from '@/features/finance/financeSlice';
import { RootState } from '@/store/store';
import BalanceCard from '@/components/BalanceCard';
import DataManager from '@/components/DataManager';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

export default function Home() {
  const dispatch = useDispatch();
  const { transactions, balance } = useSelector((state: RootState) => state.finance);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    dispatch(addTransaction({
      ...transactionData,
      id: Date.now().toString(),
    }));
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">가계부</h1>
        
        <BalanceCard balance={balance} />
        <DataManager transactions={transactions} balance={balance} />
        <TransactionForm onSubmit={handleAddTransaction} />
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}

