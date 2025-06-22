

export interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

export interface Transaction {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
}

export interface FinanceState {
  transactions: Transaction[];
  balance: number;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}