//언어변환 적용완료

import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Transaction } from "@/features/finance/financeSlice";
import ConfirmModal from "@/components/ConfirmModal";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

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
  };
  const handleCancel = () => {
    setFormData(transaction);
    setIsEditing(false);
  };

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
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border rounded px-2 py-1"
            placeholder={t("date")}
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
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
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
          {/* <p className="text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString(currentLocale)}
          </p> */}
          <p className="text-sm text-gray-600">{transaction.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`font-bold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formattedAmount} {t("currency_unit")}
            {/* {transaction.amount.toLocaleString(currentLocale)} {t("currency_unit")} */}
          </p>
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
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Transaction } from "@/features/finance/financeSlice";
// import ConfirmModal from "@/components/ConfirmModal";

// interface TransactionItemProps {
//   transaction: Transaction;
//   onEdit: (transaction: Transaction) => void;
//   onDelete: (id: string) => void;
// }

// export default function TransactionItem({
//   transaction,
//   onEdit,
//   onDelete,
// }: TransactionItemProps) {
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<Transaction>(transaction);

// const handleDelete = () => {
//     setShowModal(true);
//   };

//   const handleConfirmDelete = () => {
//     onDelete(transaction.id);
//     setShowModal(false);
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false);
//   };

//   const handleSave = () => {
//     onEdit(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData(transaction);
//     setIsEditing(false);
//   };

//   if (isEditing) {
//     return (
//       <div className="border-b pb-4 last:border-b-0 last:pb-0">
//         {/* 입력 필드 영역 */}
//         <div className="flex flex-col md:flex-row md:items-center gap-2">
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="border rounded px-2 py-1"
//           />
//           <select
//             value={formData.type}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 type: e.target.value as "income" | "expense",
//               })
//             }
//             className="border rounded px-2 py-1"
//           >
//             <option value="expense">지출</option>
//             <option value="income">수입</option>
//           </select>
//           <input
//             type="text"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//             placeholder="카테고리"
//           />
//           <input
//             type="text"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="border rounded px-2 py-1"
//             placeholder="설명"
//           />
//           <input
//             type="number"
//             value={formData.amount}
//             onChange={(e) =>
//               setFormData({ ...formData, amount: Number(e.target.value) })
//             }
//             className="border rounded px-2 py-1"
//             placeholder="금액"
//           />
//         </div>
//         {/* 버튼 영역: 아래쪽 가운데 정렬 */}
//         <div className="flex justify-center gap-2 mt-5">
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             저장
//           </button>
//           <button
//             onClick={handleCancel}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             취소
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="border-b pb-4 last:border-b-0 last:pb-0">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="font-medium">{transaction.category}</p>
//           <p className="text-sm text-gray-500">{transaction.date}</p>
//           <p className="text-sm text-gray-600">{transaction.description}</p>
//         </div>
//         <div className="flex items-center gap-2">
//          <p className="text-sm text-gray-500">
//   {new Date(transaction.date).toLocaleDateString('ko-KR')}
// </p>
// <p
//   className={`font-bold ${
//     transaction.type === "income" ? "text-green-600" : "text-red-600"
//   }`}
// >
//   {transaction.type === "income" ? "+" : "-"}
//   {transaction.amount.toLocaleString('ko-KR')}원
// </p>

//           {/* <p
//             className={`font-bold ${
//               transaction.type === "income" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {transaction.type === "income" ? "+" : "-"}
//             {transaction.amount.toLocaleString()}원
//           </p> */}
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-blue-500 hover:text-blue-700 text-sm p-1"
//             title="수정"
//           >
//             ✏️
//           </button>
//           <button
//           onClick={handleDelete}
//             // onClick={() => onDelete(transaction.id)}
//             className="text-red-500 hover:text-red-700 text-sm p-1"
//             title="삭제"
//           >
//             🗑️
//           </button>
//           <ConfirmModal
//         open={showModal}
//         title="삭제 확인"
//         message="정말로 이 내역을 삭제하시겠습니까?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//       />
//         </div>
//       </div>
//     </div>
//   );
// }
