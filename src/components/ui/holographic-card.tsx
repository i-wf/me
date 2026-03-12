'use client';

import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const HolographicCard = ({
  children,
  className,
  glowColor = "rgba(255, 255, 255, 0.4)"
}: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setStyle({
      '--x': `${x}px`,
      '--y': `${y}px`,
      '--bg-x': `${(x / rect.width) * 100}%`,
      '--bg-y': `${(y / rect.height) * 100}%`,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      '--x': `50%`,
      '--y': `50%`,
      '--bg-x': '50%',
      '--bg-y': '50%',
    } as React.CSSProperties);
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-200 ease-out preserve-3d group cursor-pointer",
        className
      )}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      {/* Holographic Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${glowColor} 0%, transparent 60%)`,
          mixBlendMode: 'overlay',
          zIndex: 5
        }}
      />

      {/* Prism Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 20%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 80%, rgba(255,255,255,0.1) 100%)`,
          backgroundSize: '200% 200%',
          backgroundPosition: 'var(--bg-x, 50%) var(--bg-y, 50%)',
          mixBlendMode: 'color-dodge',
          zIndex: 4
        }}
      />

      <style>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
            `}</style>
    </div>
  );
};

export default HolographicCard;
