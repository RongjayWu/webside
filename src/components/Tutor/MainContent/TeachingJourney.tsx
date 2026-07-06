import GlassCard from "../../PublicUI/GlassCard" // 引入你修正後的常駐橫條 GlassCard

interface JourneyProps {
  journey: { 
    whyStart: string; 
    whyExamPrep: string; 
    growthProcess: string 
  };
}

export default function TeachingJourney({ journey }: JourneyProps) {
  return (
    // 套用 GlassCard，設定 p-8 內距與 scroll-mt-24 導覽優化
    <GlassCard id="TeachingJourney" className="p-8 space-y-6 scroll-mt-24 bg-white/80 dark:bg-gray-800/50">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          意外的起航信號：誤打誤撞開始教學這檔事
        </h3>
        <div className="text-xs font-bold tracking-widest text-blue-500 dark:text-cyan-400 uppercase">
          An Uncharted Signal
        </div>
      </div>
      
      {/* 內文敘述區塊：在最下方留出 pb-2 避免文字黏到常駐的底部橫條 */}
      <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed pb-2">
        
        {/* 段落一：為何開始教學 */}
        <div className="space-y-2">
          <h4 className="inline-flex items-center gap-1.5 font-bold text-base px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
            🧭 偏離預設航道 (為何開始)
          </h4>
          <p className="mt-1.5 text-gray-700 dark:text-gray-300">
            {journey.whyStart}
          </p>
        </div>
        
        {/* 段落二：為何投入升學輔導 */}
        <div className="space-y-2">
          <h4 className="inline-flex items-center gap-1.5 font-bold text-base px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
            ⛈️ 穿越統測風暴 (為何投入升學輔導)
          </h4>
          <p className="mt-1.5 text-gray-700 dark:text-gray-300">
            {journey.whyExamPrep}
          </p>
        </div>
        
        {/* 段落三：教學成長過程 */}
        <div className="space-y-2">
          <h4 className="inline-flex items-center gap-1.5 font-bold text-base px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            📜 船長的掌舵修煉 (教學成長過程)
          </h4>
          <p className="mt-1.5 text-gray-700 dark:text-gray-300">
            {journey.growthProcess}
          </p>
        </div>
        
      </div>
    </GlassCard>
  );
}