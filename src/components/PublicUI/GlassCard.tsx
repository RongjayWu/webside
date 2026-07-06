import { ReactNode ,ComponentPropsWithoutRef} from "react";

interface GlassCardProps extends ComponentPropsWithoutRef<"div">{
  children: ReactNode;
  className?: string; // 允許外部額外覆蓋或微調排版樣式（例如 padding 或 height）
}

export default function GlassCard({ children, className = "" ,...GlassCardprops}: GlassCardProps) {
  return (
    <div 
      {...GlassCardprops}
      className={`group relative bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm 
                  rounded-2xl p-6 shadow-xl border border-white/80 dark:border-gray-700/50 
                  overflow-hidden flex flex-col justify-between 
                  transform hover:-translate-y-1 hover:scale-[1.02] 
                  transition-all duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}