import React from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "next-i18next";
import "react-datepicker/dist/react-datepicker.css";
import { ko, enUS, ja, fr, es } from "date-fns/locale";
import type { Locale } from "date-fns";
import { DateFilterProps } from "@/types/DateFilterTypes";
import CustomDateInput from "@/components/CustomDateInput";

const localeMap: Record<string, Locale> = {
  ko,
  en: enUS,
  ja,
  fr,
  es,
};

// const CalendarIcon = () => (
//   <svg
//     width="22"
//     height="22"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <rect
//       x="3"
//       y="5"
//       width="18"
//       height="16"
//       rx="2"
//       fill="#fff"
//       stroke="#111"
//       strokeWidth="2"
//     />
//     <path
//       d="M16 3v4M8 3v4"
//       stroke="#111"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//     <path d="M3 9h18" stroke="#111" strokeWidth="2" />
//   </svg>
// );

// const CustomInput = React.forwardRef<
//   HTMLInputElement,
//   React.InputHTMLAttributes<HTMLInputElement>
// >(({ value, onClick, onChange, className, style, ...props }, ref) => (
//   <div style={{ position: "relative", width: "100%" }}>
//     <input
//       type="text"
//       value={value}
//       onClick={onClick}
//       onChange={onChange}
//       ref={ref}
//       className={className}
//       readOnly
//       style={{
//         ...style,
//         paddingRight: "2.5rem", // 아이콘 공간 확보
//         cursor: "pointer",
//       }}
//       {...props}
//     />
//     <span
//       style={{
//         position: "absolute",
//         right: "0.75rem",
//         top: "50%",
//         transform: "translateY(-50%)",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         height: "100%",
//       }}
//       onClick={onClick}
//       tabIndex={-1}
//     >
//       <CalendarIcon />
//     </span>
//   </div>
// ));
// CustomInput.displayName = "CustomInput";
export default function DateFilter({
  year,
  month,
  onYearMonthChange,
}: DateFilterProps) {
  const { t, i18n } = useTranslation("common");
  const selectedDate = new Date(year, month - 1);

  const locale = Object.prototype.hasOwnProperty.call(localeMap, i18n.language)
    ? localeMap[i18n.language as keyof typeof localeMap]
    : enUS;

  const handleChange = (date: Date | null) => {
    if (!date) return;
    onYearMonthChange(date.getFullYear(), date.getMonth() + 1);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("year_month")}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        locale={locale}
        todayButton={t("this_month")}
        // customInput={
        //   <CustomInput className="block w-full rounded border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3 px-2 py-0.5" />
        // }
        customInput={
          <CustomDateInput className="block w-full rounded border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3 px-2 py-0.5" />
        }
      />
    </div>
  );
}
