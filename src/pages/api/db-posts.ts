
// Next.js API Route：部落格文章 CRUD API
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
// 建立 Prisma Client 單例（Vercel/Serverless最佳化）
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// API 入口函式
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 取得所有文章（含分類），依建立時間倒序
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        include: { category: true }, // 取得關聯分類資料
        orderBy: { createdAt: 'desc' }, // 依建立時間排序
        take: 50, // 限制最多 50 筆
      });
      res.status(200).json(posts);
    } else {
      // 其他 HTTP 方法（如 POST/PUT/DELETE）目前未支援
      res.status(405).end(); // 回傳 405 Method Not Allowed
    }
  } catch (error) {
    console.error('API 錯誤:', error);
    res.status(500).json({ error: '伺服器錯誤' });
  }
}
