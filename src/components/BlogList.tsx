import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <section id="blog" className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">個人部落格</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-white rounded-lg shadow p-4 transform opacity-0 animate-fadeInUp hover:scale-105 hover:shadow-lg transition"
            style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'forwards' }}
          >
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
