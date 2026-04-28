import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Background() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; opacity: number }[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: 50 + Math.random() * 50, // Mostly on the right side
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 4,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#141414]">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414] to-transparent" />
      
      {/* Intense Golden Glow on Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-yellow-500/20 rounded-full blur-[100px] mix-blend-screen opacity-60 translate-x-1/4" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[40vw] h-[40vw] bg-yellow-400/20 rounded-full blur-[80px] mix-blend-screen opacity-80" />
      
      {/* Subtle Teal Accent */}
      <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] bg-teal-500/5 rounded-full blur-[120px] mix-blend-screen opacity-40" />

      {/* Particles (Golden Dust) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-yellow-400 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.2] mix-blend-overlay" />
    </div>
  );
}
