import { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

interface OceanParticlesProps {
  scrollDepth: number;
}

export default function OceanParticles({ scrollDepth }: OceanParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const totalParticles = 500;

    return Array.from({ length: totalParticles }).map((_, id) => ({
      id,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5 + scrollDepth * 1.5,
      opacity: scrollDepth > 0.8 ? 0.8 : 0.35 + Math.random() * 0.25,
      duration: 8 + Math.random() * 4 + scrollDepth * 3,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 24,
    }));
  }, [scrollDepth]);

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float-random transition-all duration-1000"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background:
              scrollDepth > 0.7
                ? `rgba(59,130,246,${0.3 + scrollDepth * 0.2})`
                : `rgba(103,232,249,${0.4 * (1 - scrollDepth * 0.3)})`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `translateX(${particle.drift}px)`,
          }}
        />
      ))}
    </div>
  );
}