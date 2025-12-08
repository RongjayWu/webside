import { useEffect, useRef, useState } from 'react';
import { skills } from "../data/skills";
// 隨機決定 scale-x-100 或 scale-x-[-100] 讓漂浮方向不同
function getRandomFloatDirection(idx: number) {
  return idx % 2 === 0 ? 'scale-x-100' : 'scale-x-[-100]';
}

// 隨機產生 animation-delay
function getRandomDelay(idx: number) {
  // 0~0.8s 之間分散
  const delays = [0, 0.2, 0.4, 0.6, 0.8];
  return `delay-[${delays[idx % delays.length]}s]`;
}

// 響應式 icon size
function useResponsiveIconSize() {
  const [size, setSize] = useState(32);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setSize(36); // lg 以上
      } else if (window.innerWidth >= 640) {
        setSize(34); // sm 以上
      } else {
        setSize(32); // base
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export default function Skills() {
  const iconSize = useResponsiveIconSize();
  // 只顯示技能名稱與 icon，不顯示熟練度、等級、進度條
  return (
    <section id="skills" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-transparent backdrop-blur-sm overflow-visible mb-8">
          <div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
              技能專區
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="w-full h-full">
                  <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8 border border-white/20 dark:border-gray-700/30 transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20 flex flex-col flex-1 w-full h-full max-w-[400px] min-w-[260px]">
                    <h3 className="text-2xl font-semibold mb-6 capitalize text-center transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center w-full">
                      {skillList.map((skill, idx) => (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center justify-center"
                        >
                          <div
                            className={`mb-2 text-white animate-float ${getRandomFloatDirection(idx)}`}
                            style={{ animationDelay: `${(idx * 0.17) % 1.1}s` }}
                          >
                            {skill.icon(iconSize)}
                          </div>
                          <div className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-1">{skill.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}