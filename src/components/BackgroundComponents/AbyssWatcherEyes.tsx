//-----1.0
import { useEffect, useRef, useState } from 'react';

export interface EyeTarget {
  x: number;
  y: number;
}

interface AbyssWatcherEyesProps {
  target: EyeTarget;
  active: boolean;
  reducedMotion?: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function AbyssWatcherEyes({ target, active, reducedMotion = false }: AbyssWatcherEyesProps) {
  const [pupil, setPupil] = useState({ x: 0, y: 0, open: 1 });
  const [redPulse, setRedPulse] = useState(false);
  const driftRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const blinkStateRef = useRef<{ nextBlink: number }>({ nextBlink: 0 });
  const pulseTimerRef = useRef<number | null>(null);
  const pulseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const now = performance.now();
    blinkStateRef.current.nextBlink = now + 2200 + Math.random() * 2600;

    if (pulseTimeoutRef.current) {
      window.clearTimeout(pulseTimeoutRef.current);
    }
    if (pulseTimerRef.current) {
      window.clearTimeout(pulseTimerRef.current);
    }

    const triggerPulse = () => {
      setRedPulse(true);
      pulseTimeoutRef.current = window.setTimeout(() => {
        setRedPulse(false);
      }, reducedMotion ? 80 : 120);

      pulseTimerRef.current = window.setTimeout(triggerPulse, 7000);
    };

    triggerPulse();

    let frame = 0;
    let lastTime = now;

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const drift = driftRef.current;

      // 修改點 1: 移動幅度放大 2 倍以上 (維持你目前的放大設定)
      const desiredX = clamp((target.x - 0.5) * 28.6, -24.2, 24.2);
      const desiredY = clamp((target.y - 0.5) * 24.2, -19.8, 19.8);

      drift.vx += (desiredX - drift.x) * 0.18 * delta * 60;
      drift.vy += (desiredY - drift.y) * 0.18 * delta * 60;
      drift.vx *= 0.87;
      drift.vy *= 0.87;
      drift.x += drift.vx;
      drift.y += drift.vy;

      let open = 1;
      if (time >= blinkStateRef.current.nextBlink) {
        const blinkPhase = ((time - blinkStateRef.current.nextBlink) / 220) % 2;
        open = blinkPhase < 1 ? 1 - blinkPhase : blinkPhase - 1;
        if (blinkPhase >= 1.95) {
          blinkStateRef.current.nextBlink = time + 2600 + Math.random() * 3200;
        }
      }

      if (reducedMotion) {
        open = 0.98;
        drift.x *= 0.96;
        drift.y *= 0.96;
      }

      setPupil({
        x: drift.x,
        y: drift.y,
        open: clamp(open, 0.2, 1),
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      if (pulseTimerRef.current) {
        window.clearTimeout(pulseTimerRef.current);
      }
      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
      setRedPulse(false);
    };
  }, [active, reducedMotion, target.x, target.y]);

  return (
    <div className="absolute inset-0">
      {/* 修改點 3: 位置下移 (維持你目前的 45% 或依喜好再往下) */}
      <div className="absolute left-1/2 top-[45%] aspect-square w-[clamp(260px,45vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full">
        
        {/* 底部包覆古神的肉團陰影 */}
        <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle_at_50%_50%,#030712_20%,#08121e_50%,transparent_75%)] opacity-90 blur-xl pointer-events-none -z-10" />

        {/* 肉組織的立體邊緣疊加 */}
        <div className="absolute inset-[-4px] rounded-full border-[12px] border-[#040a12] shadow-[inset_0_0_40px_rgba(0,0,0,0.98),0_0_30px_rgba(4,10,18,0.9)] z-20 pointer-events-none" />
        <div className="absolute inset-[-1px] rounded-full border-[4px] border-[#0d1f33]/30 z-20 pointer-events-none mix-blend-color-dodge blur-[0.5px]" />

        {/* 透過 clip-path 創造被肉卡住的生物眼窩邊緣 */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ clipPath: 'polygon(5% 15%, 22% 4%, 50% 0%, 82% 6%, 96% 22%, 100% 50%, 93% 82%, 72% 96%, 46% 100%, 15% 91%, 0% 61%, 0% 32%)' }}
        >
          {/* 眼底基底背景 */}
          <div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(8,12,14,0.99),rgba(2,4,6,0.995)_62%,rgba(0,0,0,0.995)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.015),0_0_34px_rgba(0,0,0,0.92)]"
            style={{
              transform: `scale(${redPulse ? 1.03 : 1})`,
              boxShadow: redPulse
                ? '0 0 56px rgba(255, 56, 56, 0.42), 0 0 120px rgba(255, 30, 30, 0.26), 0 0 18px rgba(0,0,0,0.94)'
                : '0 0 0 1px rgba(255,255,255,0.02), 0 0 30px rgba(0,0,0,0.92)',
            }}
          />

          {/* ==========================================
              新修改：讓眼球後方的漸層圖層跟著移動，並具備視差效果
             ========================================== */}
          {/* 最底層微弱環境發光：設定移動幅度最少，約 0.5 倍 */}
          <div 
            className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.08),transparent_26%,rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.18)_100%)] opacity-80" 
            style={{ transform: `translate(${pupil.x * 0.5}px, ${pupil.y * 0.5}px)` }}
          />
          
          {/* 中間層藍白強螢光漸層：設定移動幅度約 0.65 倍 */}
          <div 
            className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.9),rgba(244,255,255,0.25)_16%,rgba(174,233,240,0.08)_33%,rgba(0,0,0,0.7)_72%,rgba(0,0,0,0.95)_100%)] opacity-95" 
            style={{ transform: `translate(${pupil.x * 0.65}px, ${pupil.y * 0.65}px)` }}
          />
          
          {/* 接近眼球底部的深邃陰影與發光：設定移動幅度最大，約 0.8 倍 */}
          <div 
            className="absolute inset-[19%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(143,255,249,0.18),rgba(18,50,60,0.1)_42%,rgba(0,0,0,0.95)_100%)] shadow-[inset_0_0_18px_rgba(0,0,0,0.88)]" 
            style={{ transform: `translate(${pupil.x * 0.8}px, ${pupil.y * 0.8}px)` }}
          />

          {/* ----------------------------------------
              核心眼珠/瞳孔圖層 (維持 1.0 倍移動)
             ---------------------------------------- */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle_at_35%_34%,rgba(173,255,251,0.42),rgba(42,114,134,0.2)_43%,rgba(0,0,0,0.96)_100%)]"
            style={{
              width: '56%',
              height: '56%',
              transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px)) scale(${redPulse ? 1.03 : 1})`,
              boxShadow: redPulse
                ? '0 0 34px rgba(255, 58, 58, 0.5), inset 0 0 24px rgba(255, 58, 58, 0.34)'
                : '0 0 18px rgba(96,246,255,0.12), inset 0 0 16px rgba(96,246,255,0.08)',
            }}
          >
            <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.98),rgba(212,244,255,0.22)_16%,rgba(155,222,231,0.1)_34%,rgba(0,0,0,0.74)_72%,rgba(0,0,0,0.96)_100%)] opacity-95" />
            <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(132,255,250,0.12),rgba(0,0,0,0.94)_74%,rgba(0,0,0,0.99)_100%)] shadow-[inset_0_0_18px_rgba(0,0,0,0.92)]" />
            <div className="absolute left-[29%] top-[18%] h-[15%] w-[15%] rounded-full bg-white/85 blur-[1px] opacity-78" />
            <div className="absolute left-[44%] top-[13%] h-[9%] w-[9%] rounded-full bg-cyan-50/55 blur-[1.5px] opacity-55" />
            <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.1),transparent_46%)] opacity-55" />
            <div className="absolute inset-0 rounded-full border border-cyan-100/10" style={{
              boxShadow: redPulse ? 'inset 0 0 30px rgba(255, 55, 55, 0.18)' : 'inset 0 0 24px rgba(120,240,255,0.08)',
            }} />
            <div className="absolute left-[47%] top-[56%] h-[8%] w-[34%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)] opacity-55 blur-[0.8px]" />
            <div className="absolute inset-x-[14%] bottom-[6%] h-[6%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_72%)] opacity-42 blur-[0.8px]" />
          </div>

          {/* 眼瞼反光與陰影層 */}
          <div className="absolute inset-x-[8%] top-[2%] h-[42%] rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_40%,transparent_100%)] opacity-55" style={{ transform: `translateY(${(1 - pupil.open) * 44}%)` }} />
          <div className="absolute inset-x-[8%] bottom-[2%] h-[42%] rounded-full bg-[linear-gradient(to_top,rgba(0,0,0,0.28),rgba(0,0,0,0.08)_40%,transparent_100%)] opacity-75" style={{ transform: `translateY(${(1 - pupil.open) * -30}%)` }} />

          {/* 前景玻璃體鏡面高光 (跟瞳孔反向移動，維持 3D 立體感) */}
          <div className="absolute left-[20%] top-[20%] h-[12%] w-[12%] rounded-full bg-white/90 blur-[0.8px] opacity-75" style={{ transform: `translate(${pupil.x * -0.25}px, ${pupil.y * -0.25}px)` }} />
          <div className="absolute left-[31%] top-[15%] h-[7%] w-[7%] rounded-full bg-cyan-50/60 blur-[1.2px] opacity-55" style={{ transform: `translate(${pupil.x * -0.2}px, ${pupil.y * -0.2}px)` }} />
        </div>

      </div>
    </div>
  );
}




//-----2.0
// import { useEffect, useRef } from 'react';

// interface AbyssWatcherProps {
//   target: { x: number; y: number };
//   active: boolean;
// }

// export default function AbyssWatcher({ target, active }: AbyssWatcherProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const targetRef = useRef(target);

//   // 保持最新的 target 引用以避免 useEffect 頻繁重啟
//   useEffect(() => {
//     targetRef.current = target;
//   }, [target]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animationFrameId: number;

//     // 當前眼珠的平滑位置
//     const currentEye = { x: 0, y: 0 };

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();

//     // 繪製古神本體
//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const centerX = canvas.width / 2;
//       // 3. 位置下移點：將原本居中的肉體重心移至畫面下方 75% 處
//       const centerY = canvas.height * 0.75; 
//       const bodyRadius = Math.min(canvas.width * 0.35, 300);

//       // 平滑緩動追蹤滑鼠
//       const ease = 0.1;
//       currentEye.x += (targetRef.current.x - currentEye.x) * ease;
//       currentEye.y += (targetRef.current.y - currentEye.y) * ease;

//       // -------------------------------------------------------------
//       // STEP 1: 繪製基底肉體剪影與暗部陰影
//       // -------------------------------------------------------------
//       ctx.save();
//       ctx.beginPath();
//       ctx.arc(centerX, centerY + 50, bodyRadius * 1.2, 0, Math.PI * 2);
//       ctx.fillStyle = '#050b11';
//       ctx.fill();

//       // -------------------------------------------------------------
//       // STEP 2: 繪製兩隻發光的眼眶內壁 (左眼、右眼)
//       // -------------------------------------------------------------
//       const eyeSpacing = bodyRadius * 0.55;
//       const eyeLevel = centerY - 10;
//       const eyeWidth = bodyRadius * 0.35;
//       const eyeHeight = bodyRadius * 0.22;

//       const eyes = [
//         { x: centerX - eyeSpacing, y: eyeLevel, angle: -0.05 }, // 左眼
//         { x: centerX + eyeSpacing, y: eyeLevel, angle: 0.05 }   // 右眼
//       ];

//       eyes.forEach((eye) => {
//         ctx.save();
//         ctx.translate(eye.x, eye.y);
//         ctx.rotate(eye.angle);

//         // 繪製眼窩裁剪區域
//         ctx.beginPath();
//         ctx.ellipse(0, 0, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
        
//         // 眼窩底色（強烈青藍色螢光）
//         const eyeGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, eyeWidth);
//         eyeGlow.addColorStop(0, '#a5f3fc'); // cyan-200
//         eyeGlow.addColorStop(0.4, '#06b6d4'); // cyan-500
//         eyeGlow.addColorStop(1, '#083344'); // cyan-950
//         ctx.fillStyle = eyeGlow;
//         ctx.fill();
//         ctx.clip(); // 限制眼珠不超出眼眶

//         // -------------------------------------------------------------
//         // STEP 3: 繪製眼珠 (1. 大幅度移動核心邏輯)
//         // -------------------------------------------------------------
//         // 增大移動範圍：最大可移動半徑大幅提升
//         const maxMoveX = eyeWidth * 0.55; 
//         const maxMoveY = eyeHeight * 0.55;
        
//         const pupilX = currentEye.x * maxMoveX;
//         const pupilY = currentEye.y * maxMoveY;

//         // 繪製黑色瞳孔
//         ctx.beginPath();
//         ctx.arc(pupilX, pupilY, eyeHeight * 0.4, 0, Math.PI * 2);
//         ctx.fillStyle = '#020617';
//         ctx.fill();

//         // 瞳孔高光點
//         ctx.beginPath();
//         ctx.arc(pupilX - eyeHeight * 0.1, pupilY - eyeHeight * 0.1, eyeHeight * 0.1, 0, Math.PI * 2);
//         ctx.fillStyle = '#ffffff';
//         ctx.fill();

//         ctx.restore();
//       });

//       // -------------------------------------------------------------
//       // STEP 4: 繪製上層肉體褶皺與眼瞼 (2. 嵌在肉裡的核心關鍵)
//       // -------------------------------------------------------------
//       // 我們在眼球上方重疊繪製深色的有機線條，產生包覆感
//       ctx.strokeStyle = '#08121e';
//       ctx.lineWidth = 6;
//       ctx.lineCap = 'round';

//       // 繪製遮蔽眼眶邊緣的肉褶（眼瞼疊加）
//       eyes.forEach((eye) => {
//         ctx.save();
//         ctx.translate(eye.x, eye.y);
//         ctx.rotate(eye.angle);

//         // 上眼瞼陰影包覆
//         ctx.beginPath();
//         ctx.ellipse(0, -2, eyeWidth + 4, eyeHeight + 2, 0, Math.PI, 0);
//         ctx.lineWidth = 14;
//         ctx.strokeStyle = '#030712'; // 極深色肉褶遮罩
//         ctx.stroke();

//         // 下眼瞼陰影包覆
//         ctx.beginPath();
//         ctx.ellipse(0, 2, eyeWidth + 4, eyeHeight + 2, 0, 0, Math.PI);
//         ctx.lineWidth = 10;
//         ctx.stroke();

//         ctx.restore();
//       });

//       // 繪製外圍肉塊的脈絡線條（還原圖中螺旋、糾結的肉質紋理）
//       ctx.shadowBlur = 0;
//       for (let i = 0; i < 36; i++) {
//         ctx.beginPath();
//         const angleStart = (i * Math.PI) / 18;
//         const radiusX = bodyRadius * (0.6 + Math.sin(i) * 0.3);
//         const radiusY = bodyRadius * (0.5 + Math.cos(i) * 0.2);

//         ctx.ellipse(centerX, centerY + 60, radiusX, radiusY, Math.sin(i) * 0.2, angleStart, angleStart + Math.PI * 0.4);
//         ctx.strokeStyle = i % 2 === 0 ? '#0b1d33' : '#040a12';
//         ctx.lineWidth = 4 + (i % 3) * 3;
//         ctx.stroke();
//       }

//       // 頂層軟組織打光陰影
//       const bodyGlow = ctx.createRadialGradient(centerX, centerY, bodyRadius * 0.2, centerX, centerY + 100, bodyRadius * 1.1);
//       bodyGlow.addColorStop(0, 'rgba(15, 32, 54, 0)');
//       bodyGlow.addColorStop(0.7, 'rgba(5, 12, 22, 0.85)');
//       bodyGlow.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
//       ctx.fillStyle = bodyGlow;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.restore();

//       if (active) {
//         animationFrameId = requestAnimationFrame(draw);
//       }
//     };

//     draw();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [active]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 pointer-events-none mix-blend-normal opacity-95"
//     />
//   );
// }

//-----3.0
// import { useEffect, useRef, useState } from 'react';

// export interface EyeTarget {
//   x: number;
//   y: number;
// }

// interface AbyssWatcherEyesProps {
//   target: EyeTarget;
//   active: boolean;
//   reducedMotion?: boolean;
// }

// function clamp(value: number, min: number, max: number) {
//   return Math.min(Math.max(value, min), max);
// }

// export default function AbyssWatcherEyes({ target, active, reducedMotion = false }: AbyssWatcherEyesProps) {
//   const [pupil, setPupil] = useState({ x: 0, y: 0, open: 1 });
//   const [redPulse, setRedPulse] = useState(false);
//   const driftRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
//   const blinkStateRef = useRef<{ nextBlink: number }>({ nextBlink: 0 });
//   const pulseTimerRef = useRef<number | null>(null);
//   const pulseTimeoutRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!active) {
//       return;
//     }

//     const now = performance.now();
//     blinkStateRef.current.nextBlink = now + 2200 + Math.random() * 2600;

//     if (pulseTimeoutRef.current) {
//       window.clearTimeout(pulseTimeoutRef.current);
//     }
//     if (pulseTimerRef.current) {
//       window.clearTimeout(pulseTimerRef.current);
//     }

//     const triggerPulse = () => {
//       setRedPulse(true);
//       pulseTimeoutRef.current = window.setTimeout(() => {
//         setRedPulse(false);
//       }, reducedMotion ? 80 : 120);

//       pulseTimerRef.current = window.setTimeout(triggerPulse, 7000);
//     };

//     triggerPulse();

//     let frame = 0;
//     let lastTime = now;

//     const tick = (time: number) => {
//       const delta = Math.min((time - lastTime) / 1000, 0.05);
//       lastTime = time;

//       const drift = driftRef.current;

//       // ==========================================
//       // 修改點 1: 移動幅度放大 2 倍以上 (從 13/11 放大至 28.6/24.2)
//       // ==========================================
//       const desiredX = clamp((target.x - 0.5) * 28.6, -24.2, 24.2);
//       const desiredY = clamp((target.y - 0.5) * 24.2, -19.8, 19.8);

//       drift.vx += (desiredX - drift.x) * 0.18 * delta * 60;
//       drift.vy += (desiredY - drift.y) * 0.18 * delta * 60;
//       drift.vx *= 0.87;
//       drift.vy *= 0.87;
//       drift.x += drift.vx;
//       drift.y += drift.vy;

//       let open = 1;
//       if (time >= blinkStateRef.current.nextBlink) {
//         const blinkPhase = ((time - blinkStateRef.current.nextBlink) / 220) % 2;
//         open = blinkPhase < 1 ? 1 - blinkPhase : blinkPhase - 1;
//         if (blinkPhase >= 1.95) {
//           blinkStateRef.current.nextBlink = time + 2600 + Math.random() * 3200;
//         }
//       }

//       if (reducedMotion) {
//         open = 0.98;
//         drift.x *= 0.96;
//         drift.y *= 0.96;
//       }

//       setPupil({
//         x: drift.x,
//         y: drift.y,
//         open: clamp(open, 0.2, 1),
//       });

//       frame = window.requestAnimationFrame(tick);
//     };

//     frame = window.requestAnimationFrame(tick);

//     return () => {
//       window.cancelAnimationFrame(frame);
//       if (pulseTimerRef.current) {
//         window.clearTimeout(pulseTimerRef.current);
//       }
//       if (pulseTimeoutRef.current) {
//         window.clearTimeout(pulseTimeoutRef.current);
//       }
//       setRedPulse(false);
//     };
//   }, [active, reducedMotion, target.x, target.y]);

//   return (
//     <div className="absolute inset-0">
//       {/* 修改點 3: 位置下移 (從 top-[35.2%] 改為 top-[64%]) 
//       */}
//       <div className="absolute left-1/2 top-[45%] aspect-square w-[clamp(260px,45vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full">
        
//         {/* ==========================================
//             修改點 2: 「嵌在肉裡」的外圍肉質遮罩與立體陰影層 
//            ========================================== */}
//         {/* 底部包覆古神的肉團陰影 */}
//         <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle_at_50%_50%,#030712_20%,#08121e_50%,transparent_75%)] opacity-90 blur-xl pointer-events-none -z-10" />

//         {/* 肉組織的立體邊緣疊加 (加深眼窩與肉體交界，創造凹陷感) */}
//         <div className="absolute inset-[-4px] rounded-full border-[12px] border-[#040a12] shadow-[inset_0_0_40px_rgba(0,0,0,0.98),0_0_30px_rgba(4,10,18,0.9)] z-20 pointer-events-none" />
//         <div className="absolute inset-[-1px] rounded-full border-[4px] border-[#0d1f33]/30 z-20 pointer-events-none mix-blend-color-dodge blur-[0.5px]" />

//         {/* 透過 clip-path 創造被肉卡住、非完美圓形的生物眼窩邊緣 */}
//         <div 
//           className="absolute inset-0 overflow-hidden rounded-full"
//           style={{ clipPath: 'polygon(5% 15%, 22% 4%, 50% 0%, 82% 6%, 96% 22%, 100% 50%, 93% 82%, 72% 96%, 46% 100%, 15% 91%, 0% 61%, 0% 32%)' }}
//         >
//           {/* ----------------------------------------
//               這裡完全保留你原本漂亮的眼睛內部渲染代碼
//              ---------------------------------------- */}
//           <div
//             className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(8,12,14,0.99),rgba(2,4,6,0.995)_62%,rgba(0,0,0,0.995)_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.015),0_0_34px_rgba(0,0,0,0.92)]"
//             style={{
//               transform: `scale(${redPulse ? 1.03 : 1})`,
//               boxShadow: redPulse
//                 ? '0 0 56px rgba(255, 56, 56, 0.42), 0 0 120px rgba(255, 30, 30, 0.26), 0 0 18px rgba(0,0,0,0.94)'
//                 : '0 0 0 1px rgba(255,255,255,0.02), 0 0 30px rgba(0,0,0,0.92)',
//             }}
//           />

//           <div className="absolute inset-[5%] rounded-full bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.08),transparent_26%,rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.18)_100%)] opacity-80" />
//           <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.9),rgba(244,255,255,0.25)_16%,rgba(174,233,240,0.08)_33%,rgba(0,0,0,0.7)_72%,rgba(0,0,0,0.95)_100%)] opacity-95" />
//           <div className="absolute inset-[19%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(143,255,249,0.18),rgba(18,50,60,0.1)_42%,rgba(0,0,0,0.95)_100%)] shadow-[inset_0_0_18px_rgba(0,0,0,0.88)]" />

//           <div
//             className="absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle_at_35%_34%,rgba(173,255,251,0.42),rgba(42,114,134,0.2)_43%,rgba(0,0,0,0.96)_100%)]"
//             style={{
//               width: '56%',
//               height: '56%',
//               transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px)) scale(${redPulse ? 1.03 : 1})`,
//               boxShadow: redPulse
//                 ? '0 0 34px rgba(255, 58, 58, 0.5), inset 0 0 24px rgba(255, 58, 58, 0.34)'
//                 : '0 0 18px rgba(96,246,255,0.12), inset 0 0 16px rgba(96,246,255,0.08)',
//             }}
//           >
//             <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.98),rgba(212,244,255,0.22)_16%,rgba(155,222,231,0.1)_34%,rgba(0,0,0,0.74)_72%,rgba(0,0,0,0.96)_100%)] opacity-95" />
//             <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(132,255,250,0.12),rgba(0,0,0,0.94)_74%,rgba(0,0,0,0.99)_100%)] shadow-[inset_0_0_18px_rgba(0,0,0,0.92)]" />
//             <div className="absolute left-[29%] top-[18%] h-[15%] w-[15%] rounded-full bg-white/85 blur-[1px] opacity-78" />
//             <div className="absolute left-[44%] top-[13%] h-[9%] w-[9%] rounded-full bg-cyan-50/55 blur-[1.5px] opacity-55" />
//             <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.1),transparent_46%)] opacity-55" />
//             <div className="absolute inset-0 rounded-full border border-cyan-100/10" style={{
//               boxShadow: redPulse ? 'inset 0 0 30px rgba(255, 55, 55, 0.18)' : 'inset 0 0 24px rgba(120,240,255,0.08)',
//             }} />
//             <div className="absolute left-[47%] top-[56%] h-[8%] w-[34%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)] opacity-55 blur-[0.8px]" />
//             <div className="absolute inset-x-[14%] bottom-[6%] h-[6%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_72%)] opacity-42 blur-[0.8px]" />
//           </div>

//           <div className="absolute inset-x-[8%] top-[2%] h-[42%] rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_40%,transparent_100%)] opacity-55" style={{ transform: `translateY(${(1 - pupil.open) * 44}%)` }} />
//           <div className="absolute inset-x-[8%] bottom-[2%] h-[42%] rounded-full bg-[linear-gradient(to_top,rgba(0,0,0,0.28),rgba(0,0,0,0.08)_40%,transparent_100%)] opacity-75" style={{ transform: `translateY(${(1 - pupil.open) * -30}%)` }} />

//           <div className="absolute left-[20%] top-[20%] h-[12%] w-[12%] rounded-full bg-white/90 blur-[0.8px] opacity-75" style={{ transform: `translate(${pupil.x * -0.25}px, ${pupil.y * -0.25}px)` }} />
//           <div className="absolute left-[31%] top-[15%] h-[7%] w-[7%] rounded-full bg-cyan-50/60 blur-[1.2px] opacity-55" style={{ transform: `translate(${pupil.x * -0.2}px, ${pupil.y * -0.2}px)` }} />
//         </div>

//       </div>
//     </div>
//   );
// }