// src/pages/api/db-category.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin as supabase } from '../../lib/adminsupase'; // 使用 service_role key 的 supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      // 1. 取得所有分類列表 (GET)
      case 'GET': {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw new Error(error.message);
        return res.status(200).json(data);
      }

      // 2. 新增分類 (POST)
      case 'POST': {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: '名稱為必填欄位' });

        // 簡單將名稱轉為網址別名 (Slug)
        const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

        const { data, error } = await supabase
          .from('categories')
          .insert([{ name, slug }])
          .select()
          .single();

        if (error) throw new Error(error.message);
        return res.status(201).json(data);
      }

      // 3. 修改分類名稱與 Slug (PUT)
      case 'PUT': {
        const { id, name } = req.body;
        if (!id || !name) return res.status(400).json({ error: 'ID 與名稱為必填欄位' });

        const slug = name.toLowerCase().trim().replace(/\s+/g, '-');

        const { data, error } = await supabase
          .from('categories')
          .update({ name, slug })
          .eq('id', id)
          .select()
          .single();

        if (error) throw new Error(error.message);
        return res.status(200).json(data);
      }

      // 4. 刪除分類 (DELETE)
      case 'DELETE': {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: 'ID 為必填欄位' });

        // 執行刪除動作
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);

        if (error) throw new Error(error.message);
        return res.status(204).end(); // 204 代表成功且無回傳內容
      }

      // 若非上述 Method 則拒絕訪問
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `不支援的方法：${method}` });
    }
  } catch (error: any) {
    console.error('分類 API 發生錯誤:', error.message);
    return res.status(500).json({ error: error.message || '伺服器內部錯誤' });
  }
}