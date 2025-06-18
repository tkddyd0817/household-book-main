interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">현재 잔액</h2>
      <p className="text-3xl font-bold text-blue-600">
        {balance.toLocaleString()}원
      </p>
    </div>
  );
}