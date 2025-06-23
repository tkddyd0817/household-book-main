"use client";

import React from "react";
import { useTranslation } from "next-i18next";
import { ConfirmModalProps } from "@/types/ConfirmModalTypes";



export default function ConfirmModal({
  open,
  title = "확인",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { t } = useTranslation("common");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h3 className="text-lg font-bold mb-2">{t(title)}</h3>
        <p className="mb-4">{t(message)}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-green-600  text-white hover:bg-gray-400"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

