import { Transaction } from "@/features/finance/financeSlice";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">거래 내역</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">거래 내역이 없습니다.</p>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                </div>
                <p className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toLocaleString()}원
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}