import { useEffect, useRef, useState } from 'react';
import projects from '../data/portfolio.json';

export default function Portfolio() {
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setVisibleIndexes(Array(projects.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          setVisibleIndexes((prev) => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        });
      },
      { threshold: 0.3 }
    );

    projectRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          作品集
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          {projects.map((proj, i) => (
            <div
              key={proj.title}
              ref={(el) => { projectRefs.current[i] = el!; }}
              data-index={i}
              className={`
                bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md overflow-hidden
                transition-all duration-700 cursor-pointer transform-gpu
                hover:shadow-xl hover:scale-102 hover:-translate-y-2 
                hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
                dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
                dark:text-gray-100 dark:shadow-gray-700/20
                ${visibleIndexes[i] 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-10 opacity-0"
                }
              `}
              style={{ 
                transitionDelay: `${i * 150}ms` // 交錯動畫效果
              }}
            >
                <div className="flex flex-col sm:flex-row h-full bg-white/80 dark:bg-gray-800/80">
                {/* 左方20%區域 - 圖片 */}
                <div className="sm:w-1/5 w-full h-48 sm:h-auto">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* 右方80%區域 - 內容 */}
                <div className="sm:w-4/5 w-full p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* 專案名稱 */}
                    <h3 className="text-2xl font-bold transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                      {proj.title}
                    </h3>
                    
                    {/* 專案簡介 */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {proj.description}
                    </p>
                    
                    {/* 完成日期 */}
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">完成日期：</span>{proj.completedDate}
                    </p>
                    
                    {/* 專案連結 */}
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">專案連結：</span>
                      <a 
                        href={proj.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 ml-1"
                      >
                        {proj.projectLink}
                      </a>
                    </p>
                  </div>
                  
                  {/* 詳情按鈕 */}
                  <div className="mt-4 pt-4">
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      查看詳情
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}