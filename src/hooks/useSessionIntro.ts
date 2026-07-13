import { useCallback, useEffect, useMemo, useState } from 'react';

export type IntroMode = 'first' | 'returning';
export type IntroPhase = 'checking' | 'playing' | 'done';

const STORAGE_KEY = 'deepSeaIntroSeen';

export function useSessionIntro() {
  const [mode, setMode] = useState<IntroMode>('returning');
  const [phase, setPhase] = useState<IntroPhase>('checking');
  // 增加一個 mounted 狀態，確保 Next.js 水合（Hydration）完成
  const [isMounted, setIsMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === 'undefined') return;

    const seenIntro = window.sessionStorage.getItem(STORAGE_KEY) === '1';
    
    if (seenIntro) {
      setMode('returning');
      setReady(true);
      setPhase('done'); // 如果看過了，直接進入 done 階段，不重複播放
    } else {
      setMode('first');
      setReady(false);
      setPhase('playing'); // 沒看過，開始播放
    }
  }, []);

  // 使用 useCallback 確保函式的記憶體位址不變
  const finishIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    }
    setReady(true);
    setPhase('done');
  }, []);

  const resetIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
    setMode('first');
    setReady(false);
    setPhase('playing');
  }, []);

  // 最終曝露的 API 物件
  return useMemo(() => {
    // 如果 Next.js 還沒在瀏覽器掛載完成，一律回傳檢查中的安全狀態
    if (!isMounted) {
      return {
        mode: 'returning' as IntroMode,
        phase: 'checking' as IntroPhase,
        ready: false,
        isIntroPlaying: true,
        finishIntro,
        resetIntro,
      };
    }

    return {
      mode,
      phase,
      ready,
      isIntroPlaying: phase !== 'done',
      finishIntro,
      resetIntro,
    };
  }, [mode, phase, ready, isMounted, finishIntro, resetIntro]);
}