import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 假設有簡易 session 驗證（可串接 NextAuth 或自訂 session）
function useAuth() {
  // 這裡僅作範例，實際可串接 NextAuth.js
  // 例如 const { data: session, status } = useSession();
  // return { isAuthenticated: !!session };
  // 這裡用 localStorage 模擬
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('isLogin'));
  }, []);
  return { isAuthenticated };
}

export default function NewPostPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [author, setAuthor] = useState('');
  type Category = { id: number; name: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  // 未登入自動導向登入頁
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // 取得分類資料
  useEffect(() => {
    fetch('/api/db-category')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/db-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, categoryId, author }),
    });
    if (res.ok) {
      router.push('/');
    } else {
      setError('發布失敗，請重試');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">發布新文章</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="標題" required className="mb-2 w-full p-2 border rounded" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="內容" required className="mb-2 w-full p-2 border rounded" />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="作者" required className="mb-2 w-full p-2 border rounded" />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="mb-2 w-full p-2 border rounded">
          <option value="">請選擇分類</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">發布</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
