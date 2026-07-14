import { supabase } from '../../lib/supabase';
import { Category } from '../../types/post'; // 引入 Category 型別

export const categoryService = {
  /** 取得所有分類（列表與下拉選單共用） */
  async getCategories(): Promise<Category[]> {
    const res = await fetch('/api/db-category');
    if (!res.ok) throw new Error('撈取分類失敗');
    return res.json();
  },

  /** 新增分類 */
  async createCategory(name: string): Promise<Category> {
    const res = await fetch('/api/db-category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('新增分類失敗');
    return res.json();
  },

  /** 修改分類 */
  async updateCategory(id: string, name: string): Promise<Category> {
    const res = await fetch('/api/db-category', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    });
    if (!res.ok) throw new Error('修改分類失敗');
    return res.json();
  },

  /** 刪除分類 */
  async deleteCategory(id: string): Promise<void> {
    const res = await fetch('/api/db-category', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok && res.status !== 204) throw new Error('刪除分類失敗');
  }
};