const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 先查詢是否已有 category
  let category = await prisma.category.findFirst({ where: { name: '技術分享' } });
  if (!category) {
    category = await prisma.category.create({ data: { name: '技術分享' } });
  }

  // 新增一篇測試用文章
  await prisma.post.create({
    data: {
      title: 'Prisma + SQLite 部落格測試',
      content: '# 這是一篇測試文章\n\n支援 **Markdown** 格式，歡迎使用 Prisma 管理部落格內容！',
      author: 'Rongjay',
      categoryId: category.id,
    },
  });

  // 新增第二篇測試文章
  await prisma.post.create({
    data: {
      title: '資料庫部落格測試文章',
      content: '# 這是第二篇測試文章\n\n這篇文章用於測試資料庫讀取與網頁顯示，支援 **Markdown**。',
      author: '測試者',
      categoryId: category.id,
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
