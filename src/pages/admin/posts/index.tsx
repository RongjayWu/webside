// src/pages/admin/posts/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/PublicUI/Navbar';
import OceanBackground from '../../../components/BackgroundComponents/OceanBackground';
import PostForm from '../../../components/Admin/PostForm';
import CategoryManager from '../../../components/Admin/CategoryManager';
import ArticleList from '../../../components/Admin/ArticleList';
import Footer from '../../../components/BackgroundComponents/Footer';
import ScrollToTopButton from '../../../components/PublicUI/ScrollToTopButton';
import TagManager from '../../../components/Admin/TagManager';
// 引入我們剛才拆分完成的獨立 Service 與型別
import {tagService} from '../../../services/posts/tagService';
import { postService} from '../../../services/posts/articleService';
import { categoryService} from '../../../services/posts/categoryService';
import { Tag, Category, Article } from '../../../types/post'; // 引入型別

export default function AdminNewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  // 🚀 狀態名稱保持叫 articles，完美契合 Article 型別
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const [catError, setCatError] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagError, setTagError] = useState('');

  // 定義你的預留「未分類」之 UUID
  const DEFAULT_CATEGORY_UUID = '00000000-0000-0000-0000-000000000000';

  // 初始化取得分類與文章資料
  useEffect(() => {
    refetchCategories();
    refetchArticles();
    refetchTags();
  }, []);

  // 重新獲取分類的共用函式
  const refetchCategories = async () => {
    try {
      // 🚀 修正：將 getAllCategories() 改為正確的 getCategories()
      const data = await categoryService.getCategories();
      // 過濾掉預設的「未分類」不顯示在管理列表
      setCategories(data.filter(c => c.id !== DEFAULT_CATEGORY_UUID));
    } catch {
      setCategories([]);
    }
  };

  // 重新獲取文章的共用函式
  const refetchArticles = async () => {
    try {
      const data = await postService.getArticles();
      setArticles(data);
    } catch {
      setArticles([]);
    }
  };

  // 重新獲取標籤的共用函式
  const refetchTags = async () => {
    try {
      const data = await tagService.getAllTags();
      setTags(data);
    } catch {
      setTags([]);
    }
  };

  // 處理發布新文章
  const handleSubmit = async (formData: { title: string; content: string; author: string; categoryId: string }) => {
    setError('');
    try {
      await postService.createArticle(formData);
      await refetchArticles();
      await refetchTags();
      setFormKey(k => k + 1); // 重新掛載 PostForm 以清空輸入欄位
    } catch {
      setError('發布失敗，請重試');
    }
  };

  // 處理分類管理：新增
  const handleAddCategory = async (name: string) => {
    setCatError('');
    try {
      await categoryService.createCategory(name);
      await refetchCategories();
    } catch {
      setCatError('新增分類失敗，請重試');
    }
  };

  // 處理分類管理：修改
  const handleEditCategory = async (id: string, name: string) => {
    setCatError('');
    try {
      await categoryService.updateCategory(id, name);
      await refetchCategories();
    } catch {
      setCatError('修改分類失敗，請重試');
    }
  };

  // 處理分類管理：刪除
  const handleDeleteCategory = async (id: string) => {
    setCatError('');
    try {
      await categoryService.deleteCategory(id);
      await refetchCategories();
    } catch {
      setCatError('刪除分類失敗，請重試');
    }
  };

  // 處理刪除文章
  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm('確定要刪除此文章？')) return;
    try {
      await postService.deleteArticle(id);
      setArticles(prev => prev.filter(a => a.id !== id));
    } catch {
      alert('刪除失敗，請重試');
    }
  };

  // 當點擊編輯按鈕時，跳轉到同目錄下的動態編輯路由頁面
  const handleEditArticle = (id: string) => {
    router.push(`/admin/posts/${id}`);
  };

  const handleEditTag = async (id: string, name: string) => {
    setTagError('');
    try {
      await tagService.updateTag(id, name);
      await refetchTags();
      await refetchArticles(); // 同步重新抓取文章以刷新列表顯示的標籤名稱
    } catch {
      setTagError('修改標籤失敗');
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!window.confirm('確定要刪除此標籤？這不會刪除文章，但文章內的此標籤會消失。')) return;
    setTagError('');
    try {
      await tagService.deleteTag(id);
      await refetchTags();
      await refetchArticles(); // 同步重新整理文章列表
    } catch {
      setTagError('刪除標籤失敗');
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar adminMode />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-2 sm:px-4 lg:px-8">
          
          <div className="h-20 sm:h-20 md:h-20 lg:h-20 xl:h-25"></div>
          
          {/* 發布新文章區塊 */}
          <section id="new-post" className="mb-12">
            <PostForm key={formKey} categories={categories} onSubmit={handleSubmit} error={error} />
          </section>
          
          {/* 文章列表區塊 */}
          <section id="list" className="mb-12">
            {/* 🚀 修正：將屬性對齊為 articles={articles}，型別完美閉合 */}
            <ArticleList
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          </section>
          
          {/* 分類管理區塊 */}
          <section id="category">
            <CategoryManager
              categories={categories}
              onAdd={handleAddCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
            {catError && <p className="text-red-500 text-center mt-2">{catError}</p>}
          </section>
          <section id="tag-manager" className="mb-12">
            <TagManager
              tags={tags}
              onEdit={handleEditTag}
              onDelete={handleDeleteTag}
            />
            {tagError && <p className="text-red-500 text-center mt-2">{tagError}</p>}
          </section>
        </div>
      </main>

      <Footer /> 
      <OceanBackground />
      <ScrollToTopButton />
    </div>
  );
}