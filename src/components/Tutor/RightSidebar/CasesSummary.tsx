import Card from '../UI/Card';
import GlassCard from '../../PublicUI/GlassCard';

export default function CasesSummary({ totalCases }: { totalCases: number }) {
  const handleJump = () => {
    document.getElementById('FeaturedTeachingCases')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <GlassCard className="space-y-4">
      <h4 className="text-lg font-semibold text-white/80 uppercase tracking-wider mb-2">教學案例</h4>
      <button onClick={handleJump} className="w-full text-left group">
        <p className="text-3xl font-extrabold text-white/80 group-hover:text-blue-600 transition-colors">
          {totalCases} <span className="text-sm font-normal text-white/60">Cases</span>
        </p>
      </button>
    </GlassCard>
  );
}