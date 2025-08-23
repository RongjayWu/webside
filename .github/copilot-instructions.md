# Copilot Instructions for AI Agents

## 專案架構總覽

- 本專案為 Next.js + TypeScript 單頁式個人網站與部落格，結合 TailwindCSS、framer-motion 動畫、tsparticles 動態背景。
- 主要目錄：
  - `src/components/`：所有共用 React 元件（如 Hero, About, Skills, Portfolio, BlogList, Contact 等）。
  - `src/data/`：JSON 資料來源（`portfolio.json`, `skills.json`），元件動態載入。
  - `content/blog/`：Markdown 格式部落格文章，frontmatter 供標題與摘要。
  - `src/pages/`：Next.js 頁面（`index.tsx` 為主頁，`blog/[slug].tsx` 為動態文章頁）。
  - `public/`：靜態資源（如圖片）。
  - `styles/globals.css`：TailwindCSS 全局樣式。

## 關鍵開發流程

- 安裝依賴：`npm install`
- 啟動開發：`npm run dev`（預設 http://localhost:3000）
- 建置專案：`npm run build`
- Markdown 文章：於 `content/blog/` 新增 `.md` 檔，使用 frontmatter（`title`, `excerpt`），自動渲染於 Blog 區塊。
- 作品集：於 `src/data/portfolio.json` 新增專案物件，Portfolio 區塊自動更新。
- 技能：於 `src/data/skills.json` 新增技能物件，Skills 區塊自動更新。

## 重要慣例與模式

- 所有資料（部落格、作品集、技能）皆以檔案為資料來源，無後端 API。
- 元件設計偏向 props 驅動，資料由父層傳遞或於元件內部載入。
- 動畫與互動效果主要使用 `framer-motion`、`tsparticles`，請參考 `Background.tsx`、`Hero.tsx`。
- 樣式統一採用 TailwindCSS，無 SCSS/CSS Modules。
- Markdown 文章解析採用 `gray-matter` 與 `react-markdown`，請參考 `lib/getPosts.ts` 與 `blog/[slug].tsx`。

## 典型檔案範例

- 新增部落格文章：`content/blog/first-post.md`
- 新增作品集：`src/data/portfolio.json`
- 新增技能：`src/data/skills.json`
- 主頁元件：`src/pages/index.tsx`
- 動態文章頁：`src/pages/blog/[slug].tsx`

## 其他注意事項

- 本專案無測試框架，無 CI/CD 腳本。
- 部署建議使用 Vercel。
- 若需新增元件，請遵循現有 `src/components/` 結構與命名慣例。

---

如有不清楚或未涵蓋之處，請回報以便補充。
