import React from "react";
import educations from "../data/educations";

const EducationCard: React.FC<{
  degree: string;
  department: string;
  period: string;
}> = ({ degree, department, period }) => (
  <div
    className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 flex flex-col items-start text-left transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20"
  >
    <h3 className="text-2xl font-semibold mb-2">{degree}</h3>
    <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">{department}</div>
    <div className="mt-6 w-full text-right text-indigo-700 dark:text-indigo-400 font-bold text-lg">
      {period}
    </div>
  </div>
);

const Education: React.FC = () => (
  <section id="education" className="py-24 text-gray-900 dark:text-gray-100 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
        求學經歷
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {educations.map((edu, idx) => (
          <EducationCard key={idx} {...edu} />
        ))}
      </div>
    </div>
  </section>
);

export default Education;
