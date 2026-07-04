interface subjects {
  steps: { juniorHigh: string[]; vocational: string[] };
}

export default function Subjects({ steps: subjects }: subjects) {
  return (
    <section id="Subjects" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
      <h3 className="text-2xl font-bold text-slate-900">4. Subjects</h3>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">會考科目</h4>
        <div className="flex flex-wrap gap-2">
          {subjects.juniorHigh.map((sub, i) => (
            <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium">📚 {sub}</span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">統測科目 / 專業科目</h4>
        <div className="flex flex-wrap gap-2">
          {subjects.vocational.map((sub, i) => (
            <span key={i} className="bg-blue-50/50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-medium">⚡ {sub}</span>
          ))}
        </div>
      </div>
    </section>
  );
  
}