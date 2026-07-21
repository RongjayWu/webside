// src/components/Admin/PostForm.tsx
import { useState, useEffect, useCallback } from 'react';
import GlassCard from '../PublicUI/GlassCard';
import { tagService } from '../../services/posts/tagService'; // 🚀 請確認 tagService 路徑
import { Tag } from '../../types/post';                 // 🚀 請確認 Tag 型別路徑

interface PostFormProps {
  categories: any[];
  initialData?: any;       // 接收從資料庫撈出來的舊資料
  onSubmit: (formData: any) => void; // 儲存時觸發的外層函式
  loading?: boolean;       // 按鈕的載入狀態
  error?: string;          // 錯誤訊息
}

export default function PostForm({ initialData, categories, onSubmit, loading, error }: PostFormProps) {
  // 表單核心欄位狀態
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

  // 🏷️ 標籤系統相關狀態
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // 存放已選擇的標籤名稱
  const [tagInput, setTagInput] = useState('');
  const [loadingTags, setLoadingTags] = useState(true);

  // 🚀 1. 抽離撈取標籤邏輯，支援初次載入與事件觸發更新
  const fetchTags = useCallback(async () => {
    try {
      setLoadingTags(true);
      const data = await tagService.getAllTags();
      const tagsList = data || [];
      setAvailableTags(tagsList);

      // 🔄 自動同步：若原本選取的標籤在其他地方被刪除，自動從 selectedTags 移除
      setSelectedTags((prevSelected) =>
        prevSelected.filter((selectedName) =>
          tagsList.some((t) => t.name === selectedName)
        )
      );
    } catch (err) {
      console.error('撈取標籤失敗:', err);
    } finally {
      setLoadingTags(false);
    }
  }, []);

  // 🚀 2. 掛載時撈取標籤，並監聽全域 tags-updated 事件
  useEffect(() => {
    fetchTags();

    const handleTagsUpdated = () => fetchTags();
    window.addEventListener('tags-updated', handleTagsUpdated);

    return () => {
      window.removeEventListener('tags-updated', handleTagsUpdated);
    };
  }, [fetchTags]);

  // 3. 當 initialData 傳入時，精確回填所有舊資料（包含標籤與分類）
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

      // 回填舊標籤
      if (Array.isArray(initialData.tags)) {
        const formattedTags = initialData.tags.map((t: any) =>
          typeof t === 'string' ? t : t.name
        );
        setSelectedTags(formattedTags);
      }
    }
  }, [initialData]);

  // 切換/選擇標籤
  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  // 新增自定義標籤（即時寫入 DB 並選取）
  const handleAddCustomTag = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTagName = tagInput.trim();

      // 檢查該標籤是否已在資料庫現有清單中
      const existingTag = availableTags.find(
        (t) => t.name.toLowerCase() === newTagName.toLowerCase()
      );

      if (existingTag) {
        if (!selectedTags.includes(existingTag.name)) {
          setSelectedTags((prev) => [...prev, existingTag.name]);
        }
      } else {
        // 不存在則呼叫 API 寫入 Supabase 資料庫
        try {
          const createdTag = await tagService.createTag(newTagName);
          setAvailableTags((prev) => [createdTag, ...prev]);
          setSelectedTags((prev) => [...prev, createdTag.name]);
          // 廣播給其他標籤元件（如 TagManager）更新
          window.dispatchEvent(new Event('tags-updated'));
        } catch (err) {
          alert('新增標籤至資料庫失敗');
        }
      }
      setTagInput(''); // 清空輸入框
    }
  };

  // 移除已選取的標籤
  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

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
      category_id: categoryId || null,
      tags: selectedTags, // 打包送出已選標籤
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

          {/* 📂 文章分類選單 */}
          <div>
            <label className="block text-sm font-medium mb-1">文章分類</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="" className="bg-white dark:bg-gray-800">無分類</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-gray-800">
                  {cat.name}
                </option>
              ))}
            </select>
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

        <div className="space-y-6 text-gray-900 dark:text-gray-100">
          {/* 發布狀態與精選文章 */}
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <label className="block text-sm font-medium mb-1">發布狀態</label>
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
                className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="featured" className="ml-2 block text-sm font-medium cursor-pointer">
                設為精選文章
              </label>
            </div>
          </div>

          {/* 🏷️ 文章標籤設定區塊 */}
          <div className="border-t border-white/10 dark:border-gray-800/50 pt-4">
            <label className="block text-sm font-medium mb-2">文章標籤 (多選 / 自定義)</label>
            
            {/* 1. 自定義標籤輸入框 */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="輸入新標籤後按 Enter 新增..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddCustomTag}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* 2. 已選擇的標籤膠囊顯示區 */}
            {selectedTags.length > 0 && (
              <div className="mb-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">已選擇：</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map((tagName) => (
                    <span
                      key={tagName}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:bg-blue-400/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    >
                      #{tagName}
                      <button
                        type="button"
                        onClick={() => removeTag(tagName)}
                        className="hover:text-red-500 transition-colors ml-0.5 focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. 點擊選取現有標籤區 */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">點擊選擇現有標籤：</span>
              {loadingTags ? (
                <div className="text-xs text-gray-400 py-1">標籤載入中...</div>
              ) : availableTags.length === 0 ? (
                <div className="text-xs text-gray-400 py-1">資料庫尚無標籤，請在上方輸入新增</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.name);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1 rounded-lg text-xs transition-all border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white/30 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border-gray-300/60 dark:border-gray-700/60 hover:bg-white/60 dark:hover:bg-gray-800/80'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{tag.name}
                      </button>
                    );
                  })}
                </div>
              )}
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

      {/* 按鈕組 */}
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