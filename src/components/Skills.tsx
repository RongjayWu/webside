import { useEffect, useRef, useState } from 'react';
import { skills } from "../data/skills";

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
    <section id="skills" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          技能專區
        </h2>

        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20">
              <h3 className="text-2xl font-semibold mb-6 capitalize text-center transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                {category}
              </h3>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {skillList.map((skill, idx) => {
                  const flatIndex = Object.values(skills)
                    .flat()
                    .findIndex((s) => s.name === skill.name);
                  return (
                    <div
                      key={skill.name}
                      ref={(el) => { skillRefs.current[flatIndex] = el!; }}
                      data-index={flatIndex}
                      className={`flex items-center py-4 gap-6 sm:gap-8 md:gap-12 text-center transition-all duration-700 ${visibleIndexes[flatIndex] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    >
                      <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">{skill.icon}</div>
                      <div className="w-32 text-lg font-semibold">{skill.name}</div>
                      <div className="w-20 text-gray-500 dark:text-gray-400">{skill.level}</div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 transition-all duration-1000"
                            style={{ width: visibleIndexes[flatIndex] ? `${skill.percent}%` : '0%' }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">{visibleIndexes[flatIndex] ? `${skill.percent}%` : '0%'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}