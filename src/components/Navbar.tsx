"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiUser, FiBriefcase, FiUsers, FiAward, FiGrid, FiBookOpen, FiMail, FiChevronDown, FiBook } from "react-icons/fi";
import { FiEdit2, FiList, FiTag } from "react-icons/fi";

import { useRouter } from 'next/router';

type NavbarProps = {
  onAdminLoginClick?: () => void;
  hideMobileMenu?: boolean;
  adminMode?: boolean;
};

export default function Navbar({ onAdminLoginClick }: NavbarProps) {
        // 手機選單點擊自動收起
        const handleMobileNavClick = (handler?: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
          setMobileOpen(false);
          if (handler) handler(e);
        };
      // 聯繫我按鈕專用邏輯
      const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
          const contactEl = document.getElementById('contact');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            router.push('/#contact');
          }
        }
      };
    // 錨點跳轉/滾動邏輯
    const handleNavClick = (hash: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        if (window.location.pathname !== '/') {
          router.push('/' + hash);
        } else {
          const el = document.getElementById(hash.replace('#', ''));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
  const router = require('next/router').useRouter();
  const [isAdminNewPost, setIsAdminNewPost] = useState(false);
  // 由 props 控制是否隱藏漢堡選單，避免 hydration 錯誤
  const { hideMobileMenu, adminMode } = arguments[0] || {};
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // ...existing code... (已移除滾動顯示/隱藏功能)

  // 按鈕樣式（漢堡選單按鈕背景與暗色模式切換一致）
  const burgerButtonClass =
    "p-2 rounded-full shadow backdrop-blur-md transition border border-white/30 dark:border-gray-700/30";
  const burgerButtonStyle = {
    background: darkMode
      ? 'linear-gradient(90deg, rgba(30,41,59,0.7) 0%, rgba(59,130,246,0.5) 100%)'
      : 'linear-gradient(90deg, rgba(165,219,255,0.7) 0%, rgba(147,197,253,0.5) 100%)',
    color: darkMode ? '#fff' : '#222',
  };

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
      className="fixed w-full z-50 shadow backdrop-blur-md bg-gradient-to-r
        from-blue-100/70 via-purple-100/60 to-indigo-100/70
        dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80"
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* LOGO */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          RJ.Wu
        </div>

        {/* 管理員模式只顯示 LOGO 與管理員功能選單 */}
        {adminMode ? (
          <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
            <a href="/admin" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-semibold"><FiUser className="inline" />管理員首頁</a>
            {/* 部落格文章編輯下拉選單 */}
            <div className="relative group">
              <button className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 px-2 py-1 rounded font-semibold group-hover:bg-blue-100/30 dark:group-hover:bg-gray-800/40">
                <FiBook className="inline" />部落格文章編輯 <FiChevronDown className="inline ml-1" />
              </button>
              <div className="absolute left-0 mt-2 min-w-[180px] bg-white dark:bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 text-left">
                <a href="#new-post" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/admin/blog') {
                    window.location.href = '/admin/blog#new-post';
                  } else {
                    const el = document.getElementById('new-post');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}>
                  <FiEdit2 className="inline" />新增文章
                </a>
                <a href="#list" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/admin/blog') {
                    window.location.href = '/admin/blog#list';
                  } else {
                    const el = document.getElementById('list');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}>
                  <FiList className="inline" />文章列表
                </a>
                <a href="#category" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/admin/blog') {
                    window.location.href = '/admin/blog#category';
                  } else {
                    const el = document.getElementById('category');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}>
                  <FiTag className="inline" />分類管理
                </a>
              </div>
            </div>
          </div>
        ) : hideMobileMenu ? null : (
          <div className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
            {isAdminNewPost ? null : (
              <>
                <a href="/#hero" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#hero'))}><FiHome className="inline" />首頁</a>
                <a href="/#about" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#about'))}><FiUser className="inline" />關於我</a>
                <a href="/#skills" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#skills'))}><FiAward className="inline" />技能專區</a>
                {/* 經歷分群下拉選單 */}
                <div className="relative group">
                  <button className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 px-2 py-1 rounded group-hover:bg-blue-100/30 dark:group-hover:bg-gray-800/40">
                    <FiBook className="inline" />相關經歷 <FiChevronDown className="inline ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 min-w-[160px] bg-white dark:bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 text-left">
                    <a href="/#experience" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={handleMobileNavClick(handleNavClick('#experience'))}><FiBriefcase />工作經歷</a>
                    <a href="/#club" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={handleMobileNavClick(handleNavClick('#club'))}><FiUsers />社團經歷</a>
                    <a href="/#study" className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-800 flex items-center gap-2" onClick={handleMobileNavClick(handleNavClick('#study'))}><FiBook />求學經歷</a>
                  </div>
                </div>
                <a href="/#portfolio" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#portfolio'))}><FiGrid className="inline" />作品集</a>
                <a href="/tutor" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={() => setMobileOpen(false)}><FiBookOpen className="inline" />家教資訊</a>
                <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleContactClick)}><FiMail className="inline" />聯繫我</a>
              </>
            )}
          </div>
        )}

        {/* 按鈕區 */}
  <div className="flex items-center space-x-4">
          {/* 暗色模式切換 */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={
              `p-2 rounded-full shadow-lg backdrop-blur-md transition border border-white/30 dark:border-gray-700/30
              ring-2 ring-blue-400/40 dark:ring-blue-500/60
              hover:ring-4 hover:ring-blue-400/80 dark:hover:ring-blue-500/90
              animate-glow`
            }
            style={{
              background: darkMode
                ? 'linear-gradient(90deg, rgba(30,41,59,0.7) 0%, rgba(59,130,246,0.5) 100%)'
                : 'linear-gradient(90deg, rgba(165,219,255,0.7) 0%, rgba(147,197,253,0.5) 100%)',
              color: darkMode ? '#fff' : '#222',
              boxShadow: darkMode
                ? '0 0 16px 4px rgba(59,130,246,0.5), 0 0 8px 2px rgba(147,197,253,0.3)'
                : '0 0 16px 4px rgba(59,130,246,0.4), 0 0 8px 2px rgba(165,219,255,0.3)',
            }}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* /admin/new-post 或 hideMobileMenu 不顯示漢堡選單 */}
          {(!isAdminNewPost && !hideMobileMenu) && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={burgerButtonClass + " md:hidden"}
              style={burgerButtonStyle}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* 手機選單：/admin/new-post 不顯示 */}
      {!isAdminNewPost && mobileOpen && (
        <div
          className="md:hidden text-gray-700 dark:text-gray-200 px-4 py-2 space-y-2 flex flex-col items-center bg-gradient-to-r from-blue-100/40 via-purple-100/30 to-indigo-100/40 dark:from-gray-900/40 dark:via-gray-800/30 dark:to-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {isAdminNewPost ? null : (
            <>
              <a href="/#hero" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#hero'))}><FiHome className="inline" />首頁</a>
              <a href="/#about" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#about'))}><FiUser className="inline" />關於我</a>
              <a href="/#skills" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#skills'))}><FiAward className="inline" />技能專區</a>
              <a href="/#experience" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#experience'))}><FiBriefcase />工作經歷</a>
              <a href="/#club" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#club'))}><FiUsers />社團經歷</a>
              <a href="/#study" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#study'))}><FiBook />求學經歷</a>
              <a href="/#portfolio" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleNavClick('#portfolio'))}><FiGrid className="inline" />作品集</a>
              <a href="/tutor" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={() => setMobileOpen(false)}><FiBookOpen className="inline" />家教資訊</a>
              <a href="#contact" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1" onClick={handleMobileNavClick(handleContactClick)}><FiMail className="inline" />聯繫我</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
