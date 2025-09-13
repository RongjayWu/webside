
import Navbar from '../components/Navbar';
import OceanBackground from '../components/OceanBackground';
import DbBlogList from '../components/DbBlogList';
import UpToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function BlogOceanPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('請輸入帳號與密碼');
      return;
    }
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || '登入失敗');
        return;
      }
      // 登入成功，可進行後續處理（如儲存 session、跳轉等）
  setShowLogin(false);
  setUsername('');
  setPassword('');
  // 跳轉到管理頁
  router.push('/admin/new-post');
    } catch (e) {
      setError('伺服器錯誤，請稍後再試');
    }
  };

  return (
    <div className="relative min-h-screen">
    <Navbar onAdminLoginClick={() => setShowLogin(true)} />
      {/* 登入對話框 */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{lineHeight: '1'}}
              onClick={() => setShowLogin(false)}
              aria-label="關閉登入對話框"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">管理者登入</h2>
            <input
              className="w-full mb-3 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
              type="text"
              placeholder="帳號"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full mb-3 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
              type="password"
              placeholder="密碼"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={handleLogin}
            >
              登入
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10">
        <Hero />
        <DbBlogList />
      </main>
      <OceanBackground />
      <UpToTopButton />
    </div>
  );
}
