import { useRef, useEffect, useState } from "react";

export default function About() {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<boolean[]>([]);

  useEffect(() => {
    setVisibleIndexes(Array(1).fill(false)); // 只有一個 About 卡片，可調整數量

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          setVisibleIndexes((prev) => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          ref={(el) => { cardRefs.current[0] = el!; }}
          data-index={0}
          className={`
            p-6 rounded-lg shadow-md transition-all duration-700 cursor-pointer
            hover:shadow-xl hover:scale-102 hover:-translate-y-2 
            hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
            dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
            transform-gpu
            ${visibleIndexes[0] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
        >
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
            About Me
          </h2>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">
            我是一名熱愛程式設計的工程師，擁有多年的家教經驗，喜歡學習最新技術並應用於專案中。
          </p>
        </div>
      </div>
    </section>
  );
}