import React, { useState } from "react";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ open, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🚀 呼叫後端 API 比對資料庫
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "登入失敗");
      }

      // 登入成功
      onSuccess();
      onClose();
      // 清空表單欄位
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-xs border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 text-center">
          管理員登入
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
            autoFocus
            disabled={loading}
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
            disabled={loading}
          />
          
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "驗證中..." : "登入"}
          </button>
          <button
            type="button"
            className="mt-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            取消
          </button>
        </form>
      </div>
    </div>
  );
}