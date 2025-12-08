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
  
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 假設帳號 admin 密碼 123456
    if (username === "admin" && password === "123456") {
      setError("");
      onSuccess();
      onClose();
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-xs">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">管理員登入</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
            autoFocus
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 font-semibold hover:bg-blue-600 transition">登入</button>
          <button type="button" className="mt-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClose}>取消</button>
        </form>
      </div>
    </div>
  );
}
