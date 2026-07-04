import Card from '../UI/Card';

export default function CasesSummary({ totalCases }: { totalCases: number }) {
  const handleJump = () => {
    document.getElementById('FeaturedTeachingCases')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card>
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">3. Teaching Cases</h4>
      <button onClick={handleJump} className="w-full text-left group">
        <p className="text-3xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
          {totalCases} <span className="text-sm font-normal text-slate-500">Cases</span>
        </p>
      </button>
    </Card>
  );
}