//언어 변환 적용완료
import React from "react";
import { useTranslation } from "next-i18next";

interface DateFilterProps {
  year: number;
  month: number;
  onYearMonthChange: (year: number, month: number) => void;
}

export default function DateFilter({
  year,
  month,
  onYearMonthChange,
}: DateFilterProps) {
  const { t } = useTranslation("common");
  const value = `${year}-${month.toString().padStart(2, "0")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [y, m] = e.target.value.split("-");
    onYearMonthChange(Number(y), Number(m));
  };

  return (
    <div className="mb-4 ">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("year_month")}
      </label>
      <input
        type="month"
        value={value}
        onChange={handleChange}
        className="block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}


// import React from "react";

// interface DateFilterProps {
//   year: number;
//   month: number;
//   onYearMonthChange: (year: number, month: number) => void;
// }

// export default function DateFilter({
//   year,
//   month,
//   onYearMonthChange,
// }: DateFilterProps) {
//   // value는 "YYYY-MM" 형식이어야 함
//   const value = `${year}-${month.toString().padStart(2, "0")}`;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const [y, m] = e.target.value.split("-");
//     onYearMonthChange(Number(y), Number(m));
//   };

//   return (
//     <div className="mb-4 ">
//       <label className="block text-sm font-medium text-gray-700 mb-1">년/월</label>
//       <input
//         type="month"
//         value={value}
//         onChange={handleChange}
//         className="block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

