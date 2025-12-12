import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi";
import { FaFacebookF, FaLine, FaInstagram, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import socialLinks from '../data/social-links.json';

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
      setDisplay((prev) => (i < text.length ? prev + text[i++] : prev));
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
  const [isTutorPage, setIsTutorPage] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBlogPage(window.location.pathname === '/blog');
      setIsTutorPage(window.location.pathname === '/tutor');
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex justify-center items-start pt-12 sm:pt-16 md:pt-24 lg:pt-32 px-2 sm:px-4 lg:px-8"
    >
      {/* 主要卡片容器 */}
      <div className="max-w-6xl mx-auto w-full mt-6 sm:mt-8 md:mt-12 lg:mt-16">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* 卡片內容 */}
          <div className="p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            {/* md 以上：上下分區，md 以下維持原本 flex-col */}
            <div className="flex flex-col md:gap-10 lg:gap-16 xl:gap-20">
              {/* 上半部：左右分欄 */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
                {/* 左半邊：文字 + 打字動畫 */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                      你好, 我是{" "}<br />
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        吳榮傑
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      | 喜愛學習的程式設計師
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      | 高職資電類家教老師
                    </p>
                    
                    {/* 社群媒體圖示 */}
                    <div className="mt-4 flex justify-center md:justify-start items-center gap-3 sm:gap-4">
                      {/* Facebook */}
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="Facebook"
                      >
                        <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                      </a>

                      {/* LINE */}
                      <a
                        href={socialLinks.line}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="LINE"
                      >
                        <FaLine className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </a>

                      {/* Instagram */}
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                      </a>

                      {/* GitHub */}
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="GitHub"
                      >
                        <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </a>

                      {/* Email */}
                      <a
                        href={socialLinks.email}
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="Email"
                      >
                        <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                      </a>

                      {/* Phone */}
                      <a
                        href={socialLinks.phone}
                        className="group relative p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                        aria-label="Phone"
                      >
                        <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </a>
                    </div>
                    
                    <div className="mt-6 text-indigo-700 dark:text-indigo-400 text-sm sm:text-base md:text-lg xl:text-xl font-medium min-h-[2.5em] h-10 md:h-12 flex items-center">
                      <TypingText text={quote} speed={60} />
                    </div>
                  </div>
                </div>
                {/* 右半邊：頭像 */}
                <div className="flex-1 flex justify-center md:justify-end lg:justify-end xl:justify-end">
                  <div className="relative group">
                    {/* 背景裝飾圓環 */}
                    <div className="absolute inset-0 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                    {/* 主要頭像容器 */}
                    <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-200 group-hover:shadow-3xl group-hover:scale-105 transition-all duration-500">
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
              {/* ...existing code... (此處已移除三顆按鈕區塊) */}
            </div>
          </div>
          
          {/* 卡片底部裝飾線條 */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        </div>
      </div>

      {/* 滾動提示箭頭 */}
      <a
        href={isBlogPage ? "#db-blog" : tutorMode ? "#tutor-info" : "#about"}
        className="absolute bg-center bottom-2 sm:bottom-4 md:bottom-6 -translate-x-1/2
                   w-fit flex justify-center items-center
                   text-white/80 hover:text-white dark:text-gray-200 dark:hover:text-white
                   animate-bounce transition-all duration-300
                   p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
        aria-label={isBlogPage ? "向下滾動到個人部落格" : tutorMode ? "向下滾動到家教服務資訊" : "向下滾動到關於我的部分"}
      >
        <FiChevronDown className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </a>
    </section>
  );
}