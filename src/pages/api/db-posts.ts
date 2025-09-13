
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
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      res.status(200).json(posts);
    } else if (req.method === 'POST') {
      // 新增文章
      const { title, content, author, categoryId } = req.body;
      if (!title || !content || !author || !categoryId) {
        res.status(400).json({ error: '缺少必要欄位' });
        return;
      }
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author,
          categoryId: Number(categoryId),
        },
      });
      res.status(201).json(post);
    } else if (req.method === 'PUT') {
      // 批次將某分類下文章歸為未分類
      const { fromCategoryId, toCategoryId } = req.body;
      if (!fromCategoryId || !toCategoryId) {
        res.status(400).json({ error: '缺少必要欄位' });
        return;
      }
      await prisma.post.updateMany({
        where: { categoryId: Number(fromCategoryId) },
        data: { categoryId: Number(toCategoryId) },
      });
      res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      // 刪除文章
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        res.status(400).json({ error: '缺少文章 id' });
        return;
      }
      await prisma.post.delete({ where: { id: Number(id) } });
      res.status(204).end();
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error('API 錯誤:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : '伺服器錯誤' });
  }
}
