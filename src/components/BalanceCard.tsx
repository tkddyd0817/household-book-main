import { useEffect, useState } from "react";
import PieChart from "@/components/PieChart";

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export default function BalanceCard({ balance, income, expense }: BalanceCardProps) {
  // 클라이언트에서만 balance를 렌더링
  const [clientBalance, setClientBalance] = useState(0);

  useEffect(() => {
    setClientBalance(balance);
  }, [balance]);

  return (
    <div className="bg-white rounded-lg items-center shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">현재 잔액</h2>
      <p className="text-3xl font-bold text-blue-600">
        {clientBalance.toLocaleString('ko-KR')}원
      </p>
      <PieChart income={income} expense={expense} />
    </div>
  );
}
