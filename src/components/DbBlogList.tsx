import { useEffect, useState } from 'react';

interface DbPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: { name: string };
}

export default function DbBlogList() {
  const [posts, setPosts] = useState<DbPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/db-posts')
      .then(res => {
        if (!res.ok) throw new Error('API 回應失敗: ' + res.status);
        return res.json();
      })
      .then(data => {
        console.log('API 回傳資料:', data);
        setPosts(data);
      })
      .catch(err => {
        setError(err.message);
        console.error('API fetch 錯誤:', err);
      });
  }, []);

  return (
    <section id="db-blog" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">個人部落格</h2>
        {error && (
          <div className="text-red-600 dark:text-red-400 text-center mb-6">API 錯誤：{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {posts.length === 0 && !error && (
            <div className="col-span-full text-gray-500 dark:text-gray-400 text-center">目前沒有文章資料。</div>
          )}
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-6 flex flex-col items-center text-center mx-auto transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
            >
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </h3>
              <div className="text-sm mb-2 text-indigo-700 dark:text-indigo-400">{post.category?.name} | {post.author}</div>
              <div className="text-xs mb-2 text-gray-500 dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300 w-full text-left prose prose-indigo dark:prose-invert">
                {/* markdown 內容可用 react-markdown 解析，這裡先純文字顯示 */}
                {post.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
