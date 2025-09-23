import { useRef, useState, useEffect } from 'react';
import { FaFacebookF, FaLine, FaInstagram, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import socialLinks from '../data/social-links.json';

interface ContactProps {
  tutorMode?: boolean;
}

export default function Contact({ tutorMode = false }: ContactProps) {
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

  // 依 tutorMode 顯示不同內容
  const title = tutorMode ? "聯繫我" : "聯繫我";
  const subtitle = tutorMode ? "歡迎預約家教課程或洽詢學習規劃！" : "讓我們開始合作吧！";
  const description = tutorMode
    ? "有家教需求或課程問題，歡迎隨時聯繫我，將依您的需求提供最合適的協助。"
    : "有任何專案想法或合作機會嗎？歡迎隨時聯繫我，我很樂意與您討論。";

  return (
    <section
      id="contact"
      className="py-24 text-gray-900 dark:text-gray-100 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div
          ref={contactRef}
          className={`
            bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-md p-8
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
          <h2 className="text-4xl font-bold mb-12 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </h2>
          <div className="space-y-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                {subtitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Email 按鈕 */}
              <a
                href={socialLinks.email}
                className="
                  inline-flex items-center px-6 py-3 
                  bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                  text-white rounded-lg shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  transform-gpu
                "
              >
                <FaEnvelope className="mr-2 w-5 h-5" />
                Email
              </a>

              {/* 電話按鈕 */}
              <a
                href={socialLinks.phone}
                className="
                  inline-flex items-center px-6 py-3 
                  bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
                  text-white rounded-lg shadow-md
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  transform-gpu
                "
              >
                <FaPhone className="mr-2 w-5 h-5" />
                Call
              </a>
            </div>

            {/* 社群媒體圖示按鈕 */}
            <div className="mt-8 flex justify-center items-center gap-4 sm:gap-6">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 sm:mb-0">
                或透過社群媒體聯繫：
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-3 sm:gap-4">
              {/* Facebook */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
              </a>

              {/* LINE */}
              <a
                href={socialLinks.line}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                aria-label="LINE"
              >
                <FaLine className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
              </a>

              {/* GitHub */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-600/30 hover:border-purple-600/50 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:scale-110 transition-all duration-300 ease-out"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </a>
            </div>

            {/* 聯繫資訊 */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              {/* 主要聯絡資訊 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center justify-center sm:justify-start">
                  <FaEnvelope className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email: websidejay3977@gmail.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <FaPhone className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Phone: +886 908 314 887</span>
                </div>
              </div>
              
              {/* 社群媒體連結資訊 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center sm:justify-start">
                  <FaFacebookF className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Facebook: 吳榮傑</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <FaLine className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">LINE ID: pickup20031128</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <FaInstagram className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Instagram: @rongjay_1128</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <FaGithub className="mr-2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">GitHub: RongjayWu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}