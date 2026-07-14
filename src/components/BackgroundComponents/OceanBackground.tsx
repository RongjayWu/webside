import { useEffect, useRef, useState } from 'react';
import OceanBubbles from './OceanBubbles';
import OceanParticles from './OceanParticles';

export default function OceanBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollDepth, setScrollDepth] = useState(0); // 滾動深度 0-1

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / Math.max(documentHeight, 1), 1);
      setScrollDepth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 滑鼠移動效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // 根據滾動深度計算顏色
  const getOceanColors = () => {
    const depth = scrollDepth;
    
    // 明亮模式顏色過渡
    const lightColors = {
      top: `rgb(${165 - depth * 100}, ${219 - depth * 100}, ${255 - depth * 150})`, // cyan-200 → 深藍
      middle: `rgb(${147 - depth * 100}, ${197 - depth * 100}, ${253 - depth * 150})`, // blue-300 → 更深藍
      deep: `rgb(${59 - depth * 30}, ${130 - depth * 100}, ${246 - depth * 180})`, // blue-500 → 非常深藍
      bottom: `rgb(${30 - depth * 15}, ${58 - depth * 30}, ${138 - depth * 100})`, // blue-900 → 接近黑色
    };
    
    // 暗色模式顏色過渡
    const darkColors = {
      top: `rgb(${21 - depth * 15}, ${94 - depth * 60}, ${117 - depth * 80})`, // cyan-800 → 更暗
      middle: `rgb(${30 - depth * 20}, ${64 - depth * 40}, ${107 - depth * 70})`, // blue-800 → 更暗
      deep: `rgb(${30 - depth * 20}, ${41 - depth * 30}, ${59 - depth * 40})`, // blue-900 → 更暗
      bottom: `rgb(${15 - depth * 10}, ${23 - depth * 15}, ${42 - depth * 30})`, // slate-900 → 接近黑色
    };

    return { lightColors, darkColors };
  };

  const { lightColors, darkColors } = getOceanColors();

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden transition-all duration-700"
    >
      {/* 海洋漸層背景 - 根據滾動動態變化 */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `linear-gradient(to bottom, ${lightColors.top}, ${lightColors.middle}, ${lightColors.deep}, ${lightColors.bottom})`,
        }}
      />
      
      {/* 暗色模式背景疊加 */}
      <div 
        className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to bottom, ${darkColors.top}, ${darkColors.middle}, ${darkColors.deep}, ${darkColors.bottom})`,
        }}
      />

      {/* 海面光線效果 - 隨滾動減弱 */}
      <div className="absolute top-0 left-0 w-full h-1/3">
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at ${mousePosition.x}% 0%, rgba(255,255,255,${0.4 * (1 - scrollDepth * 0.8)}) 0%, rgba(255,255,255,${0.1 * (1 - scrollDepth * 0.8)}) 50%, transparent 70%)`,
          }}
        />
      </div>

      {/* 海底陰影效果 - 隨滾動加強 */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1/2 transition-opacity duration-700"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,${0.3 + scrollDepth * 0.4}) 0%, rgba(30,41,59,${0.2 + scrollDepth * 0.3}) 50%, transparent 100%)`,
        }}
      />

      {/* 深海壓力效果 - 只在深海顯示 */}
      {scrollDepth > 0.5 && (
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, rgba(0,0,0,${(scrollDepth - 0.5) * 0.3}) 100%)`,
            opacity: scrollDepth > 0.5 ? 1 : 0,
          }}
        />
      )}

      {/* <OceanBubbles scrollDepth={scrollDepth} mousePosition={mousePosition} /> */}

      {/* 海流波浪效果 - 深海變慢變暗 - 已刪除 */}

      {/* <OceanParticles scrollDepth={scrollDepth} /> */}

      {/* 深海生物光效 - 只在最深處顯示 */}
      {scrollDepth > 0.8 && (
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`bio-light-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${20 + i * 30}%`,
                top: `${70 + Math.sin(Date.now() * 0.001 + i) * 10}%`,
                width: '4px',
                height: '4px',
                background: 'rgba(0,255,255,0.8)',
                boxShadow: '0 0 20px rgba(0,255,255,0.5)',
                animationDuration: `${2 + i * 0.5}s`,
                opacity: (scrollDepth - 0.8) * 5, // 漸進出現
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}