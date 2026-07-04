interface JourneyProps {
  journey: { whyStart: string; whyExamPrep: string; growthProcess: string };
}

export default function TeachingJourney({ journey }: JourneyProps) {
  return (
    <section id="TeachingJourney" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
      <h3 className="text-2xl font-bold text-slate-900">1. Teaching Journey</h3>
      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        <div>
          <h4 className="font-bold text-slate-800 mb-1">✦ 為何開始教學</h4>
          <p>{journey.whyStart}</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-1">✦ 為何投入升學輔導</h4>
          <p>{journey.whyExamPrep}</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-1">✦ 教學成長過程</h4>
          <p>{journey.growthProcess}</p>
        </div>
      </div>
    </section>
  );
}