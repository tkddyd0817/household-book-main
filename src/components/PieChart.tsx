// //모바일,데스크탑 화면에서 차트.범례 크기까지 위치까지 완료한 버전
import { useEffect, useState } from "react";
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
  const [size, setSize] = useState(240);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setSize(desktop ? 384 : 240); // 모바일(아이폰 12 프로)에서 240px
      setIsDesktop(desktop);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          size: isDesktop ? 16 : 20, // 모바일에서 더 크게
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
          boxWidth: isDesktop ? 28 : 32, // 모바일에서 더 크게
          font: {
            size: isDesktop ? 22 : 24, // 모바일에서 더 크게
            weight: "bold" as const,
          },
          padding: isDesktop ? 28 : 24, // 모바일에서 더 띄움
        },
      },
    },
    layout: {
      padding: {
        top: 20, // 범례와 차트 사이 간격 20px
      },
    },
    maintainAspectRatio: false,
  };

  const legendItems = [
    { color: "#16a34a", label: t("income") },
    { color: "#dc2626", label: t("expense") },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        {/* 커스텀 범례 */}
        <div
          className="flex flex-row gap-6"
          style={{ marginBottom: 20, marginTop: isDesktop ? 0 : 40 }} // 항상 20px 간격
        >
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center">
              <span
                className="inline-block mr-2"
                style={{
                  width: isDesktop ? 28 : 28,
                  height: isDesktop ? 28 : 28,
                  backgroundColor: item.color,
                  borderRadius: 4,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: isDesktop ? 22 : 22,
                  color: "#666",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
        {/* 차트 */}
        <div
          style={{
            width: size,
            height: size + (isDesktop ? 32 : 40),
          }}
        >
          <Pie
            data={data}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                legend: { display: false },
              },
            }}
            plugins={[ChartDataLabels]}
            width={size}
            height={size}
          />
        </div>
      </div>
    </div>
  );
}

