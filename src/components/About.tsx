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
      className="py-24 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        
        <div
          ref={(el) => { cardRefs.current[0] = el!; }}
          data-index={0}
          className={`
          bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-6 flex flex-col items-center text-center 
            transition-all duration-700 cursor-pointer transform-gpu
            hover:shadow-xl hover:scale-102 hover:-translate-y-2 
            hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
          dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
          dark:text-gray-100 dark:shadow-gray-700/20
            ${visibleIndexes[0] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
        >
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          關於我
          </h2>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">
            你好！我是吳榮傑，一位就讀於國立台灣科技大學資訊管理系四年級的學生。喜愛科技、創新以及軟體開發與專案管理，也為此累積了一定經驗。
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">
            我具備 C++、Java、Dart 的程式基礎，並擁有 Flutter App 開發以及 Next.js 網頁開發實戰經驗。同時，我也投入於全端開發專案，運用網站架設及 Git 版本控制。
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">
            除了技術開發，在校內也積極參與各項活動。曾擔任台科絃韻吉他社教學一職，不僅參與各項活動籌辦，也在設課期間積極參與輔助教學，協助社團成長。  
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300">
            在此之外，我也是一名高職資電類家教老師，擁有超過兩年的家教經驗，專注於指導資電類專業科目。這段經歷不僅提升了我的教學能力，也讓我更能理解學生的學習需求與挑戰。
          </p>
        </div>
      </div>
    </section>
  );
}