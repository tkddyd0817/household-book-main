import React from "react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Transaction, TransactionItemProps } from "@/types/TransactionTypes";
import DatePicker from "react-datepicker";
import { ko, enUS, ja, fr, es } from "date-fns/locale";
import CustomDateInput from "@/components/common/CustomDateInput";

// locale 매핑
const localeMap = {
  ko,
  en: enUS,
  ja,
  fr,
  es,
};

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const { t, i18n } = useTranslation("common");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Transaction>(transaction);

  const handleDelete = () => setShowModal(true);
  const handleConfirmDelete = () => {
    onDelete(transaction.id);
    setShowModal(false);
  };
  const handleCancelDelete = () => setShowModal(false);
  const handleSave = () => {
    onEdit(formData);
    setIsEditing(false);
    setFormData({
      ...formData,
      amount: 0, // 등록 후 입력창 비우기
      // 필요하다면 다른 필드도 초기화
    });
  };
  const handleCancel = () => {
    setFormData(transaction);
    setIsEditing(false);
  };

  const locale = localeMap.hasOwnProperty(i18n.language)
    ? localeMap[i18n.language as keyof typeof localeMap]
    : enUS;

  const currentLocale = i18n.language || "en";

  // 날짜 포맷
  const formattedDate = new Date(transaction.date).toLocaleDateString(
    currentLocale
  );
  const formattedAmount = transaction.amount.toLocaleString(currentLocale);

  if (isEditing) {
    return (
      <div className="border-b pb-4 last:border-b-0 last:pb-0">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
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
              <CustomDateInput className="border rounded px-2 py-0.5 w-full" />
            }
            wrapperClassName="w-full"
          />
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "income" | "expense",
              })
            }
            className="border rounded px-2 py-1"
          >
            <option value="expense">{t("expense")}</option>
            <option value="income">{t("income")}</option>
          </select>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border rounded px-2 py-1"
            placeholder={t("category_placeholder")}
          />
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border rounded px-2 py-1"
            placeholder={t("description_placeholder")}
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.amount === 0 ? "" : formData.amount}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length > 1) value = value.replace(/^0+/, "");
              setFormData({
                ...formData,
                amount: value === "" ? 0 : Number(value),
              });
            }}
            className="border rounded px-2 py-1"
            placeholder={t("amount_placeholder")}
          />
        </div>
        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t("save")}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{transaction.category}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <p className="text-sm text-gray-600">{transaction.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`font-bold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            } whitespace-nowrap flex-shrink-0`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formattedAmount} {t("currency_unit")}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 text-sm p-1"
            title={t("edit")}
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm p-1"
            title={t("delete")}
          >
            🗑️
          </button>
          <ConfirmModal
            open={showModal}
            title={t("delete")}
            message={t("delete_confirm")}
            onConfirmAction={handleConfirmDelete}
            onCancelAction={handleCancelDelete}
          />
        </div>
      </div>
    </div>
  );
}
