import { useEffect, useState } from "react";
import PieChart from "@/components/chart/PieChart";
import { useTranslation } from "next-i18next";
import { BalanceCardProps } from "@/types/BalanceCardTypes";


export default function BalanceCard({
  balance,
  income,
  expense,
}: BalanceCardProps) {
  const { t } = useTranslation("common");
  // 클라이언트에서만 balance를 렌더링
  const [clientBalance, setClientBalance] = useState(0);

  useEffect(() => {
    setClientBalance(balance);
  }, [balance]);

  return (
    <div className="bg-white rounded-lg items-center shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{t("balance")}</h2>
      <p className="text-3xl font-bold text-blue-600">
        {clientBalance.toLocaleString()} {t("currency_unit")}
      </p>
      <PieChart income={income} expense={expense} />
    </div>
  );
}

