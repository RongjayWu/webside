import GlassCard from "../../PublicUI/GlassCard"; // 引入修正後的常駐橫條 GlassCard

interface PhilosophyProps {
  philosophies: string[];
}

export default function TeachingPhilosophy({ philosophies }: PhilosophyProps) {
  return (
    // 1. 套用 GlassCard，設定 p-8 與 scroll-mt-24 導覽優化
    <GlassCard id="TeachingPhilosophy" className="p-8 space-y-6 scroll-mt-24 bg-white/80 dark:bg-gray-800/50">
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          掌舵心法與航海圖：在課堂中重要的事
        </h3>
        <div className="text-xs font-bold tracking-widest text-blue-500 dark:text-cyan-400 uppercase">
          Navigation Chart
        </div>
      </div>
      
      {/* 2. 列表容器：在最下方留出 pb-2 避免文字黏到常駐的底部橫條 */}
      <ul className="grid grid-cols-1 gap-4 pb-2">
        {philosophies.map((philo, i) => (
          // 3. 內層小字卡：降低半透明背景彩度，與主容器拉出前後層次
          <li 
            key={i} 
            className="flex items-start gap-4 p-4 rounded-xl 
                       bg-white/40 dark:bg-gray-800/40 
                       border border-white/10 dark:border-gray-700/20
                       text-gray-700 dark:text-gray-300 font-medium text-sm
                       leading-relaxed"
          >
            {/* 打勾圖示：換成亮藍/亮青色，在暗色模式下也極具質感 */}
            <span className="text-blue-500 dark:text-cyan-400 select-none font-bold mt-0.5">
              ✓
            </span> 
            
            <span>{philo}</span>
          </li>
        ))}
      </ul>
      
    </GlassCard>
  );
}