// src/types/blog.ts

/** 文章 (Article) 核心型別 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: 'draft' | 'published' | string;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  cover_image?: string;
  category_id?: string | null;
  createdAt: string;     // 前端習慣的小駝峰
  created_at?: string;   // 兼容後端 Supabase 原始欄位
  tags?: string[];       // 🚀 整合進來的標籤名稱陣列
  view_count?: number;   // 瀏覽數
}

/** 分類 (Category) 型別 */
export interface Category {
  id: string;
  name: string;
  slug?: string;
}

/** 標籤 (Tag) 核心型別 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

/** 表單送出時的 Payload 規格 */
export interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: string;
  featured: boolean;
  meta_title: string;
  meta_description: string;
  cover_image: string;
  category_id: string | null;
  tags: string[]; // 經處理後的乾淨字串陣列
}