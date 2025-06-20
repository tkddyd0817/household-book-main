//언어변환 적용완료

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
// import { useTranslation } from "react-i18next";
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
          size: 16,
        },
        formatter: (value: number, context: Context) => {
  const rawData = context.chart.data.datasets[0].data as (number | null)[];
  const total = rawData.reduce(
    (sum, v) => (typeof sum === "number" ? sum : 0) + (typeof v === "number" ? v : 0),
    0
  ) as number; // 또는 Math.round(...) 사용
  if (total === 0) return "0%";
  const percent = Math.round((value / total) * 100);
  return percent + "%";
}
      },
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return (
    <div className=" p-6 w-64 mx-auto my-8">
      <Pie data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
}


// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";

// Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// interface PieChartProps {
//   income: number;
//   expense: number;
// }

// export default function PieChart({ income, expense }: PieChartProps) {
//   const data = {
//     labels: ["수입", "지출"],
//     datasets: [
//       {
//         data: [income, expense],
//         backgroundColor: ["#16a34a", "#dc2626"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       datalabels: {
//         color: "#fff",
//         font: {
//           weight: "bold" as const,
//           size: 16,
//         },
//         formatter: (value: number, context: Context) => {
//   const rawData = context.chart.data.datasets[0].data as (number | null)[];
//   const total = rawData.reduce(
//     (sum, v) => (typeof sum === "number" ? sum : 0) + (typeof v === "number" ? v : 0),
//     0
//   ) as number; // 또는 Math.round(...) 사용
//   if (total === 0) return "0%";
//   const percent = Math.round((value / total) * 100);
//   return percent + "%";
// }
//       },
//       legend: {
//         display: true,
//         position: "top" as const,
//       },
//     },
//   };

//   return (
//     <div className=" p-6 w-64 mx-auto my-8">
//       <Pie data={data} options={options} plugins={[ChartDataLabels]} />
//     </div>
//   );
// }
