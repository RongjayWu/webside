import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setVisibleIndexes(Array(posts.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleIndexes((prev) => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [posts.length]);

  return (
    <section
      id="blog"
      className="py-24 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">個人部落格</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            data-index={i}
            className={`
            bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-6 flex flex-col items-center text-center mx-auto
              transition-all duration-700 cursor-pointer transform-gpu
              hover:shadow-xl hover:scale-102 hover:-translate-y-2 
              hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
            dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
            dark:text-gray-100 dark:shadow-gray-700/20
              ${visibleIndexes[i] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
            `}
          >
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {post.excerpt}
            </p>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
