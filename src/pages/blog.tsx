import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OceanBackground from '../components/OceanBackground';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('API 錯誤');
        const data = await res.json();
        console.log('API posts:', data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('取得文章失敗:', err);
        setPosts([]);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>迷航日誌 | Rongjay</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <div className="relative overflow-hidden">
        <Navbar />
        <main className="relative z-10">
          <section className="py-24 px-4 text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">迷航日誌</h2>
              <div className="space-y-8">
                {posts.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
                    日誌似乎沒有內容
                  </div>
                ) : (
                  posts.map((post: any) => (
                    <div key={post.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8">
                      <h3 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">{post.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                      {/* 可加全文連結或彈窗 */}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          <Footer />
          <OceanBackground />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}
