"use client";

import { DataManagerProps } from "@/types/DataManagerTypes";
import { useTranslation } from "next-i18next";

export default function DataManager({
  transactions,
  balance,
}: DataManagerProps) {
  const { t } = useTranslation("common");
  // JSON 파일로 데이터 내보내기
  const exportData = () => {
    const data = {
      transactions,
      balance,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `가계부_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // JSON 파일에서 데이터 가져오기
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.transactions && Array.isArray(data.transactions)) {
            // 기존 데이터를 모두 지우고 새로운 데이터로 교체
            localStorage.setItem("financeState", JSON.stringify(data));
            window.location.reload(); // 페이지 새로고침으로 상태 업데이트
          }
        } catch (error) {
          console.error(error);
          alert("올바른 JSON 파일이 아닙니다.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {/* 데이터 관리 */}
        {t("data_manager")}
      </h2>
      <div className="flex gap-4">
        <button
          onClick={exportData}
          className="
    bg-green-800 text-white
    py-2 px-4 rounded-md
    hover:bg-green-900
    focus:outline-none
    focus"
        >
          {t("export_data")}
        </button>
        <label className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
          {t("import_data")}
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
