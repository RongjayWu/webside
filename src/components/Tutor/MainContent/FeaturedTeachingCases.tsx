import { TeachingCase } from '../../../types/tutor';
import Link from 'next/link';
import GlassCard from '../../PublicUI/GlassCard'; // 引入統一的容器元件

interface CasesProps {
  cases: TeachingCase[];
}

export default function FeaturedTeachingCases({ cases }: CasesProps) {
  return (
    // 1. 外層容器：套用 GlassCard，移除白底死板樣式，並加上 scroll-mt-24 優化導覽跳轉
    <GlassCard id="FeaturedTeachingCases" className="p-8 space-y-6 scroll-mt-24">
      
      {/* 頂部標題列 */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          精選教學案例
        </h3>
        <span className="text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-md font-medium">
          近期展示
        </span>
      </div>

      {/* 2. 內層網格：案例卡片組 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) => (
          // 子卡片也套用 GlassCard，但我們透過 className 覆蓋掉預設的 hover 位移，讓視覺焦點留在主卡片上
          <GlassCard 
            key={c.id} 
            className="p-5 transform-none hover:transform-none shadow-md border border-white/10 dark:border-gray-700/20 bg-white/40 dark:bg-gray-800/40"
          >
            {/* 標籤屬性列 */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
              <span>{c.subjectType}</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span>{c.grade}</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span>{c.year}年</span>
            </div>
            {/* 案例核心描述 */}
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              {c.focus}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* 3. 底部按鈕：改為符合毛玻璃風格的軟霓虹按鈕 */}
      <Link 
        href="/tutor/cases" 
        className="block w-full text-center text-sm font-semibold 
                   text-blue-600 dark:text-blue-400 py-3 rounded-xl
                   bg-blue-500/10 hover:bg-blue-500/20 
                   border border-blue-500/20 hover:border-blue-500/30
                   transition-all duration-300 backdrop-blur-sm"
      >
        View All Teaching Cases →
      </Link>
      
    </GlassCard>
  );
}