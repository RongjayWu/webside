import { useEffect, useMemo, useState } from 'react';

export type IntroMode = 'first' | 'returning';
export type IntroPhase = 'checking' | 'playing' | 'done';

const STORAGE_KEY = 'deepSeaIntroSeen';

export function useSessionIntro() {
  const [mode, setMode] = useState<IntroMode>('returning');
  const [phase, setPhase] = useState<IntroPhase>('checking');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const seenIntro = window.sessionStorage.getItem(STORAGE_KEY) === '1';
    setMode(seenIntro ? 'returning' : 'first');
    setPhase('playing');
    setReady(false);
  }, []);

  const finishIntro = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    }

    setReady(true);
    setPhase('done');
  };

  const resetIntro = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }

    setMode('first');
    setReady(false);
    setPhase('playing');
  };

  return useMemo(
    () => ({
      mode,
      phase,
      ready,
      isIntroPlaying: phase !== 'done',
      finishIntro,
      resetIntro,
    }),
    [mode, phase, ready],
  );
}