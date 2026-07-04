//-----1.0
import { useEffect, useMemo, useRef, useState } from 'react';
import AbyssWatcherEyes from './AbyssWatcherEyes';
import AbyssWatcherBody from './AbyssWatcherBody';
interface DeepSeaBackgroundMotionProps {
  active: boolean;
  reducedMotion?: boolean;
}

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  drift: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function DeepSeaBackgroundMotion({ active, reducedMotion = false }: DeepSeaBackgroundMotionProps) {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [target, setTarget] = useState({ x: 0.5, y: 0.35 });
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: reducedMotion ? 24 : 72 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.4,
      drift: Math.random() * 40 - 20,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.18 + Math.random() * 0.28,
    }));
  }, [reducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollDepth(Math.min(scrollTop / documentHeight, 1));
    };

    const handleMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setTarget({ x: Math.min(Math.max(x, 0), 1), y: Math.min(Math.max(y, 0), 1) });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% ${18 + scrollDepth * 12}%, rgba(23, 77, 104, 0.95), rgba(5, 15, 26, 0.96) 42%, rgba(0, 0, 0, 1) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,240,255,0.1),transparent_45%),radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(56,189,248,0.06),transparent_24%)] opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_12%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.25)_100%)] mix-blend-screen opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.12),transparent_30%)] opacity-35 blur-3xl" />

      <div className="absolute inset-0 pointer-events-none">
        {!reducedMotion && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-100/50 animate-[float-random_12s_ease-in-out_infinite]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `translateX(${particle.drift}px)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_48%,rgba(12,28,42,0.1),rgba(0,0,0,0.56)_80%)]" />

      <div className="absolute inset-0 pointer-events-none opacity-90">
        <div
          className="absolute left-1/2 top-[28%] h-[42vh] w-[68vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(140,255,255,0.14),rgba(4,14,24,0.06)_52%,transparent_74%)] blur-3xl transition-transform duration-700"
          style={{ transform: `translate(-50%, ${Math.min(scrollDepth * 20, 10)}px)` }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 h-[46%] pointer-events-none">
        <div className="absolute left-1/2 top-0 h-full w-[24vw] max-w-[240px] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),rgba(180,255,255,0.16),rgba(120,240,255,0.06),transparent)] opacity-80 blur-2xl" />
        <div className="absolute left-1/2 top-[2%] h-[58%] w-[12vw] max-w-[130px] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_35%,rgba(135,255,255,0.14)_60%,transparent_100%)] blur-xl" />
        <div className="absolute left-1/2 top-[13.5%] h-[2px] w-[10vw] max-w-[110px] -translate-x-1/2 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.8),transparent)] opacity-55 blur-[0.5px]" />
      </div>
      <AbyssWatcherEyes target={target} active={active} reducedMotion={reducedMotion} />
        
    </div>
  );
}
//-----2.0
// import { useEffect, useMemo, useRef, useState } from 'react';
// import AbyssWatcher from './AbyssWatcherEyes'; // 合併眼球與肉體，透過 Canvas 完美還原

// interface DeepSeaBackgroundMotionProps {
//   active: boolean;
//   reducedMotion?: boolean;
// }

// type Particle = {
//   id: number;
//   left: number;
//   top: number;
//   size: number;
//   drift: number;
//   duration: number;
//   delay: number;
//   opacity: number;
// };

// export default function DeepSeaBackgroundMotion({ active, reducedMotion = false }: DeepSeaBackgroundMotionProps) {
//   const [scrollDepth, setScrollDepth] = useState(0);
//   const [target, setTarget] = useState({ x: 0.5, y: 0.35 });
//   const containerRef = useRef<HTMLDivElement>(null);

//   const particles = useMemo<Particle[]>(() => {
//     return Array.from({ length: reducedMotion ? 24 : 72 }).map((_, index) => ({
//       id: index,
//       left: Math.random() * 100,
//       top: Math.random() * 100,
//       size: 1 + Math.random() * 2.4,
//       drift: Math.random() * 40 - 20,
//       duration: 10 + Math.random() * 8,
//       delay: Math.random() * 10,
//       opacity: 0.18 + Math.random() * 0.28,
//     }));
//   }, [reducedMotion]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const documentHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
//       setScrollDepth(Math.min(scrollTop / documentHeight, 1));
//     };

//     const handleMove = (event: MouseEvent) => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       // 計算滑鼠相對中心點的偏移量，範圍約在 -1 到 1 之間，方便後續擴大眼球移動幅度
//       const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
//       setTarget({ x, y });
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     window.addEventListener('mousemove', handleMove, { passive: true });
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMove);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
//       {/* 頂部海底光束背景 */}
//       <div
//         className="absolute inset-0 transition-all duration-700"
//         style={{
//           background: `radial-gradient(circle at 50% ${18 + scrollDepth * 12}%, rgba(23, 77, 104, 0.95), rgba(5, 15, 26, 0.96) 42%, rgba(0, 0, 0, 1) 100%)`,
//         }}
//       />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,240,255,0.1),transparent_45%),radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(56,189,248,0.06),transparent_24%)] opacity-90" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_12%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.25)_100%)] mix-blend-screen opacity-50" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.12),transparent_30%)] opacity-35 blur-3xl" />

//       {/* 懸浮粒子 */}
//       <div className="absolute inset-0 pointer-events-none">
//         {!reducedMotion && particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute rounded-full bg-cyan-100/50"
//             style={{
//               left: `${particle.left}%`,
//               top: `${particle.top}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               opacity: particle.opacity,
//               transform: `translateX(${particle.drift}px)`,
//             }}
//           />
//         ))}
//       </div>

//       {/* 頂部強光束 */}
//       <div className="absolute inset-x-0 top-0 h-[46%] pointer-events-none">
//         <div className="absolute left-1/2 top-0 h-full w-[24vw] max-w-[240px] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),rgba(180,255,255,0.16),rgba(120,240,255,0.06),transparent)] opacity-80 blur-2xl" />
//         <div className="absolute left-1/2 top-[2%] h-[58%] w-[12vw] max-w-[130px] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_35%,rgba(135,255,255,0.14)_60%,transparent_100%)] blur-xl" />
//       </div>

//       {/* 核心古神怪物組件 (位置下移，嵌在肉裡，大範圍眼球移動) */}
//       <AbyssWatcher target={target} active={active} />
//     </div>
//   );
// }
//-----3.0
// import { useEffect, useMemo, useRef, useState } from 'react';
// import AbyssWatcher from './AbyssWatcherEyes'; // 合併眼球與肉體，透過 Canvas 完美還原

// interface DeepSeaBackgroundMotionProps {
//   active: boolean;
//   reducedMotion?: boolean;
// }

// type Particle = {
//   id: number;
//   left: number;
//   top: number;
//   size: number;
//   drift: number;
//   duration: number;
//   delay: number;
//   opacity: number;
// };

// export default function DeepSeaBackgroundMotion({ active, reducedMotion = false }: DeepSeaBackgroundMotionProps) {
//   const [scrollDepth, setScrollDepth] = useState(0);
//   const [target, setTarget] = useState({ x: 0.5, y: 0.35 });
//   const containerRef = useRef<HTMLDivElement>(null);

//   const particles = useMemo<Particle[]>(() => {
//     return Array.from({ length: reducedMotion ? 24 : 72 }).map((_, index) => ({
//       id: index,
//       left: Math.random() * 100,
//       top: Math.random() * 100,
//       size: 1 + Math.random() * 2.4,
//       drift: Math.random() * 40 - 20,
//       duration: 10 + Math.random() * 8,
//       delay: Math.random() * 10,
//       opacity: 0.18 + Math.random() * 0.28,
//     }));
//   }, [reducedMotion]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const documentHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
//       setScrollDepth(Math.min(scrollTop / documentHeight, 1));
//     };

//     const handleMove = (event: MouseEvent) => {
//       if (!containerRef.current) return;

//       const rect = containerRef.current.getBoundingClientRect();
//       // 計算滑鼠相對中心點的偏移量，範圍約在 -1 到 1 之間，方便後續擴大眼球移動幅度
//       const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
//       setTarget({ x, y });
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     window.addEventListener('mousemove', handleMove, { passive: true });
//     handleScroll();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMove);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
//       {/* 頂部海底光束背景 */}
//       <div
//         className="absolute inset-0 transition-all duration-700"
//         style={{
//           background: `radial-gradient(circle at 50% ${18 + scrollDepth * 12}%, rgba(23, 77, 104, 0.95), rgba(5, 15, 26, 0.96) 42%, rgba(0, 0, 0, 1) 100%)`,
//         }}
//       />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,240,255,0.1),transparent_45%),radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(56,189,248,0.06),transparent_24%)] opacity-90" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_12%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.25)_100%)] mix-blend-screen opacity-50" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.12),transparent_30%)] opacity-35 blur-3xl" />

//       {/* 懸浮粒子 */}
//       <div className="absolute inset-0 pointer-events-none">
//         {!reducedMotion && particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute rounded-full bg-cyan-100/50"
//             style={{
//               left: `${particle.left}%`,
//               top: `${particle.top}%`,
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               opacity: particle.opacity,
//               transform: `translateX(${particle.drift}px)`,
//             }}
//           />
//         ))}
//       </div>

//       {/* 頂部強光束 */}
//       <div className="absolute inset-x-0 top-0 h-[46%] pointer-events-none">
//         <div className="absolute left-1/2 top-0 h-full w-[24vw] max-w-[240px] -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),rgba(180,255,255,0.16),rgba(120,240,255,0.06),transparent)] opacity-80 blur-2xl" />
//         <div className="absolute left-1/2 top-[2%] h-[58%] w-[12vw] max-w-[130px] -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),rgba(255,255,255,0.28)_35%,rgba(135,255,255,0.14)_60%,transparent_100%)] blur-xl" />
//       </div>

//       {/* 核心古神怪物組件 (位置下移，嵌在肉裡，大範圍眼球移動) */}
//       <AbyssWatcher target={target} active={active} />
//     </div>
//   );
// }