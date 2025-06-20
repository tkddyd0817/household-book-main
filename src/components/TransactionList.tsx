//언어변환 적용완료
import { useTranslation } from "next-i18next";
import { Transaction } from "@/features/finance/financeSlice";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{t("transaction_history")}</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t("no_transactions")}</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

// import { Transaction } from "@/features/finance/financeSlice";
// import TransactionItem from "./TransactionItem";

// interface TransactionListProps {
//   transactions: Transaction[];
//   onEdit: (transaction: Transaction) => void;
//   onDelete: (id: string) => void;
// }

// export default function TransactionList({
//   transactions,
//   onEdit,
//   onDelete,
// }: TransactionListProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-2xl font-semibold mb-4">거래 내역</h2>
//       <div className="space-y-4">
//         {transactions.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">거래 내역이 없습니다.</p>
//         ) : (
//           transactions.map((transaction) => (
//             <TransactionItem
//               key={transaction.id}
//               transaction={transaction}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
