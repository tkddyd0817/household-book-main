//언어변환 적용완료
import React from "react";
import { useTranslation } from "next-i18next";
import { Transaction } from "@/features/finance/financeSlice";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko, enUS, ja, fr, es } from "date-fns/locale";
import type { Locale } from "date-fns";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

const localeMap: Record<string, Locale> = {
  ko,
  en: enUS,
  ja,
  fr,
  es,
};

const CalendarIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      fill="#fff"
      stroke="#111"
      strokeWidth="2"
    />
    <path
      d="M16 3v4M8 3v4"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M3 9h18" stroke="#111" strokeWidth="2" />
  </svg>
);

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ value, onClick, onChange, className, style, ...props }, ref) => (
  <div style={{ position: "relative", width: "100%" }}>
    <input
      type="text"
      value={value}
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      className={className}
      readOnly
      style={{
        ...style,
        paddingRight: "2.5rem",
        cursor: "pointer",
      }}
      {...props}
    />
    <span
      style={{
        position: "absolute",
        right: "0.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
      onClick={onClick}
      tabIndex={-1}
    >
      <CalendarIcon />
    </span>
  </div>
));
CustomInput.displayName = "CustomInput";

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const { t, i18n } = useTranslation("common");
  const locale = localeMap[i18n.language] || enUS;
  const [formData, setFormData] = useState<Omit<Transaction, "id">>({
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    category: "",
    amount: 0,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      category: "",
      amount: 0,
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {t("register_transaction")}
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("date")}
          </label>
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date: Date | null) =>
              setFormData({
                ...formData,
                date: date ? date.toISOString().split("T")[0] : "",
              })
            }
            dateFormat="yyyy-MM-dd"
            locale={locale}
            todayButton={t("today")}
            placeholderText={t("select_date")}
            customInput={
              <CustomInput className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("type")}
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "income" | "expense",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="expense">{t("expense")}</option>
            <option value="income">{t("income")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("category")}
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={t("category_placeholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("amount")}
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={t("amount_placeholder")}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {t("description")}
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={t("description_placeholder")}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("register_transaction")}
      </button>
    </form>
  );
}

