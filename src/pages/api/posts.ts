import type { NextApiRequest, NextApiResponse } from 'next';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 取得所有文章
    const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    // 新增文章
    const { title, author, excerpt, content, category } = req.body;
    const result = await sql`
      INSERT INTO posts (title, author, excerpt, content, category, created_at)
      VALUES (${title}, ${author}, ${excerpt}, ${content}, ${category}, NOW())
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } else if (req.method === 'PUT') {
    // 編輯文章
    const { id, title, author, excerpt, content, category } = req.body;
    const result = await sql`
      UPDATE posts SET title=${title}, author=${author}, excerpt=${excerpt}, content=${content}, category=${category}
      WHERE id=${id} RETURNING *
    `;
    res.status(200).json(result[0]);
  } else if (req.method === 'DELETE') {
    // 刪除文章
    const { id } = req.body;
    await sql`DELETE FROM posts WHERE id=${id}`;
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
