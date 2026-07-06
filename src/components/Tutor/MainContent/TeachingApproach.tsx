import GlassCard from "../../PublicUI/GlassCard"; // 引入修正後的常駐橫條 GlassCard

export default function TeachingApproach() {
  const steps = [
    { title: '⚓ 學習診斷', desc: '透過前測與對談，摸清學生的真實學習起點。' },
    { title: '⚓ 弱點分析', desc: '精準抓出盲點，是觀念不清還是題型缺乏練習？' },
    { title: '⚓ 觀念建立', desc: '拒絕死背！用邏輯與脈絡重新建構學科核心。' },
    { title: '⚓ 題型訓練', desc: '精選歷屆與模擬試題，鍛鍊解題手感與破題速度。' },
    { title: '⚓ 考前策略', desc: '時間管理、配分心法與應考心理建設全方位輔導。' },
  ];

  return (
    <GlassCard id="TeachingApproach" className="p-8 space-y-6 scroll-mt-24  bg-white/80 dark:bg-gray-800/50 ">
      
      {/* ⚓ 融入航海元素的雙語主標題 */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">揚帆進航的五大航道：奠定成功的基礎</h3>
        <div className="text-xs font-bold tracking-widest text-blue-500 dark:text-cyan-400 uppercase">Sailing Strategy</div>
      </div>
      
      {/* 航道時間軸（調整為深藍/青醫色系的航海感） */}
      <div className="relative border-l-2 border-cyan-500/20 dark:border-cyan-500/30 ml-4 space-y-6 pb-2">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-6 group/item">
            
            {/* 定位點：看起來像海圖上的錨點/島嶼 */}
            <div className="absolute -left-[7px] top-1.5 bg-cyan-500 w-3 h-3 rounded-full 
                            border-2 border-white dark:border-gray-800 
                            shadow-[0_0_8px_rgba(6,182,212,0.6)]
                            transform transition-transform duration-300 group-hover/item:scale-125" 
            />
            
            <h4 className="text-md font-bold text-gray-800 dark:text-gray-200 mb-1">
              {step.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
      
    </GlassCard>
  );
}