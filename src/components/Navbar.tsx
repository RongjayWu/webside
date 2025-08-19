"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 暗色模式
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // 滾動顯示/隱藏
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滾動且超過 100px 隱藏
        setShowNavbar(false);
      } else {
        // 向上滾動或在頂部顯示
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 按鈕樣式
  const buttonClass =
    "p-2 rounded transition " +
    (darkMode
      ? "bg-gray-900 text-white hover:bg-gray-200"
      : "bg-white text-gray-900 hover:bg-gray-300");

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-white dark:bg-gray-900 shadow`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* LOGO */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          RJ.Wu
        </div>

        {/* 導覽連結：桌面版 */}
        <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
          <a
            href="#hero"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            首頁
          </a>
          <a
            href="#about"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            關於我
          </a>
          <a
            href="#skills"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            技能專區
          </a>
          <a
            href="#portfolio"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            作品集
          </a>
          <a
            href="#blog"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            個人部落格
          </a>
          <a
            href="#contact"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            現在聯繫
          </a>
        </div>

        {/* 按鈕區 */}
        <div className="flex items-center space-x-4">
          {/* 暗色模式切換 */}
          <button onClick={() => setDarkMode(!darkMode)} className={buttonClass}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* 漢堡選單：小螢幕 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={buttonClass + " md:hidden"}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* 手機選單 */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-4 py-2 space-y-2">
          <a
            href="#hero"
            className="block hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Home
          </a>
          <a
            href="#about"
            className="block hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            About
          </a>
          <a
            href="#skills"
            className="block hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Skills
          </a>
          <a
            href="#portfolio"
            className="block hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="block hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
