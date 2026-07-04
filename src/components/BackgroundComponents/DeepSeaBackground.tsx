import { useMemo ,useState} from 'react';
import OceanBubbles from './OceanBubbles';
import OceanParticles from './OceanParticles';
import DeepSeaBackgroundMotion from './DeepSeaBackgroundMotion';

export default function DeepSeaBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [scrollDepth, setScrollDepth] = useState(0); // 滾動深度 0-1
    const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <DeepSeaBackgroundMotion active reducedMotion={reducedMotion} />
      <OceanBubbles scrollDepth={scrollDepth} mousePosition={mousePosition} />
      <OceanParticles scrollDepth={scrollDepth} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),rgba(0,0,0,0.18),transparent)]" />
    </div>
  );
}