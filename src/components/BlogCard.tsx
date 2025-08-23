import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
}

export default function BlogCard({ slug, title, excerpt }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
  <a className="block bg-white/80 rounded-lg shadow hover:shadow-lg p-4 transition">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{excerpt}</p>
      </a>
    </Link>
  );
}