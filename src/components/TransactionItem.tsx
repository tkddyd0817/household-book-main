import { useState } from "react";
import { Transaction } from "@/features/finance/financeSlice";

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Transaction>(transaction);

  const handleSave = () => {
    onEdit(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(transaction);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border-b pb-4 last:border-b-0 last:pb-0">
        {/* 입력 필드 영역 */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border rounded px-2 py-1"
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
            <option value="expense">지출</option>
            <option value="income">수입</option>
          </select>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border rounded px-2 py-1"
            placeholder="카테고리"
          />
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border rounded px-2 py-1"
            placeholder="설명"
          />
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            className="border rounded px-2 py-1"
            placeholder="금액"
          />
        </div>
        {/* 버튼 영역: 아래쪽 가운데 정렬 */}
        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            취소
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
          <p className="text-sm text-gray-500">{transaction.date}</p>
          <p className="text-sm text-gray-600">{transaction.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className={`font-bold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {transaction.amount.toLocaleString()}원
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 text-sm p-1"
            title="수정"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-red-500 hover:text-red-700 text-sm p-1"
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
