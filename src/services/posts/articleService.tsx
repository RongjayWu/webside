// src/services/posts/articleService.ts
import { Article } from '../../types/post'; // 引入 Article 型別

export const postService = {
  /** 1. 取得所有文章列表 (含標籤) */
  async getArticles(): Promise<Article[]> {
    const res = await fetch('/api/db-posts');
    if (!res.ok) throw new Error('撈取文章列表失敗');
    return res.json();
  },

  /** 2. 根據 ID 取得單篇文章詳細資料 (改透過 API 取得含標籤資料) */
  async getPostById(id: string): Promise<Article> {
    const res = await fetch(`/api/db-posts?id=${id}`);
    if (!res.ok) throw new Error('取得文章詳細資料失敗');
    const data = await res.json();
    
    // 如果 API 回傳陣列，抓第一筆；若回傳單一物件則直接使用
    return Array.isArray(data) ? data.find((p) => p.id === id) : data;
  },

  /** 3. 新增文章 */
  async createArticle(payload: any) {
    const res = await fetch('/api/db-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('發布文章失敗');
    return res.json();
  },

  /** 4. 更新文章與標籤 (統一改呼叫 API 的 PUT 方法) */
  async updatePost(id: string, updates: Record<string, any>) {
    const res = await fetch('/api/db-posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!res.ok) throw new Error('更新文章失敗');
    return res.json();
  },

  /** 5. 刪除文章 */
  async deleteArticle(id: string): Promise<void> {
    const res = await fetch(`/api/db-posts?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('刪除文章失敗');
  },
};