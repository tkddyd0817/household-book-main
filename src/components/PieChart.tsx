//언어변환 적용완료

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import { useTranslation } from "next-i18next";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  income: number;
  expense: number;
}

export default function PieChart({ income, expense }: PieChartProps) {
  const { t } = useTranslation("common");

  const data = {
    labels: [t("income"), t("expense")],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#16a34a", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 22,
        },
        formatter: (value: number, context: Context) => {
          const rawData = context.chart.data.datasets[0].data as (
            | number
            | null
          )[];
          const total = rawData.reduce(
            (sum, v) =>
              (typeof sum === "number" ? sum : 0) +
              (typeof v === "number" ? v : 0),
            0
          ) as number;
          if (total === 0) return "0%";
          const percent = Math.round((value / total) * 100);
          return percent + "%";
        },
      },
      legend: {
        display: true,
        position: "top" as const,
        fullSize: false,
        labels: {
          boxWidth: 32,
          font: {
            size: 18,
            weight: "bold" as const,
          },
          padding: 24,
        },
      },
    },
    // maintainAspectRatio: false, // 이 줄은 주석처리 또는 삭제
  };

  return (
    <div className="p-6 w-96 mx-auto my-8">
      
      <Pie
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
        width={400}
        height={400}
      />
    </div>
  );
}

