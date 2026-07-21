import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin as supabase } from '../../lib/adminsupbase'; // 使用 service_role key 的 supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      // 1. 撈取所有標籤
      case 'GET': {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json(data || []);
      }

      // 2. 新增標籤
      case 'POST': {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: '標籤名稱為必填' });

        const slug = name.toLowerCase().trim().replace(/[^\w\s\u4e00-\u9fa5-]/g, '').replace(/[\s_-]+/g, '-');

        const { data, error } = await supabase
          .from('tags')
          .insert([{ name, slug }])
          .select()
          .single();

        if (error) throw error;
        return res.status(201).json(data);
      }

      // 3. 修改標籤
      case 'PUT': {
        const { id, name } = req.body;
        if (!id || !name) return res.status(400).json({ error: 'ID 與名稱為必填' });

        const slug = name.toLowerCase().trim().replace(/[^\w\s\u4e00-\u9fa5-]/g, '').replace(/[\s_-]+/g, '-');

        const { data, error } = await supabase
          .from('tags')
          .update({ name, slug })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return res.status(200).json(data);
      }

      // 4. 刪除標籤
      case 'DELETE': {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: 'ID 為必填' });

        const { error } = await supabase
          .from('tags')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return res.status(204).end();
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `不支援的方法：${method}` });
    }
  } catch (error: any) {
    console.error('標籤 API 錯誤:', error.message);
    return res.status(500).json({ error: error.message || '伺服器錯誤' });
  }
}