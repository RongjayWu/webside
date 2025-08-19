import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          現在聯繫我
        </h2>
        
        <div
          ref={contactRef}
          className={`
            bg-white dark:bg-gray-800 rounded-lg shadow-md p-8
            transition-all duration-700 transform-gpu
            hover:shadow-xl hover:scale-102 hover:-translate-y-2 
            hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
            dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
            dark:text-gray-100 dark:shadow-gray-700/20
            ${isVisible 
              ? "translate-y-0 opacity-100" 
              : "translate-y-10 opacity-0"
            }
          `}
        >
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                讓我們開始合作吧！
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                有任何專案想法或合作機會嗎？歡迎隨時聯繫我，我很樂意與您討論。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Email 按鈕 */}
              <a
                href="mailto:example@email.com"
                className="
                  inline-flex items-center px-6 py-3 
                  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                  text-white rounded-lg shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  transform-gpu
                "
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>

              {/* 可選：添加其他聯繫方式 */}
              <a
                href="tel:+1234567890"
                className="
                  inline-flex items-center px-6 py-3 
                  bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
                  text-white rounded-lg shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  transform-gpu
                "
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Me
              </a>
            </div>

            {/* 聯繫資訊 */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  example@email.com
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (234) 567-890
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}