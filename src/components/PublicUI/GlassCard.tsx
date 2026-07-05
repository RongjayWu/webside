import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string; // 允許外部額外覆蓋或微調排版樣式（例如 padding 或 height）
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div 
      className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                  rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/30 
                  overflow-hidden flex flex-col justify-between 
                  transform hover:-translate-y-1 hover:scale-[1.02] 
                  transition-all duration-300 ease-out ${className}`}
    >
      {/* 真正放入卡片內的內容 */}
      {children}

      {/* 統一封裝的底部裝飾漸層線，滑鼠懸停時會滑出 */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 group-hover:w-full transition-all duration-500 ease-out" />
    </div>
  );
}