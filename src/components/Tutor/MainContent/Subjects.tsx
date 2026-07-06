import GlassCard from "../../PublicUI/GlassCard";
interface SubjectsProps {
  steps: {
    juniorHigh: string[];
    vocational: string[];
  };
}

export default function Subjects({ steps }: SubjectsProps) {
  return (
    <GlassCard id="Subjects" className="p-8 space-y-6 scroll-mt-24 bg-white/80 dark:bg-gray-800/50">  
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">探勘的知識海域：會考與資電類專業學科</h3>
        <div className="text-xs font-bold tracking-widest text-blue-500 dark:text-cyan-400 uppercase">Charted Ocean</div>
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-400 dark:text-white uppercase tracking-wider mb-3">🗺️ 基礎常規海域 (會考科目)</h4>
        <div className="flex flex-wrap gap-2">
          {steps.juniorHigh.map((sub, i) => (
            <span 
              key={i} 
              className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-medium border border-transparent dark:border-white/5"
            >
              📚 {sub}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-base font-bold text-gray-400 dark:text-white uppercase tracking-wider mb-3">⚡ 蓄能風暴海域 (資電類專業科目)</h4>
        <div className="flex flex-wrap gap-2">
          {steps.vocational.map((sub, i) => (
            <span 
              key={i} 
              className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-white/90 px-3 py-1.5 rounded-xl text-xs font-medium border border-blue-500/20"
            >
              ⚡ {sub}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}