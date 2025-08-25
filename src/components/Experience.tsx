import experiences from '../data/experiences.json';

export default function Experience() {
  return (
    <section id="experience" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          工作經歷
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, i) => (
            <div
              key={exp.title + exp.company}
              className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col md:flex-row items-start md:items-center text-left transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
                <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">{exp.company}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{exp.description}</p>
              </div>
              <div className="md:ml-8 md:text-right text-indigo-700 dark:text-indigo-400 font-bold text-lg shrink-0">
                {exp.years}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
