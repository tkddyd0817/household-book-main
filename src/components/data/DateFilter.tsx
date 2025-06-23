import React from "react";
import DatePicker from "react-datepicker";
import { useTranslation } from "next-i18next";
import "react-datepicker/dist/react-datepicker.css";
import { ko, enUS, ja, fr, es } from "date-fns/locale";
import type { Locale } from "date-fns";
import { DateFilterProps } from "@/types/DateFilterTypes";
import CustomDateInput from "@/components/common/CustomDateInput";

const localeMap: Record<string, Locale> = {
  ko,
  en: enUS,
  ja,
  fr,
  es,
};




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
        customInput={
          <CustomDateInput className="block w-full rounded border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-3 px-2 py-0.5" />
        }
      />
    </div>
  );
}
