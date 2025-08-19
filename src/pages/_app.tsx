import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 確保平滑滾動在所有瀏覽器中都能正常工作
    if (typeof window !== 'undefined') {
      // 為所有內部連結添加平滑滾動行為
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLAnchorElement;
        
        // 檢查是否為內部錨點連結
        if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
          e.preventDefault();
          
          const targetElement = document.querySelector(target.hash);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // 更新 URL (可選)
            history.pushState(null, '', target.hash);
          }
        }
      };

      // 添加事件監聽器
      document.addEventListener('click', handleAnchorClick);

      // 處理頁面載入時的錨點滾動
      const handleInitialScroll = () => {
        if (window.location.hash) {
          setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 100);
        }
      };

      handleInitialScroll();

      // 清理事件監聽器
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }
  }, []);

  return (
    <div className="scroll-smooth">
      <Component {...pageProps} />
    </div>
  );
}