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
      <div className="max-w-6xl mx-auto text-left">
        
        <div
          ref={(el) => { cardRefs.current[0] = el!; }}
          data-index={0}
          className={`
          bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-6 flex flex-col items-start text-left 
            transition-all duration-700 cursor-pointer transform-gpu
            hover:shadow-xl hover:scale-102 hover:-translate-y-2 
            hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
          dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
          dark:text-gray-100 dark:shadow-gray-700/20
            ${visibleIndexes[0] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
          `}
        >
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 text-center w-full">
            關於我
          </h2>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left">
            你好！我是吳榮傑，目前就讀於國立台灣科技大學資訊管理系四年級。我對科技、創新以及軟體開發抱持高度熱情，積極探索新工具與新技術，並在專案中培養出規劃思維與解決問題的能力。求學過程中，我不斷將課堂理論轉化為實作成果，也累積了穩固的開發與專案執行經驗。
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left">
            我具備 C++、Java、Dart 等程式語言基礎，並擁有使用 Flutter 開發跨平台 App 以及 Next.js 進行現代化網頁製作的實作經驗。在參與多個全端相關專案時，我主要負責前後端串接、資料處理、API 使用與 Git 版本控制。這些經驗使我逐步建立系統開發流程的概念，提升了團隊協作與問題解決的能力。
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left">
            在課業之外，我也積極參與校內社團活動，並曾擔任台科絃韻吉他社的教學幹部。期間除了協助規劃與執行各項活動，也在社課中提供輔助指導，協助新生掌握學習方向。這段經驗讓我培養團隊協作、課程規劃與溝通的能力，也深化了我在跨領域環境中工作的彈性與責任感。  
          </p>
          <br/>
          <p className="text-lg leading-relaxed transition-all duration-300 hover:text-gray-700 dark:hover:text-gray-300 text-left">
            此外，我也是一名高職資電類家教老師，擁有兩年以上教學經驗，專注於電機電子與資訊相關專業科目的輔導。透過一對一教學，我更加理解學生的學習困難、知識斷層與能力差異，並調整教材以提升學習效率。這段經歷不僅加強了我的表達與引導能力，也使我在技術之外具備教育與溝通方面的實質能力。
          </p>
        </div>
      </div>
    </section>
  );
}