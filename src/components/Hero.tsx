import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[80vh] flex justify-center items-center px-4
                 bg-gradient-to-r from-blue-500 to-purple-600
                 dark:from-blue-800 dark:to-purple-900
                 text-white dark:text-gray-100"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* 左半邊：文字 + 按鈕 */}
        <div className="flex-1 flex flex-col items-start text-left space-y-4">
          <h1 className="text-5xl font-bold">你好, 我是 吳榮傑</h1>
          <p className="text-xl">
            喜愛學習的程式設計師 | 高職資電類家教老師
          </p>
          <a
            href="#contact"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow
                       hover:bg-gray-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600
                       transition transform hover:scale-105"
          >
            現在聯繫
          </a>
        </div>

        {/* 右半邊：大頭貼 */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-300">
            <Image
              src="/hero.jpg"
              alt="Hero Image"
              width={288}
              height={288}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* 滾動提示箭頭 */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white dark:text-gray-200 animate-bounce"
      >
        <FiChevronDown size={40} />
      </a>
    </section>
  );
}
