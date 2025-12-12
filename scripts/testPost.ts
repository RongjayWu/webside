const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL);

async function seedTestPost() {
  const result = await sql`
    INSERT INTO posts (title, author, excerpt, content, category, created_at)
    VALUES (
      '測試文章',
      '測試作者',
      '這是一篇測試用的文章摘要',
      '這是測試文章的內容，可以隨時刪除。',
      '測試分類',
      NOW()
    ) RETURNING *;
  `;
  console.log('已新增測試文章：', result[0]);
}

async function deleteTestPost() {
  const result = await sql`
    DELETE FROM posts WHERE title = '測試文章' RETURNING *;
  `;
  console.log('已刪除測試文章：', result);
}

// 執行新增或刪除（請自行選擇要執行哪個）
seedTestPost();
// deleteTestPost();
