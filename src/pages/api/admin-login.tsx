import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin as supabase } from '../../lib/adminsupase'; // 使用 service_role key 的 supabase client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '帳號與密碼為必填' });
  }

  try {
    // 1. 使用 service_role 去查詢用戶（繞過 RLS）
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    // 2. 在伺服器端做密碼比對 (SHA256 比對範例)
    const crypto = await import('crypto');
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');

    if (inputHash !== user.password_hash) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    // 3. 驗證成功 (實務上可在這裡加上 Cookie / Session 設定)
    return res.status(200).json({ success: true, message: '登入成功' });

  } catch (err: any) {
    console.error('登入 API 錯誤:', err);
    return res.status(500).json({ error: '伺服器錯誤' });
  }
}