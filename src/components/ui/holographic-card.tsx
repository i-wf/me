import React, { useRef } from 'react';

interface HolographicCardProps {
  children?: React.ReactNode;
  className?: string;
}

const HolographicCard = ({ children, className }: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl glass overflow-hidden transition-transform duration-200 ease-out cursor-default ${className || ''}`}
      style={{
        '--x': '50%',
        '--y': '50%',
        '--bg-x': '50%',
        '--bg-y': '50%',
      } as React.CSSProperties}
    >
      <div className="relative z-10 p-8">
        {children || (
          <>
            <h3 className="text-2xl font-bold text-foreground mb-2">Holographic Card</h3>
            <p className="text-muted-foreground">Move your mouse over me!</p>
          </>
        )}
      </div>

      {/* Holographic shine effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--bg-x) var(--bg-y), rgba(255,255,255,0.3), transparent 60%)`,
        }}
      />
    </div>
  );
};

export default HolographicCard;
