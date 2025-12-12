import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import OceanBackground from './OceanBackground';
import PostForm from './PostForm';
import CategoryManager from './CategoryManager';
import ArticleList from './ArticleList';
import Footer from './Footer';

type Article = { id: number; title: string; createdAt: string };

type Category = { id: number; name: string };

export default function AdminNewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);

  // 取得分類資料
  useEffect(() => {
    fetch('/api/db-category')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  // 取得文章資料
  useEffect(() => {
    fetch('/api/db-posts')
      .then(res => res.json())
      .then(data => setArticles(data.map((a: any) => ({ id: a.id, title: a.title, createdAt: a.createdAt })) ))
      .catch(() => setArticles([]));
  }, []);


  // 取得分類
  const refetchCategories = async () => {
    fetch('/api/db-category')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  };

  // 取得文章
  const refetchArticles = async () => {
    fetch('/api/db-posts')
      .then(res => res.json())
      .then(data => setArticles(data.map((a: any) => ({ id: a.id, title: a.title, createdAt: a.createdAt })) ))
      .catch(() => setArticles([]));
  };

  // 發文後清空表單，僅更新文章列表
  const [formKey, setFormKey] = useState(0);
  const handleSubmit = async ({ title, content, author, categoryId }: { title: string; content: string; author: string; categoryId: string }) => {
    setError('');
    const res = await fetch('/api/db-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, categoryId, author }),
    });
    if (res.ok) {
      refetchArticles();
      setFormKey(k => k + 1); // 重新掛載 PostForm 以清空
    } else {
      setError('發布失敗，請重試');
    }
  };

  // 分類管理
  const [catError, setCatError] = useState('');
  const handleAddCategory = async (name: string) => {
    setCatError('');
    const res = await fetch('/api/db-category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      const data = await res.json();
      setCategories((prev) => [...prev, data]);
    } else {
      setCatError('新增分類失敗，請重試');
    }
  };
  const handleEditCategory = async (id: number, name: string) => {
    setCatError('');
    const res = await fetch('/api/db-category', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    });
    if (res.ok) {
      const data = await res.json();
      setCategories((prev) => prev.map(cat => cat.id === id ? data : cat));
    } else {
      setCatError('修改分類失敗，請重試');
    }
  };
  const handleDeleteCategory = async (id: number) => {
    setCatError('');
    const res = await fetch('/api/db-category', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok || res.status === 204) {
      setCategories((prev) => prev.filter(cat => cat.id !== id));
    } else {
      setCatError('刪除分類失敗，請重試');
    }
  };

  // 刪除文章
  const handleDeleteArticle = async (id: number) => {
    if (!window.confirm('確定要刪除此文章？')) return;
    const res = await fetch(`/api/db-posts?id=${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      setArticles(prev => prev.filter(a => a.id !== id));
    } else {
      alert('刪除失敗，請重試');
    }
  };

  // 編輯文章（可依需求跳轉或彈窗，這裡預留）
  const handleEditArticle = (id: number) => {
    alert('編輯功能尚未實作，文章ID: ' + id);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar adminMode/>
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-8 md:mt-12 lg:mt-16 px-2 sm:px-4 lg:px-8">
          {/* 空白區塊：可用於排版留白或放置未來功能 */}
          <div className="h-20 sm:h-20 md:h-20 lg:h-20 xl:h-25"></div>
          {/* 發布新文章區塊 */}
          <section id="new-post">
            <PostForm key={formKey} categories={categories} onSubmit={handleSubmit} error={error} />
          </section>
          {/* 文章列表區塊 */}
          <section id="list">
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
              onAdd={async (name) => { await handleAddCategory(name); refetchCategories(); }}
              onEdit={async (id, name) => { await handleEditCategory(id, name); refetchCategories(); }}
              onDelete={async (id) => { await handleDeleteCategory(id); refetchCategories(); }}
            />
          </section>
        </div>
      </main>
      <Footer /> 
      <OceanBackground />
    </div>
  );
}
