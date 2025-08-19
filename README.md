# 個人網站 & 部落格 (One-Page Website)

- **專案目標：建立一個 單頁式個人網站，包含：**

  - 首頁介紹 (Hero)

  - 關於我 (About)

  - 技能展示 (Skills)

  - 作品集 (Portfolio)

  - 部落格 (Blog)

  - 聯絡我 (Contact)

- **支援 Markdown 發文、作品集 JSON 動態渲染、TailwindCSS 美化、響應式設計、動畫效果**

## 功能特色

- **首頁 / Hero**
  - 動態背景（粒子動畫）
  - 姓名、Tagline、CTA 按鈕
- **關於我 (About)**
  - 個人簡介、照片
  - Timeline / 經歷展示
- **技能 (Skills)**
  - 技能圖示 / 進度條 / 雷達圖
  - 分組顯示前端、後端、工具等
- **作品集 (Portfolio)**
  - 卡片式專案展示
  - 圖片、標題、技術標籤、外部連結
- **部落格 (Blog)**
  - 最新文章卡片列表
  - Markdown 支援
- **聯絡我 (Contact)**
  - Email、LinkedIn、GitHub
  - 簡單表單收集訊息
- **響應式設計**
  - 適用手機、平板、桌面
- **動畫效果**
  - 卡片 hover、滑動進場動畫、動態背景

---

## 專案結構

```
my-blog/
├── content/blog/           # Markdown 部落格文章
├── src/
│   ├── components/         # 共用元件
│   │   ├── Card.tsx
│   │   ├── Background.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Portfolio.tsx
│   │   ├── BlogList.tsx
│   │   └── Contact.tsx
│   ├── data/               # JSON 資料來源
│   │   ├── portfolio.json
│   │   └── skills.json
│   ├── pages/              # Next.js 頁面
│   │   ├── _app.tsx
│   │   ├── index.tsx       # 首頁 (單頁式)
│   │   └── blog/[slug].tsx # Markdown 文章頁
│   └── styles/
│       └── globals.css     # TailwindCSS 全局樣式
├── package.json            # 專案依賴與腳本
├── tailwind.config.js      # Tailwind CSS 設定
├── tsconfig.json           # TypeScript 設定
└── README.md               # 專案說明文件
```

## 安裝與啟動

1. 安裝依賴套件：

```bash
npm install
```

2. 啟動開發模式：

```bash
npm run dev
```

3. 建置專案：

```
npm run build
```

4. 開啟瀏覽器並訪問：

```arduino
http://localhost:3000
```

## 技術棧

- 前端框架：Next.js + React

- 型別安全：TypeScript

- 樣式：Tailwind CSS + @tailwindcss/typography

- 動畫：framer-motion + tsparticles

- tsparticles (動態背景)

- Markdown 處理：gray-matter + react-markdown

- 部署：Vercel / Netlify(待定)

## 部落格文章新增方式

1. 在 content/blog/ 新增 .md 檔

2. 使用 frontmatter 設定：
   ```markdown
   ---
   title: "文章標題"
   excerpt: "文章摘要"
   ---

   文章內容
   ```
3. 文章會自動出現在首頁 Blog 區塊

## 作品集新增方式

1. 在 src/data/portfolio.json （或你設置的資料檔）新增專案：

```json
{
  "title": "專案名稱",
  "description": "專案描述",
  "image": "/images/project.png",
  "link": "https://github.com/username/project"
}
```

2. Portfolio 區塊會自動渲染卡片

## 技能新增方式

1. 在 src/data/skills.json（或你設置的資料檔）新增技能：

```json
{
  "category": "前端",
  "skills": [
    { "name": "React", "level": 90 },
    { "name": "TypeScript", "level": 85 }
  ]
}
```

2. Skills 區塊會自動更新
