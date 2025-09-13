import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '請輸入帳號與密碼' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }
    // 密碼比對（如資料庫已雜湊，否則直接比對明文）
    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = password === user.password; // DEMO: 實務請改用 bcrypt
    if (!isValid) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }
    // 登入成功，可回傳 token 或 session（此處僅回傳成功）
    return res.status(200).json({ success: true, username: user.username, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: '伺服器錯誤' });
  }
}
