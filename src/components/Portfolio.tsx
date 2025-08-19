const projects = [
  { title: 'Project A', description: '前端專案範例' },
  { title: 'Project B', description: '全端專案範例' },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">作品集</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <div
            key={proj.title}
            className="bg-white p-4 rounded shadow opacity-0 animate-fadeInUp transform hover:scale-105 hover:shadow-lg transition"
            style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'forwards' }}
          >
            <h3 className="text-xl font-semibold">{proj.title}</h3>
            <p className="text-gray-600">{proj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
