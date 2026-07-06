import Image from 'next/image';
import GlassCard from '../../PublicUI/GlassCard'; // 引入剛才抽出的背景組件
import { DecorativeBorder } from '../../PublicUI/Decoration';

interface ProfileCardProps {
  name: string;
  avatarUrl: string;
  tags: string[];
}

export default function ProfileCard({ name, avatarUrl, tags }: ProfileCardProps) {
  return (
    // 使用 GlassCard 包裹，並透過 className 傳入內距 p-6 與文字居中
    <GlassCard className="p-6 text-center">
      <div>
        {/* 頭像區塊 */}
        <div className="relative w-24 h-24 mx-auto mb-4 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
            <Image
              src='/hero.jpg' // 使用本地圖片
              alt={`${name} 的個人照片`}
              width={96}
              height={96}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              priority
            />
          </div>
        </div>

        {/* 名字 */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {name}
        </h2>

        {/* 標籤 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* 底部裝飾漸層線 */}
      <DecorativeBorder />
    </GlassCard>
  );
}