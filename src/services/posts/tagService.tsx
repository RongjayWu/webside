import { supabase } from '../../lib/supabase';
import { Tag } from '../../types/post'; // 引入 Tag 型別

export const tagService = {
  /** 取得所有標籤 */
  async getAllTags(): Promise<Tag[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  /** 修改標籤名稱 (同步自動更新 slug) */
  async updateTag(id: string, newName: string): Promise<void> {
    const newSlug = newName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
      .replace(/[\s_-]+/g, '-');

    const { error } = await supabase
      .from('tags')
      .update({ name: newName, slug: newSlug })
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  /** 刪除標籤 (因為有 CASCADE，中間表的關聯會自動被資料庫清除) */
  async deleteTag(id: string): Promise<void> {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};