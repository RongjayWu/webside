import { TeachingCase } from '../../../types/tutor';
import Link from 'next/link';

interface CasesProps {
  cases: TeachingCase[];
}

export default function FeaturedTeachingCases({ cases }: CasesProps) {
  return (
    <section id="FeaturedTeachingCases" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900">精選教學案例</h3>
        <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">近期展示</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cases.map((c) => (
          <div key={c.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-slate-50/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
              <span>{c.subjectType}</span>
              <span className="text-slate-300">•</span>
              <span>{c.grade}</span>
              <span className="text-slate-300">•</span>
              <span>{c.year}年</span>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{c.focus}</p>
          </div>
        ))}
      </div>

      {/* 使用 Next.js 的 Link 組件進行路由跳轉 */}
      <Link 
        href="/tutor/cases" 
        className="block w-full text-center text-sm font-semibold text-blue-600 py-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
      >
        View All Teaching Cases →
      </Link>
    </section>
  );
}