import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 為所有內部連結添加平滑滾動行為
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLAnchorElement;
        if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(target.hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', target.hash);
          }
        }
      };
      document.addEventListener('click', handleAnchorClick);

      // 處理頁面載入時的錨點滾動
      const handleInitialScroll = () => {
        if (window.location.hash) {
          setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      };
      handleInitialScroll();

      // Next.js router事件監聽，跨頁 hash 跳轉自動滾動
      const handleRouteChange = (url: string) => {
        const hash = url.split('#')[1];
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      };
      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        document.removeEventListener('click', handleAnchorClick);
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router]);

  return (
    <div className="scroll-smooth">
      <Component {...pageProps} />
    </div>
  );
}