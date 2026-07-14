import { supabase } from '../../lib/supabase';
import { Article } from '../../types/post'; // 引入 Article 型別

export const postService = {
  async getArticles(): Promise<Article[]> {
    const res = await fetch('/api/db-posts');
    const data = await res.json();
    return data; // API 回傳的資料已經包含 tags 陣列
  },

  
  /** 根據 ID 取得單篇文章詳細資料 */
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** 新增文章 */
  async createArticle(payload: any) {
    const res = await fetch('/api/db-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('發布失敗');
    return res.json();
  },


  /** 更新文章修改 */
  async updatePost(id: string, updates: Record<string, any>) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** 刪除文章 */
  async deleteArticle(id: string): Promise<void> {
    const res = await fetch(`/api/db-posts?id=${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('刪除文章失敗');
  }
};