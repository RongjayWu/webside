
// Next.js API Route：部落格文章 CRUD API
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
// 建立 Prisma Client 實例，用於操作資料庫
const prisma = new PrismaClient();


// API 入口函式
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 取得所有文章（含分類），依建立時間倒序
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: { category: true }, // 取得關聯分類資料
      orderBy: { createdAt: 'desc' }, // 依建立時間排序
    });
    res.status(200).json(posts);
  } else {
    // 其他 HTTP 方法（如 POST/PUT/DELETE）目前未支援
    res.status(405).end(); // 回傳 405 Method Not Allowed
  }
}
