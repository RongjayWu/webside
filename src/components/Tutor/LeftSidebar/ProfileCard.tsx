import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  avatarUrl: string;
  tags: string[];
}

export default function ProfileCard({ name, avatarUrl, tags }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
      {/* 使用 Next.js 最佳化的 Image 元件 */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
            src="/hero.jpg"
            alt="吳榮傑的個人照片"
            width={320}
            height={320}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            priority
        />
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">{name}</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}