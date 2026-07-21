// src/services/tagService.ts
import { Tag } from '../../types/post'; // 引入 Tag 型別

export const tagService = {
  /** 取得所有標籤 (GET) */
  async getAllTags(): Promise<Tag[]> {
    const res = await fetch('/api/db-tag');
    if (!res.ok) throw new Error('撈取標籤失敗');
    return res.json();
  },

  /** 新增標籤 (POST) */
  async createTag(name: string): Promise<Tag> {
    const res = await fetch('/api/db-tag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('新增標籤失敗');
    return res.json();
  },

  /** 修改標籤名稱 (PUT) */
  async updateTag(id: string, name: string): Promise<Tag> {
    const res = await fetch('/api/db-tag', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    });
    if (!res.ok) throw new Error('修改標籤失敗');
    return res.json();
  },

  /** 刪除標籤 (DELETE) */
  async deleteTag(id: string): Promise<void> {
    const res = await fetch('/api/db-tag', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok && res.status !== 204) throw new Error('刪除標籤失敗');
  }
};