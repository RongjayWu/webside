"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

import { useRouter } from 'next/router';

type NavbarProps = {
  onAdminLoginClick?: () => void;
};

export default function Navbar({ onAdminLoginClick }: NavbarProps) {
  const router = require('next/router').useRouter();
  const [isAdminNewPost, setIsAdminNewPost] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 深色模式初始化與切換
  useEffect(() => {
    // 初始化：讀取 localStorage
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
    } else {
      setDarkMode(true); // 預設深色模式
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('darkMode', 'false');
    }
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

  // SSR 階段一律為 false，CSR 再判斷路徑
  const [isTutorPage, setIsTutorPage] = useState(false);
  const [isBlogPage, setIsBlogPage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTutorPage(window.location.pathname === '/tutor');
      setIsBlogPage(window.location.pathname === '/blog');
      setIsAdminNewPost(window.location.pathname === '/admin/new-post');
    }
  }, []);

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
          {/* /admin/new-post 不顯示任何導覽連結 */}
          {isAdminNewPost ? null : isBlogPage ? (
            <>
              <a href="#hero" className="hover:text-blue-500 dark:hover:text-blue-400 transition">首頁</a>
              <a href="#db-blog" className="hover:text-blue-500 dark:hover:text-blue-400 transition">個人部落格</a>
              {/* 分類檢索下拉選單 */}
              <div className="relative group">
                <button className="hover:text-blue-500 dark:hover:text-blue-400 transition ">分類檢索</button>
                <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity z-10">
                  <ul className="py-2">
                    {/* TODO: 這裡可串接分類資料，暫時靜態範例 */}
                    <li><a href="#category-1" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類一</a></li>
                    <li><a href="#category-2" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類二</a></li>
                    <li><a href="#category-3" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類三</a></li>
                  </ul>
                </div>
              </div>
            </>
          ) : isTutorPage ? (
            <>
              <a href="#hero" className="hover:text-blue-500 dark:hover:text-blue-400 transition">首頁</a>
              <a href="#tutor-info" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">家教服務資訊</a>
              <a href="#Textbook" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">教材預覽專區</a>
              <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition">取得聯繫</a>
            </>
          ) : (
            <>
              <a href="#hero" className="hover:text-blue-500 dark:hover:text-blue-400 transition">首頁</a>
              <a href="#about" className="hover:text-blue-500 dark:hover:text-blue-400 transition">關於我</a>
              <a href="#skills" className="hover:text-blue-500 dark:hover:text-blue-400 transition">技能專區</a>
              <a href="#portfolio" className="hover:text-blue-500 dark:hover:text-blue-400 transition">作品集</a>
              <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition">取得聯繫</a>
            </>
          )}
        </div>

        {/* 按鈕區 */}
  <div className="flex items-center space-x-4">
          {/* 暗色模式切換 */}
          <button onClick={() => setDarkMode(!darkMode)} className={buttonClass}>
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* /admin/new-post 右側顯示登出按鈕，其他頁維持原本按鈕 */}
          {isAdminNewPost ? (
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-all"
              onClick={() => router.push('/blog')}
            >
              登出
            </button>
          ) : isBlogPage && (
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-all"
              onClick={onAdminLoginClick}
            >
              管理員登入
            </button>
          )}

          {/* /admin/new-post 不顯示漢堡選單 */}
          {!isAdminNewPost && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={buttonClass + " md:hidden"}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* 手機選單：/admin/new-post 不顯示 */}
      {!isAdminNewPost && mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 px-4 py-2 space-y-2 flex flex-col items-center">
          {isBlogPage ? (
            <>
              <a href="#hero" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">首頁</a>
              <a href="#db-blog" className="hover:text-blue-500 dark:hover:text-blue-400 transition">個人部落格</a>
              {/* 分類檢索下拉選單（手機版） */}
              <div className="relative w-full it">
                <button className="hover:text-blue-500 dark:hover:text-blue-400 transition ">分類檢索</button>
                <div className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-900 rounded shadow-lg z-10">
                  <ul className="py-2">
                    {/* TODO: 這裡可串接分類資料，暫時靜態範例 */}
                    <li><a href="#category-1" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類一</a></li>
                    <li><a href="#category-2" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類二</a></li>
                    <li><a href="#category-3" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800">分類三</a></li>
                  </ul>
                </div>
              </div>
            </>
          ) : isTutorPage ? (
            <>
              <a href="#hero" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">簡介</a>
              <a href="#tutor-info" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">家教服務資訊</a>
              <a href="#Textbook" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">教材預覽專區</a>
              <a href="#contact" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">取得聯繫</a>
            </>
          ) : (
            <>
              <a href="#hero" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">簡介</a>
              <a href="#about" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">關於我</a>
              <a href="#skills" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">技能專區</a>
              <a href="#portfolio" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">作品集</a>
              <a href="#contact" className="block hover:text-blue-500 dark:hover:text-blue-400 transition">取得聯繫</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
