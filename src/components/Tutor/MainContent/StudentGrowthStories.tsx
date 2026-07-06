import { GrowthStory } from '../../../types/tutor';
import GlassCard from '../../PublicUI/GlassCard';

interface StoriesProps {
  stories: GrowthStory[];
}

export default function StudentGrowthStories({ stories }: StoriesProps) {
  return (
    // 1. 外層容器：套用 GlassCard，移除死白底色並加上 scroll-mt-24
    <GlassCard id="StudentGrowthStories" className="p-8 space-y-6 scroll-mt-24">
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          學生培育成果
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          著重於能力與自主學習習慣的建立過程
        </p>
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          // 2. 內層卡片：降低半透明背景彩度，與主容器拉出前後層次
          <div 
            key={story.id} 
            className="border border-white/10 dark:border-gray-700/30 rounded-2xl p-6 bg-white/40 dark:bg-gray-800/40 space-y-5 relative overflow-hidden"
          >
            
            {/* 1. 起始問題 */}
            <div className="flex gap-4 relative">
              {/* 改用帶有低彩度半透明的紅燈號，支援暗色模式 */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                問
              </span>
              <div>
                <h5 className="text-sm font-bold text-gray-800 dark:text-gray-200">起始問題</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  {story.startProblem}
                </p>
              </div>
            </div>

            {/* 2. 學習過程 */}
            <div className="flex gap-4 relative">
              {/* 橘色燈號 */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                過
              </span>
              <div>
                <h5 className="text-sm font-bold text-gray-800 dark:text-gray-200">輔導與學習過程</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  {story.process}
                </p>
              </div>
            </div>

            {/* 3. 最終改變 */}
            <div className="flex gap-4 relative">
              {/* 綠色燈號 - 最終成果 */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                變
              </span>
              <div>
                <h5 className="text-sm font-bold text-gray-800 dark:text-gray-200">思維與習慣的最終改變</h5>
                {/* 強化最終改變的文字顏色對比（亮色/暗色皆適宜的翡翠綠） */}
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 leading-relaxed">
                  {story.finalChange}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </GlassCard>
  );
}