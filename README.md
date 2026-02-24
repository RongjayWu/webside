# Next.js 個人網站 & 部落格

本專案為 Next.js + TypeScript 打造的單頁式個人網站與部落格，支援響應式設計、深色模式、動畫互動、家教服務頁面等多項功能。

## 主要功能

- 首頁 Hero：打字動畫名人語錄、粒子動態背景、釣魚鉤子滾動提示
- 關於我 About：個人簡介、經歷
- 技能 Skills：分類卡片、橫向技能列、互動 hover 效果
- 作品集 Portfolio：卡片式專案展示、技術標籤
- 部落格 Blog：Markdown 文章自動渲染
- 聯絡我 Contact：表單、社群連結
- 家教 Tutor：獨立家教服務頁，內容獨立、滾動提示自動切換
- 全站寬度統一（max-w-6xl）、響應式設計
- 深色模式自動記憶（localStorage）
- 互動式動畫（framer-motion, tsparticles）

## 技術棧

- Next.js + React + TypeScript
- Tailwind CSS
- framer-motion, tsparticles
- gray-matter, react-markdown

## 資料來源

- 作品集：`src/data/portfolio.json`
- 技能：`src/data/skills.json`
- 經歷/學歷/社團/教科書：`src/data/experiences.json`、`educations.json`、`clubs.json`、`textbooks.json`
- 部落格文章：`content/blog/*.md`（frontmatter 格式）

## 主要元件

- `src/components/` 內含 About, Hero, Skills, Portfolio, Contact, tutor, Textbook, Club, Education, Experience, Navbar, Footer, OceanBackground, ScrollToTopButton, Card, ArticleList, AdminLoginModal, AdminNewPostPage, CategoryManager, PostForm, DbBlogList 等

## 專案結構（簡要）

```
webside/
├── content/
│   └── blog/                # Markdown 部落格文章
├── public/                  # 靜態資源（圖片等）
├── src/
│   ├── components/          # 共用元件
│   ├── data/                # JSON 資料
│   ├── lib/                 # 工具/函式庫
│   ├── pages/               # Next.js 頁面
│   └── styles/              # 全域樣式
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── README.md
```

## 安裝與啟動教學

1. **環境需求**

   - Node.js 18 以上（建議 LTS）
   - npm 9 以上

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

   預設網址：http://localhost:3000

4. **建置正式版**

   ```bash
   npm run build
   npm start
   ```

5. **環境變數（選用）**

   - 如需顯示版本號，可於根目錄新增 `.env.local`：
     ```
     NEXT_PUBLIC_VERSION=1.0.0
     ```

6. **常見問題**
   - 若安裝失敗，請確認 Node.js 版本
   - 若無法啟動，請檢查 `package.json` scripts 與依賴
   - TailwindCSS 樣式未生效，請確認 `globals.css` 已正確引入
