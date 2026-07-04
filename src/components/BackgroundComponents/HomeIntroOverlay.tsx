import { useEffect, useMemo, useState } from 'react';
import type { IntroMode } from '../../hooks/useSessionIntro';

type IntroStep = {
  id: string;
  en: string;
  zh: string;
  duration: number;
};

interface HomeIntroOverlayProps {
  mode: IntroMode;
  active: boolean;
  onComplete: () => void;
}

const firstVisitSteps: IntroStep[] = [
  { id: 'depth', en: 'Depth : 6200m', zh: '深度：6200m', duration: 800 },
  { id: 'signal', en: 'Signal : Weak', zh: '訊號：微弱', duration: 800 },
  { id: 'receive', en: 'Receiving Signal...', zh: '接收到未知訊號...', duration: 900 },
  { id: 'lifeform', en: 'Unknown Lifeform Detected', zh: '偵測到未知生命體', duration: 1000 },
];

const returningSteps: IntroStep[] = [
  { id: 'connecting', en: 'Connecting...', zh: '連線中...', duration: 300 },
  { id: 'assets', en: 'Loading Assets...', zh: '載入資料...', duration: 300 },
  { id: 'ready', en: 'Ready', zh: '完成', duration: 250 },
];

export default function HomeIntroOverlay({ mode, active, onComplete }: HomeIntroOverlayProps) {
  const steps = useMemo(() => (mode === 'first' ? firstVisitSteps : returningSteps), [mode]);
  const [stepIndex, setStepIndex] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    setStepIndex(0);
    setClosing(false);

    const timers: number[] = [];
    let elapsed = 0;

    steps.forEach((step, index) => {
      elapsed += step.duration;
      timers.push(
        window.setTimeout(() => {
          setStepIndex(index);
        }, elapsed),
      );
    });

    const totalDuration = elapsed + (mode === 'first' ? 900 : 450);
    timers.push(
      window.setTimeout(() => {
        setClosing(true);
        window.setTimeout(() => onComplete(), mode === 'first' ? 700 : 220);
      }, totalDuration),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, mode, onComplete, steps]);

  if (!active) {
    return null;
  }

  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-between overflow-hidden bg-[#02101a]/95 px-4 py-6 sm:px-8 sm:py-10 transition-opacity duration-700 ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-label="Deep sea intro overlay"
    >
      <div className="pointer-events-none absolute inset-0 intro-noise" />
      <div className="pointer-events-none absolute inset-0 intro-radar" />

      <div className="relative z-10 max-w-[42ch] space-y-3 text-left text-cyan-100">
        <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">Deep Dive Protocol</div>
        <div className="text-2xl font-semibold sm:text-3xl">{currentStep.en}</div>
        <div className="text-base text-cyan-100/80 sm:text-lg">{currentStep.zh}</div>
      </div>

      <div className="relative z-10 text-right text-cyan-100/70">
        <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/70">Session Feed</div>
        <div className="mt-3 text-sm sm:text-base">{mode === 'first' ? 'Initializing descent' : 'Quick resume'}</div>
        <div className="mt-2 text-xs sm:text-sm space-y-1">
          {steps.map((step, index) => (
            <div key={step.id} className={index <= stepIndex ? 'text-cyan-100' : 'text-cyan-100/30'}>
              {step.en} / {step.zh}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setClosing(true);
          window.setTimeout(() => onComplete(), 120);
        }}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-100/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80 transition hover:bg-cyan-100/20"
      >
        Skip
      </button>
    </div>
  );
}