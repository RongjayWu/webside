interface PhilosophyProps {
  philosophies: string[];
}

export default function TeachingPhilosophy({ philosophies }: PhilosophyProps) {
  return (
    <section id="TeachingPhilosophy" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Teaching Philosophy</h3>
      <ul className="grid grid-cols-1 gap-3">
        {philosophies.map((philo, i) => (
          <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl text-slate-700 font-medium text-sm">
            <span className="text-blue-500">✔</span> {philo}
          </li>
        ))}
      </ul>
    </section>
  );
}