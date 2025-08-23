import { useRef, useEffect, useState } from "react";

export default function TutorInfoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // SSR 階段不加動畫 class，client 端才加
  const animationClass =
    hasMounted
      ? visible
        ? "translate-y-0 opacity-100"
        : "translate-y-10 opacity-0"
      : "";

  return (
    <section id="tutor-info" className="py-24 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={cardRef}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-700 cursor-pointer transform-gpu hover:shadow-xl hover:scale-102 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 dark:text-gray-100 dark:shadow-gray-700/20 ${animationClass}`}
        >
          <div className="p-6 sm:p-8 md:p-12 lg:p-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white leading-tight">
              家教服務資訊
            </h1>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">服務內容</h2>
              <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>高職資電類課程輔導（電子學，基本電學，程式設計，數位邏輯，微處理機）</li>
                <li>一對一/小班教學，客製化學習計畫</li>
                <li>線上/實體皆可，彈性時間安排</li>
              </ul>
            </section>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">教學特色</h2>
              <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300">
                <li>多年補教業專業班助教，熟悉各類教材與教學方法</li>
                <li>多年家教經驗，耐心細心，善於引導</li>
                <li>強調實作與理解，協助學生建立自信</li>
                <li>提供課程筆記、練習題與自編著教材</li>
              </ul>
            </section>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        </div>
      </div>
    </section>
  );
}
