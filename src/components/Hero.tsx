
import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";

const quote = "Software is a great combination of artistry and engineering. – Bill Gates";

interface TypingTextProps {
  text: string;
  speed?: number;
}

function TypingText({ text, speed = 60 }: TypingTextProps) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplay("");
    const timer = setInterval(() => {
      setDisplay((prev) => (i < text.length ? prev + text[i] : prev));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{display}</span>;
}

interface HeroProps {
  tutorMode?: boolean;
}

export default function Hero({ tutorMode = false }: HeroProps) {
  // CSR 階段判斷分頁
  const [isBlogPage, setIsBlogPage] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBlogPage(window.location.pathname === '/blog');
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex justify-center items-start pt-16 md:pt-24 px-4"
    >
      {/* 主要卡片容器 */}
      <div className="max-w-6xl mx-auto w-full mt-8 md:mt-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* 卡片內容 */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {/* 左半邊：文字 + 按鈕 */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    你好, 我是{" "}<br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      吳榮傑
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    | 喜愛學習的程式設計師
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    | 高職資電類家教老師
                  </p>
                  <div className="mt-6 text-indigo-700 dark:text-indigo-400 text-base md:text-lg font-medium min-h-[2.5em] h-10 md:h-12 flex items-center">
                    <TypingText text={quote} speed={40} />
                  </div>
                </div>
                {/* CTA 按鈕：三顆按鈕，sm 以上水平排列，sm 以下豎向排列 */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center sm:items-start md:justify-start">
                  {/* 家教服務按鈕 */}
                  <a
                    href="/tutor"
                    className="group relative inline-flex items-center justify-center gap-2 w-48 h-12 md:w-56 md:h-14 px-0 py-0
                             bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                             text-white font-semibold rounded-full shadow-lg hover:shadow-xl
                             transform hover:scale-105 hover:-translate-y-1
                             transition-all duration-300 ease-out
                             dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                  >
                    <span className="relative z-10">家教服務</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                  </a>
                  {/* 部落格分頁時：部落格按鈕改為回首頁，否則顯示部落格按鈕 */}
                  {isBlogPage ? (
                    <a
                      href="/"
                      className="group relative inline-flex items-center justify-center gap-2 w-48 h-12 md:w-56 md:h-14 px-0 py-0
                               bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                               text-white font-semibold rounded-full shadow-lg hover:shadow-xl
                               transform hover:scale-105 hover:-translate-y-1
                               transition-all duration-300 ease-out
                               dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                    >
                      <span className="relative z-10">回首頁</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    </a>
                  ) : (
                    <a
                      href="/blog"
                      className="group relative inline-flex items-center justify-center gap-2 w-48 h-12 md:w-56 md:h-14 px-0 py-0
                               bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                               text-white font-semibold rounded-full shadow-lg hover:shadow-xl
                               transform hover:scale-105 hover:-translate-y-1
                               transition-all duration-300 ease-out
                               dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                    >
                      <span className="relative z-10">部落格</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    </a>
                  )}
                  {/* 聯繫按鈕：部落格分頁不顯示 */}
                  {!isBlogPage && (
                    <a
                      href="#contact"
                      className="group relative inline-flex items-center justify-center gap-2 w-48 h-12 md:w-56 md:h-14 px-0 py-0
                               bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                               text-white font-semibold rounded-full shadow-lg hover:shadow-xl
                               transform hover:scale-105 hover:-translate-y-1
                               transition-all duration-300 ease-out
                               dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
                    >
                      <span className="relative z-10">現在聯繫</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    </a>
                  )}
                </div>
              </div>

              {/* 右半邊：大頭貼（首頁與家教頁皆一致） */}
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="relative group">
                  {/* 背景裝飾圓環 */}
                  <div className="absolute inset-0 w-44 h-44 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                  {/* 主要頭像容器 */}
                  <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-200 group-hover:shadow-3xl group-hover:scale-105 transition-all duration-500">
                    <Image
                      src="/hero.jpg"
                      alt="吳榮傑的個人照片"
                      width={288}
                      height={288}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      priority
                    />
                    {/* 頭像光效覆蓋層 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  {/* 裝飾性光點 */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 卡片底部裝飾線條 */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        </div>
      </div>

      {/* 滾動提示箭頭 */}
      <a
        href={isBlogPage ? "#db-blog" : tutorMode ? "#tutor-info" : "#about"}
        className="absolute bottom-4 md:bottom-6 center -translate-x-1/2
                   w-fit flex justify-center items-center
                   text-white/80 hover:text-white dark:text-gray-200 dark:hover:text-white
                   animate-bounce transition-all duration-300
                   p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
        aria-label={isBlogPage ? "向下滾動到個人部落格" : tutorMode ? "向下滾動到家教服務資訊" : "向下滾動到關於我的部分"}
      >
        <FiChevronDown className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </a>
    </section>
  );
}