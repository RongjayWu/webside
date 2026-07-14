import React, { useState } from 'react';
import GlassCard from '../PublicUI/GlassCard';
import { Tag } from '../../types/post'; // 引入 Tag 型別

type Props = {
  tags: Tag[];
  onEdit: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TagManager({ tags, onEdit, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
  };

  const handleSave = async (id: string) => {
    if (!editName.trim()) return;
    await onEdit(id, editName.trim());
    setEditingId(null);
  };

  return (
    <GlassCard className="block transform-none hover:transform-none hover:scale-100 mb-8">
      <h3 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center border-b border-white/20 dark:border-gray-700/50 pb-2">
        標籤綜合管理
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100/50 dark:bg-gray-800/50">
              <th className="px-4 py-2 text-left font-semibold">標籤名稱</th>
              <th className="px-4 py-2 text-left font-semibold">網址別名 (Slug)</th>
              <th className="px-4 py-2 text-right font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {(!tags || tags.length === 0) && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-400 dark:text-gray-500">目前沒有建立任何標籤。</td>
              </tr>
            )}
            {tags?.map((tag) => (
              <tr key={tag.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors border-b border-gray-100 dark:border-gray-800/50">
                
                {/* 標籤名稱（編輯狀態切換） */}
                <td className="px-4 py-2">
                  {editingId === tag.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <span className="bg-blue-500/15 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full font-medium text-xs">
                      {tag.name}
                    </span>
                  )}
                </td>

                {/* Slug 顯示 */}
                <td className="px-4 py-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {tag.slug}
                </td>

                {/* 按鈕操作組 */}
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  {editingId === tag.id ? (
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => handleSave(tag.id)}
                        className="px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 font-semibold text-xs transition-all"
                      >儲存</button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 font-semibold text-xs transition-all"
                      >取消</button>
                    </div>
                  ) : (
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => startEdit(tag)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 font-semibold text-xs transition-all"
                      >修改</button>
                      <button
                        onClick={() => onDelete(tag.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 font-semibold text-xs transition-all"
                      >刪除</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}