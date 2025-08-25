import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // 新增文章
    const { title, content, author, categoryId } = req.body;
    const post = await prisma.post.create({
      data: { title, content, author, categoryId }
    });
    res.status(201).json(post);
  } else if (req.method === 'PUT') {
    // 修改/編輯文章
    const { id, title, content, author, categoryId } = req.body;
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, author, categoryId }
    });
    res.status(200).json(post);
  } else if (req.method === 'DELETE') {
    // 刪除文章
    const { id } = req.body;
    await prisma.post.delete({ where: { id } });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
