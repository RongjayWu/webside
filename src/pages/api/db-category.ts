import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 取得所有分類
    const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
    res.status(200).json(categories);
  } else if (req.method === 'POST') {
    // 新增類別
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } else if (req.method === 'PUT') {
    // 修改類別
    const { id, name } = req.body;
    const category = await prisma.category.update({ where: { id }, data: { name } });
    res.status(200).json(category);
  } else if (req.method === 'DELETE') {
    // 刪除類別
    const { id } = req.body;
    await prisma.category.delete({ where: { id } });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
