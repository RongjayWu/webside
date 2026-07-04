import Card from '../UI/Card';

export default function TeachingHours({ totalHours }: { totalHours: number }) {
  return (
    <Card>
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">1. Teaching Hours</h4>
      <p className="text-3xl font-extrabold text-slate-800">{totalHours.toLocaleString()} <span className="text-sm font-normal text-slate-500">hrs</span></p>
    </Card>
  );
}