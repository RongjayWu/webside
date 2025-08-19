import { useEffect, useRef, useState } from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaHtml5, FaCss3Alt, FaJsSquare, FaPython } from 'react-icons/fa';

interface Skill {
  name: string;
  level: string;
  percent: number; // 熟練度百分比
  icon: JSX.Element;
}

const skills = {
  frontend: [
    { name: 'React', level: '熟練', percent: 90, icon: <FaReact size={32} className="text-blue-500" /> },
    { name: 'HTML5', level: '熟練', percent: 95, icon: <FaHtml5 size={32} className="text-orange-500" /> },
    { name: 'CSS3', level: '熟練', percent: 90, icon: <FaCss3Alt size={32} className="text-blue-600" /> },
    { name: 'JavaScript', level: '熟練', percent: 90, icon: <FaJsSquare size={32} className="text-yellow-400" /> },
  ],
  backend: [
    { name: 'Node.js', level: '熟練', percent: 85, icon: <FaNodeJs size={32} className="text-green-600" /> },
    { name: 'Python', level: '中等', percent: 75, icon: <FaPython size={32} className="text-yellow-500" /> },
    { name: 'Database', level: '中等', percent: 70, icon: <FaDatabase size={32} className="text-gray-600" /> },
  ],
  tools: [
    { name: 'Git', level: '熟練', percent: 90, icon: <FaGitAlt size={32} className="text-red-500" /> },
  ],
};

export default function Skills() {
  const skillRefs = useRef<HTMLDivElement[]>([]); // 儲存每個卡片的 ref
  const [visibleIndexes, setVisibleIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setVisibleIndexes(Array(Object.values(skills).flat().length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          } else {
            // 離開視窗重置動畫
            setVisibleIndexes((prev) => {
              const updated = [...prev];
              updated[index] = false;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    skillRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          技能專區
        </h2>

        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 capitalize transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skillList.map((skill, idx) => {
                const flatIndex = Object.values(skills)
                  .flat()
                  .findIndex((s) => s.name === skill.name);

                return (
                  <div
                    key={skill.name}
                    ref={(el) => {
                      skillRefs.current[flatIndex] = el!;
                    }}
                    data-index={flatIndex}
                    className={`
                      bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center 
                      transition-all duration-700 cursor-pointer transform-gpu
                      hover:shadow-xl hover:scale-102 hover:-translate-y-2 
                      hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
                      dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
                      dark:text-gray-100 dark:shadow-gray-700/20
                      ${visibleIndexes[flatIndex] 
                        ? "translate-y-0 opacity-100" 
                        : "translate-y-10 opacity-0"
                      }
                    `}
                  >
                    <div className="mb-4 transition-transform duration-300 hover:scale-110">
                      {skill.icon}
                    </div>
                    <h4 className="text-xl font-semibold transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                      {skill.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                      {skill.level}
                    </p>

                    {/* 進度條 */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 transition-colors duration-300">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700`}
                        style={{ width: visibleIndexes[flatIndex] ? `${skill.percent}%` : '0%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                      {visibleIndexes[flatIndex] ? `${skill.percent}%` : '0%'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}