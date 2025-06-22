import { Transaction } from "@/types/TransactionTypes";

export interface DataManagerProps {
  transactions: Transaction[];
  balance: number;
}