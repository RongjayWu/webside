import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/PublicUI/Navbar';
import OceanBackground from '../../../components/BackgroundComponents/OceanBackground';
import PostForm from '../../../components/Admin/PostForm';
import CategoryManager from '../../../components/Admin/CategoryManager';
import ArticleList from '../../../components/Admin/ArticleList';
import Footer from '../../../components/BackgroundComponents/Footer';
import ScrollToTopButton from '../../../components/PublicUI/ScrollToTopButton';
import TagManager from '../../../components/Admin/TagManager';

// 引入獨立 Service 與型別
import { tagService } from '../../../services/posts/tagService';
import { postService } from '../../../services/posts/articleService';
import { categoryService } from '../../../services/posts/categoryService';
import { Tag, Category, Article } from '../../../types/post';

export default function AdminNewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const [catError, setCatError] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagError, setTagError] = useState('');

  // 預留「未分類」之 UUID
  const DEFAULT_CATEGORY_UUID = '00000000-0000-0000-0000-000000000000';

  // 重新獲取標籤的共用函式
  const refetchTags = useCallback(async () => {
    try {
      const data = await tagService.getAllTags();
      setTags(data || []);
    } catch {
      setTags([]);
    }
  }, []);

  // 重新獲取分類的共用函式
  const refetchCategories = useCallback(async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data.filter((c) => c.id !== DEFAULT_CATEGORY_UUID));
    } catch {
      setCategories([]);
    }
  }, [DEFAULT_CATEGORY_UUID]);

  // 重新獲取文章的共用函式
  const refetchArticles = useCallback(async () => {
    try {
      const data = await postService.getArticles();
      setArticles(data || []);
    } catch {
      setArticles([]);
    }
  }, []);

  // 初始化取得資料 & 監聽 PostForm / TagManager 的全域標籤更新廣播
  useEffect(() => {
    refetchCategories();
    refetchArticles();
    refetchTags();

    // 🚀 關鍵監聽：當 PostForm 新增自定義標籤，或任何元件修改標籤時自動刷新 TagManager
    const handleTagsUpdated = () => {
      refetchTags();
    };

    window.addEventListener('tags-updated', handleTagsUpdated);
    return () => {
      window.removeEventListener('tags-updated', handleTagsUpdated);
    };
  }, [refetchCategories, refetchArticles, refetchTags]);

  // 處理發布新文章
  const handleSubmit = async (formData: any) => {
    setError('');
    try {
      await postService.createArticle(formData);
      await refetchArticles();
      await refetchTags();
      setFormKey((k) => k + 1); // 重置 PostForm
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
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      alert('刪除失敗，請重試');
    }
  };

  // 跳轉到動態編輯頁面
  const handleEditArticle = (id: string) => {
    router.push(`/admin/posts/${id}`);
  };

  // 處理標籤管理：修改
  const handleEditTag = async (id: string, name: string) => {
    setTagError('');
    try {
      await tagService.updateTag(id, name);
      await refetchTags();
      await refetchArticles(); // 同步刷新文章列表顯示的標籤
      window.dispatchEvent(new Event('tags-updated'));
    } catch {
      setTagError('修改標籤失敗');
    }
  };

  // 處理標籤管理：刪除
  const handleDeleteTag = async (id: string) => {
    if (!window.confirm('確定要刪除此標籤？這不會刪除文章，但文章內的此標籤會消失。')) return;
    setTagError('');
    try {
      await tagService.deleteTag(id);
      await refetchTags();
      await refetchArticles();
      window.dispatchEvent(new Event('tags-updated'));
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
            <ArticleList
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          </section>

          {/* 分類管理區塊 */}
          <section id="category" className="mb-12">
            <CategoryManager
              categories={categories}
              onAdd={handleAddCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
            {catError && <p className="text-red-500 text-center mt-2">{catError}</p>}
          </section>

          {/* 標籤管理區塊 */}
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