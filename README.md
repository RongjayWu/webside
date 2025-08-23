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
- 釣魚鉤子 SVG 滾動提示
- 頁腳可自訂顯示版本號（支援 .env.local 設定，預設已取消）

## 特色亮點

- 全站寬度統一，視覺一致
- 深色模式切換並自動記憶
- Hero 區塊名言打字動畫（Bill Gates）
- 釣魚鉤子 SVG 滾動提示
- Tutor 家教頁獨立內容與滾動行為
- 技能分類卡片、橫向技能列、互動 hover
- 作品集/部落格/技能皆檔案驅動，無後端 API
- 動畫與互動效果豐富
- 版本號可自訂（.env.local），預設不顯示

## 技術棧

- 前端框架：Next.js + React

- 型別安全：TypeScript

- 樣式：Tailwind CSS + @tailwindcss/typography

- 動畫：framer-motion + tsparticles

- Markdown 處理：gray-matter + react-markdown

- 部署：Vercel

## 功能特色

- 首頁 Hero：名人語錄打字動畫、粒子動態背景、釣魚鉤子 SVG 滾動提示

- 關於我 About：個人簡介、照片、經歷 Timeline

- 技能 Skills：分類卡片、橫向技能列、互動 hover 效果

- 作品集 Portfolio：卡片式專案展示、技術標籤、外部連結

- 部落格 Blog：Markdown 文章自動渲染、卡片列表

- 聯絡我 Contact：Email、LinkedIn、GitHub、表單收集

- 家教 Tutor：獨立家教服務頁，滾動提示自動切換

- 全站寬度統一（max-w-6xl）、響應式設計

- 深色模式自動記憶（localStorage）

- 互動式動畫（framer-motion, tsparticles）

- 所有資料皆檔案驅動（無後端 API）

---

## 專案結構

```
webside/
├── content/
│   └── blog/                # Markdown 部落格文章
├── public/                  # 靜態資源（圖片等）
├── src/
│   ├── components/          # 共用元件
│   │   ├── About.tsx
│   │   ├── Background.tsx
│   │   ├── BlogCard.tsx
│   │   ├── BlogList.tsx
│   │   ├── Card.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── OceanBackground.tsx
│   │   ├── Portfolio.tsx
│   │   ├── ScrollToTopButton.tsx
│   │   ├── Skills.tsx
│   │   ├── tutor.tsx
│   │   ├── Textbook.tsx
│   │   ├── VersionFooter.tsx
│   ├── data/
│   │   ├── portfolio.json
│   │   ├── skills.json
│   │   ├── portfolio.tsx
│   │   ├── skills.tsx
│   ├── lib/
│   │   └── getPosts.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── tutor.tsx
│   │   └── blog/[slug].tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── next.config.js
└── README.md
```

## 安裝與啟動教學

### 1. 環境需求

- Node.js 18 以上（建議使用 LTS 版本）
- npm 9 以上

### 2. 安裝依賴

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

預設網址：http://localhost:3000

### 4. 建置正式版

```bash
npm run build
npm start
```

### 5. 環境變數（選用）

如需顯示版本號，可於根目錄新增 `.env.local`：

```
NEXT_PUBLIC_VERSION=1.0.0
```

### 6. 常見問題

- 若安裝失敗，請確認 Node.js 版本
- 若無法啟動，請檢查 `package.json` scripts 與依賴
- TailwindCSS 樣式未生效，請確認 `globals.css` 已正確引入
