import { useTranslation } from "next-i18next";

import { TransactionListProps } from "@/types/TransactionTypes";
import TransactionItem from "@/components/transaction/TransactionItem";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {t("transaction_history")}
      </h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-900 text-center py-8">
            {t("no_transactions")}
          </p>
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
