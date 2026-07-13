"use client";

import { useState, useEffect } from "react";
// 釣魚鉤子 SVG
function FishingHookIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v12a4 4 0 1 0 4 4" />
      <circle cx="12" cy="2" r="1.5" />
      <path d="M12 18c0 2 2 2 2 0" />
    </svg>
  );
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  // 監聽滾動事件，超過一定高度顯示按鈕
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg
                  bg-white text-gray-800 dark:bg-gray-800 dark:text-white
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-opacity duration-300
                  ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
  <FishingHookIcon size={24} />
    </button>
  );
}
