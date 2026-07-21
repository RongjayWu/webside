// src/pages/api/db-posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin as supabase } from '../../lib/adminsupase'; // 使用 service_role key 的 supabase client

const generateSlug = (text: string) => {
  return text.toLowerCase().trim().replace(/[^\w\s\u4e00-\u9fa5-]/g, '').replace(/[\s_-]+/g, '-');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. 新增文章 (含多對多標籤)
  if (req.method === 'POST') {
    try {
      const { tags, ...postData } = req.body;

      // 新增文章
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([postData])
        .select('id')
        .single();
      if (postError) throw postError;

      // 處理標籤邏輯
      if (Array.isArray(tags) && tags.length > 0) {
        for (const tagName of tags) {
          const tagSlug = generateSlug(tagName);
          
          // Upsert 標籤 (存在則不動作/回傳 ID，不存在則新增)
          let { data: tag, error: tagErr } = await supabase
            .from('tags')
            .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'slug' })
            .select('id')
            .single();

          if (tag) {
            // 寫入關聯表
            await supabase.from('post_tags').insert([{ post_id: post.id, tag_id: tag.id }]);
          }
        }
      }
      return res.status(201).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 2. 獲取文章列表 (含標籤關聯)
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, post_tags ( tags ( name ) )`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // 將資料整理成前端好用的陣列格式
      const formatted = data.map(p => ({
        ...p,
        tags: p.post_tags?.map((pt: any) => pt.tags?.name) || []
      }));
      return res.status(200).json(formatted);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).end();
}