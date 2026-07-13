
type Category = { id: number; name: string };
type Props = {
  categories: Category[];
  onAdd: (name: string) => Promise<void>;
  onEdit: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

import { useState } from 'react';

export default function CategoryManager({ categories, onAdd, onEdit, onDelete }: Props) {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLocalError('');
    try {
      await onAdd(name);
      setName('');
    } catch {
      setLocalError('新增分類失敗，請重試');
    }
    setSubmitting(false);
  };

  const handleEdit = async (id: number) => {
    setSubmitting(true);
    setLocalError('');
    try {
      await onEdit(id, editingName);
      setEditingId(null);
      setEditingName('');
    } catch {
      setLocalError('修改分類失敗，請重試');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('確定要刪除此分類？')) {
      setSubmitting(true);
      setLocalError('');
      try {
        await onDelete(id);
      } catch {
        setLocalError('刪除分類失敗，請重試');
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden mb-8">
      <div className="p-6 sm:p-8 md:p-10">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">分類管理</h3>
        <form onSubmit={handleAdd} className="space-y-4 mb-8">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="分類名稱"
          required
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 font-semibold tracking-wide shadow hover:scale-105 transition-all"
          disabled={submitting}
        >
          {submitting ? '新增中...' : '新增分類'}
        </button>
         {localError && <p className="text-red-500 text-center mt-2">{localError}</p>}
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold w-20">編號</th>
                <th className="px-4 py-2 text-left font-semibold">分類名稱</th>
                <th className="px-4 py-2 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400 dark:text-gray-500">目前沒有分類資料。</td>
                </tr>
              )}
              {categories.filter(cat => cat.id !== 1).map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-4 py-2 break-all max-w-xs md:max-w-md">
                    {editingId === cat.id ? (
                      <input
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                      />
                    ) : (
                      <span className="text-gray-900 dark:text-gray-100 text-left break-all">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right">
                    <div className="inline-flex gap-2">
                      {editingId === cat.id ? (
                        <>
                          <button
                            className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded shadow hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 font-semibold tracking-wide transition-all"
                            onClick={() => handleEdit(cat.id)}
                            disabled={submitting}
                          >儲存</button>
                          <button
                            className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded shadow font-semibold transition-all"
                            onClick={() => { setEditingId(null); setEditingName(''); }}
                            disabled={submitting}
                          >取消</button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded shadow hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 font-semibold tracking-wide transition-all"
                            onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                            disabled={submitting}
                          >編輯</button>
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 font-semibold transition-all"
                            onClick={async () => {
                              setSubmitting(true);
                              setLocalError('');
                              try {
                                // 先將該類別下文章歸為未分類
                                await fetch('/api/db-posts', {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ fromCategoryId: cat.id, toCategoryId: 1 }),
                                });
                                await handleDelete(cat.id);
                              } catch {
                                setLocalError('刪除分類失敗，請重試');
                              }
                              setSubmitting(false);
                            }}
                            disabled={submitting}
                          >刪除</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
    </div>
  );
}
