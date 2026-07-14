// src/components/PublicUI/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { 
  FiSun, FiMoon, FiMenu, FiX, FiHome, FiUser, FiBriefcase, 
  FiUsers, FiAward, FiGrid, FiBookOpen, FiMail, FiChevronDown, FiBook 
} from "react-icons/fi";
import { FiEdit2, FiList, FiTag } from "react-icons/fi";

type NavbarProps = {
  onAdminLoginClick?: () => void;
  hideMobileMenu?: boolean;
  adminMode?: boolean;
};

export default function Navbar({ onAdminLoginClick, hideMobileMenu = false, adminMode = false }: NavbarProps) {
  const router = useRouter();
  const [isAdminNewPost, setIsAdminNewPost] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTutorPage, setIsTutorPage] = useState(false);
  const [isBlogPage, setIsBlogPage] = useState(false);

  // 錨點跳轉/滾動邏輯 (完美隱藏網址後綴版本)
  const handleNavClick = (elementId: string) => async (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false); // 點擊後自動收起手機版選單

    if (typeof window !== 'undefined') {
      if (router.pathname !== '/') {
        await router.push('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        if (elementId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // 聯繫我按鈕專用邏輯 (隱藏後綴)
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (typeof window !== 'undefined') {
      if (router.pathname !== '/') {
        router.push('/').then(() => {
          setTimeout(() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        });
      } else {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 後台專用錨點滾動處理 (完美隱藏網址後綴版本)
  const handleAdminScroll = (targetId: string) => async (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);

    if (typeof window !== 'undefined') {
      if (router.pathname !== '/admin/posts') {
        await router.push('/admin/posts');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 深色模式初始化與切換
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
    } else {
      setDarkMode(true);
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTutorPage(router.pathname === '/tutor');
      setIsBlogPage(router.pathname === '/blog');
      setIsAdminNewPost(router.pathname === '/admin/new-post');
    }
  }, [router.pathname]);

  // 漢堡選單按鈕樣式
  const burgerButtonClass =
    "p-2 rounded-full shadow backdrop-blur-md transition border border-white/30 dark:border-gray-700/30";
  const burgerButtonStyle = {
    background: darkMode
      ? 'linear-gradient(90deg, rgba(30,41,59,0.7) 0%, rgba(59,130,246,0.5) 100%)'
      : 'linear-gradient(90deg, rgba(165,219,255,0.7) 0%, rgba(147,197,253,0.5) 100%)',
    color: darkMode ? '#fff' : '#222',
  };

  return (
    <nav
      className="fixed w-full z-50 shadow backdrop-blur-md bg-gradient-to-r
        from-blue-100/70 via-purple-100/60 to-indigo-100/70
        dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900/80
        border-b border-white/20 dark:border-gray-800/50"
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* LOGO */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">
          RJ.Wu
          {adminMode && (
            <span className="text-xs ml-2 font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/20 px-2 py-0.5 rounded-md align-middle">
              後台管理
            </span>
          )}
        </div>

        {/* 桌面版選單 */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200">
          {adminMode ? (
            <>
              <a href="/admin" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-semibold">
                <FiUser className="inline" />管理員首頁
              </a>
              {/* 🚀 桌面版：擴增與修正感應範圍的部落格編輯下拉選單 */}
              <div className="relative group py-2">
                <button className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold group-hover:bg-white/60 dark:group-hover:bg-gray-800/60">
                  <FiBook className="inline" />部落格文章編輯 <FiChevronDown className="inline ml-1" />
                </button>
                <div className="absolute left-0 top-full w-full min-w-[180px] pt-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-10">
                  <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-md rounded-xl shadow-xl p-1 text-left border border-white/20 dark:border-gray-800/80">
                    <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800/70 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200 transition" onClick={handleAdminScroll('new-post')}>
                      <FiEdit2 className="inline text-blue-500" />新增文章
                    </a>
                    <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800/70 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200 transition" onClick={handleAdminScroll('list')}>
                      <FiList className="inline text-purple-500" />文章列表
                    </a>
                    <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800/70 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200 transition" onClick={handleAdminScroll('category')}>
                      <FiTag className="inline text-indigo-500" />分類管理
                    </a>
                    {/* 🚀 桌面下拉增設：標籤綜合管理 */}
                    <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800/70 rounded-lg flex items-center gap-2 text-gray-800 dark:text-gray-200 transition" onClick={handleAdminScroll('tag-manager')}>
                      <FiTag className="inline text-emerald-500" />標籤管理
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            !hideMobileMenu && !isAdminNewPost && (
              <>
                <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={handleNavClick('hero')}><FiHome className="inline" />首頁</a>
                <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={handleNavClick('about')}><FiUser className="inline" />關於我</a>
                <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={handleNavClick('skills')}><FiAward className="inline" />技能專區</a>
                
                {/* 經歷分群下拉選單 */}
                <div className="relative group py-2">
                  <button className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 px-2 py-1 rounded font-medium group-hover:bg-blue-100/30 dark:group-hover:bg-gray-800/40">
                    <FiBook className="inline" />相關經歷 <FiChevronDown className="inline ml-1" />
                  </button>
                  <div className="absolute left-0 top-full w-full min-w-[160px] pt-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-10">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg p-1 text-left border border-white/20 dark:border-gray-800/50">
                      <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200" onClick={handleNavClick('experience')}><FiBriefcase />工作經歷</a>
                      <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200" onClick={handleNavClick('study')}><FiBook />求學經歷</a>
                      <a href="/" className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200" onClick={handleNavClick('club')}><FiUsers />社團經歷</a>
                    </div>
                  </div>
                </div>
                
                <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={handleNavClick('portfolio')}><FiGrid className="inline" />作品集</a>
                <a href="/tutor" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={() => setMobileOpen(false)}><FiBookOpen className="inline" />家教資訊</a>
                <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-1 font-medium" onClick={handleContactClick}><FiMail className="inline" />聯繫我</a>
              </>
            )
          )}
        </div>

        {/* 漢堡按鈕 */}
        <div className="flex items-center space-x-4">
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

      {/* 手機版選單 */}
      {!isAdminNewPost && !hideMobileMenu && mobileOpen && (
        <div
          className="md:hidden text-gray-700 dark:text-gray-200 px-4 py-4 space-y-3 flex flex-col items-stretch bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl rounded-b-2xl shadow-xl border-t border-white/10 dark:border-gray-800/50"
        >
          {adminMode ? (
            <>
              <a href="/admin" className="hover:bg-blue-50 dark:hover:bg-gray-800/60 p-2.5 rounded-xl transition flex items-center gap-2 font-semibold" onClick={() => setMobileOpen(false)}>
                <FiUser className="text-blue-500" />管理員首頁
              </a>
              <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 px-2.5 uppercase tracking-wider">部落格快速操作</p>
              <a href="/" className="hover:bg-blue-50 dark:hover:bg-gray-800/60 p-2.5 rounded-xl transition flex items-center gap-2 text-sm pl-4" onClick={handleAdminScroll('new-post')}>
                <FiEdit2 className="text-blue-500" />新增文章
              </a>
              <a href="/" className="hover:bg-blue-50 dark:hover:bg-gray-800/60 p-2.5 rounded-xl transition flex items-center gap-2 text-sm pl-4" onClick={handleAdminScroll('list')}>
                <FiList className="text-purple-500" />文章列表
              </a>
              <a href="/" className="hover:bg-blue-50 dark:hover:bg-gray-800/60 p-2.5 rounded-xl transition flex items-center gap-2 text-sm pl-4" onClick={handleAdminScroll('category')}>
                <FiTag className="text-indigo-500" />分類管理
              </a>
              {/* 🚀 手機版增設：標籤綜合管理 */}
              <a href="/" className="hover:bg-blue-50 dark:hover:bg-gray-800/60 p-2.5 rounded-xl transition flex items-center gap-2 text-sm pl-4" onClick={handleAdminScroll('tag-manager')}>
                <FiTag className="text-emerald-500" />標籤管理
              </a>
            </>
          ) : (
            <>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('hero')}><FiHome />首頁</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('about')}><FiUser />關於我</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('skills')}><FiAward />技能專區</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('experience')}><FiBriefcase />工作經歷</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('club')}><FiUsers />社團經歷</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('study')}><FiBook />求學經歷</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleNavClick('portfolio')}><FiGrid />作品集</a>
              <a href="/tutor" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={() => setMobileOpen(false)}><FiBookOpen />家教資訊</a>
              <a href="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition flex items-center gap-2 p-2 rounded-lg" onClick={handleContactClick}><FiMail />聯繫我</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}