import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

interface OceanBubblesProps {
  scrollDepth: number;
  mousePosition: {
    x: number;
    y: number;
  };
}

export default function OceanBubbles({ scrollDepth, mousePosition }: OceanBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = [];

    for (let i = 0; i < 20; i += 1) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 20,
        size: Math.random() * 20 + 5,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 5,
      });
    }

    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full backdrop-blur-sm animate-bubble-rise transition-all duration-1000"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size * (1 - scrollDepth * 0.3)}px`,
            height: `${bubble.size * (1 - scrollDepth * 0.3)}px`,
            opacity: bubble.opacity * (1 - scrollDepth * 0.4),
            animationDuration: `${bubble.speed + 3 + scrollDepth * 2}s`,
            animationDelay: `${bubble.delay}s`, 
            background:
              scrollDepth > 0.6
                ? `rgba(100,200,255,${0.2 * (1 - scrollDepth * 0.5)})`
                : `rgba(255,255,255,${0.4 * (1 - scrollDepth * 0.3)})`,
            transform: `translateX(${Math.sin(mousePosition.y * 0.01 + bubble.id) * 10 * (1 - scrollDepth * 0.5)}px)`,
          }}
        >
          <div
            className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full transition-opacity duration-1000"
            style={{
              opacity: 0.6 * (1 - scrollDepth * 0.7),
            }}
          />
        </div>
      ))}
    </div>
  );
}