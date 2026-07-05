import GlassCard from '../../PublicUI/GlassCard';
export default function TeachingHours({ totalHours }: { totalHours: number }) {
  return (
    <GlassCard>
      <h4 className="text-lg font-semibold text-white/80 uppercase tracking-wider mb-2">累計總時數</h4>
      <p className="text-3xl font-extrabold text-white/80">{totalHours.toLocaleString()} <span className="text-sm font-normal text-white/60">hrs</span></p>
    </GlassCard>
  );
}