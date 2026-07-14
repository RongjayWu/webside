// src/components/Admin/PostForm.tsx
import { useState, useEffect } from 'react';
import GlassCard from '../PublicUI/GlassCard'; // 🚀 請依你實際存放 GlassCard 的路徑引入

interface PostFormProps {
  categories: any[];
  initialData?: any;       // 接收從資料庫撈出來的舊資料
  onSubmit: (formData: any) => void; // 儲存時觸發的外層函式
  loading?: boolean;       // 按鈕的載入狀態
  error?: string;         // 錯誤訊息
}

export default function PostForm({ initialData, categories, onSubmit, loading, error }: PostFormProps) {
  // 依據資料庫欄位建立相對應的狀態 (State)
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft'); 
  const [featured, setFeatured] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // 當 initialData 傳入時，精確回填所有舊資料
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setSummary(initialData.summary || '');
      setContent(initialData.content || '');
      setStatus(initialData.status || 'draft');
      setFeatured(initialData.featured || false);
      setMetaTitle(initialData.meta_title || '');
      setMetaDescription(initialData.meta_description || '');
      setCoverImage(initialData.cover_image || '');
      setCategoryId(initialData.category_id || '');
    }
  }, [initialData]);

  // 表單送出處理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      slug,
      summary,
      content,
      status,
      featured,
      meta_title: metaTitle,
      meta_description: metaDescription,
      cover_image: coverImage,
      category_id: categoryId || null, // 若為空則轉為 null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {error && (
        <div className="bg-red-500/20 text-red-200 border border-red-500/30 p-4 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      {/* 區塊一：核心內容 */}
      <GlassCard className="block transform-none hover:transform-none hover:scale-100">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 border-b border-white/20 dark:border-gray-700/50 pb-2 mb-4">
          核心內容
        </h3>
        
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
          <div>
            <label className="block text-sm font-medium mb-1">文章標題 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">網址別名 (Slug) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
              placeholder="e.g., my-nextjs-tutorial"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">文章摘要 *</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 h-20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">文章正文 *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 h-60"
              required
            />
          </div>
        </div>
      </GlassCard>

      {/* 區塊二：發布設定 */}
      <GlassCard className="block transform-none hover:transform-none hover:scale-100">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 border-b border-white/20 dark:border-gray-700/50 pb-2 mb-4">
          發布設定
        </h3>
        
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <label className="block text-sm font-medium mb-1">發布狀態</label>
              {/* 🚀 下拉選單風格統一優化：套用一致的 border、圓角與毛玻璃背景 */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="draft" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">草稿 (Draft)</option>
                <option value="published" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">正式發布 (Published)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="ml-2 block text-sm font-medium">
                設為精選文章
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">封面圖網址 (URL)</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">文章分類</label>
              {/* 🚀 下拉選單風格統一優化：套用一致的 border、圓角與毛玻璃背景 */}
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">選擇文章分類 (選填)</option>
                {(categories || []).map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 區塊三：SEO 最佳化 */}
      <GlassCard className="block transform-none hover:transform-none hover:scale-100">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 border-b border-white/20 dark:border-gray-700/50 pb-2 mb-4">
          SEO 設定 (選填)
        </h3>
        
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 h-16"
            />
          </div>
        </div>
      </GlassCard>

      {/* 🚀 新按鈕組：改為使用 GlassCard 包裹，且文字修正為「儲存文章」 */}
      <GlassCard className="flex justify-end pt-4 border-t border-white/10 dark:border-gray-700/30 transform-none hover:transform-none hover:scale-100">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:scale-100 transition-all duration-200"
        >
          {loading ? '儲存中...' : '儲存文章'}
        </button>
      </GlassCard>
      <div className="h-4"></div>

    </form>
  );
}