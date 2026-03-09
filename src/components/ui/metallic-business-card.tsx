'use client';

import React, { useEffect, useMemo, useRef } from 'react';

type Metal = 'gold' | 'silver' | 'bronze' | 'platinum';

export type MetallicBusinessCardProps = {
    name?: string;
    role?: string;
    company?: string;
    email?: string;
    phone?: string;
    website?: string;
    logoSrc?: string;
    logoAlt?: string;

    metal?: Metal;
    width?: number;
    radius?: number;
    maxRotation?: number;
    influenceRadius?: number;
    ease?: number;
    lightFollow?: number;
    mode?: 'light' | 'dark' | 'system';

    compact?: boolean;
    align?: 'left' | 'center' | 'right';
    className?: string;
};

const METAL_BG: Record<Metal, string> = {
    gold: '#ffcc70',
    silver: '#dddde0',
    bronze: '#df9070',
    platinum: '#ffffff',
};

const METAL_TOKENS: Record<
    Metal,
    { ink: string; sub: string; glow1: string; glow2: string }
> = {
    gold: {
        ink: 'oklch(0.22 0.06 70)',
        sub: 'oklch(0.38 0.03 70)',
        glow1: 'rgba(255, 215, 170, .55)',
        glow2: 'rgba(255, 235, 200, .28)',
    },
    bronze: {
        ink: 'oklch(0.20 0.06 45)',
        sub: 'oklch(0.36 0.03 45)',
        glow1: 'rgba(255, 200, 165, .52)',
        glow2: 'rgba(255, 215, 185, .26)',
    },
    silver: {
        ink: 'oklch(0.16 0 240)',
        sub: 'oklch(0.40 0 240)',
        glow1: 'rgba(255, 255, 255, .46)',
        glow2: 'rgba(245, 245, 255, .22)',
    },
    platinum: {
        ink: 'oklch(0.15 0 250)',
        sub: 'oklch(0.38 0 250)',
        glow1: 'rgba(255, 255, 255, .42)',
        glow2: 'rgba(235, 240, 255, .2)',
    },
};

export default function MetallicBusinessCard({
    name = 'Saif Medhat',
    role = 'Full Stack Creator',
    company = 'Chef Studio',
    email = 'q@qn.ci',
    phone,
    website = 'chef.pro',
    logoSrc,
    logoAlt = 'Logo',

    metal = 'platinum',
    width = 420,
    radius = 16,
    maxRotation = 40,
    influenceRadius = 500,
    ease = 0.08,
    lightFollow = 0.4,
    mode = 'dark',

    compact = false,
    align = 'left',
    className = '',
}: MetallicBusinessCardProps) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const ids = useMemo(() => {
        const k = Math.random().toString(36).slice(2, 8);
        return { noise: `noiseFilter-${k}` };
    }, []);

    const current = useRef({ angle: 0, x: 0, y: 0 });
    const target = useRef({ angle: 0, x: 0, y: 0 });
    const currentG = useRef({ x: 50, y: 50 });
    const targetG = useRef({ x: 50, y: 50 });
    const rafRef = useRef<number | null>(null);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const applyVars = () => {
        const host = wrapRef.current;
        if (!host) return;
        host.style.setProperty('--gradient-rotation', `${current.current.angle}deg`);
        host.style.setProperty('--rotate-x', `${current.current.x}deg`);
        host.style.setProperty('--rotate-y', `${current.current.y}deg`);
        host.style.setProperty('--gradient-position-x', `${currentG.current.x}%`);
        host.style.setProperty('--gradient-position-y', `${currentG.current.y}%`);
    };

    const tick = () => {
        const t = ease;
        current.current.angle = lerp(current.current.angle, target.current.angle, t);
        current.current.x = lerp(current.current.x, target.current.x, t);
        current.current.y = lerp(current.current.y, target.current.y, t);
        currentG.current.x = lerp(currentG.current.x, targetG.current.x, t);
        currentG.current.y = lerp(currentG.current.y, targetG.current.y, t);
        applyVars();
        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ease]);

    const resetTargets = () => {
        target.current = { angle: 0, x: 0, y: 0 };
        targetG.current = { x: 50, y: 50 };
    };

    const handlePointer = (e: React.PointerEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const inRange = dist < influenceRadius;
        const mult = Math.max(0.1, 1 - Math.min(1, dist / influenceRadius));

        const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        if (inRange) {
            targetG.current.x = 50 - (nx - 0.5) * 100 * lightFollow;
            targetG.current.y = 50 - (ny - 0.5) * 100 * lightFollow;

            target.current.y = (nx - 0.5) * maxRotation * 2 * mult;
            target.current.x = (0.5 - ny) * maxRotation * 2 * mult;

            const angleTop = 120 * (1 - nx);
            const angleBottom = 120 * nx;
            target.current.angle = (angleTop * (1 - ny) + angleBottom * ny) * mult;
        } else {
            target.current.angle = 0;
        }
    };

    const wrapMode = mode === 'system' ? undefined : (mode as 'light' | 'dark');
    const height = Math.round(width / 1.586);
    const alignCss = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
    const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
    const titleId = useMemo(() => `card-title-${Math.random().toString(36).slice(2, 8)}`, []);
    const ink = METAL_TOKENS[metal];

    return (
        <div
            ref={wrapRef}
            data-theme={wrapMode}
            className={['metal-wrap', className].join(' ')}
            style={
                {
                    '--bg-card': METAL_BG[metal],
                    '--border-radius': `${radius}px`,
                    '--noise-filter': `url(#${ids.noise})`,
                    '--ink': ink.ink,
                    '--ink-sub': ink.sub,
                    '--glow-1': ink.glow1,
                    '--glow-2': ink.glow2,
                    '--display': 'grid',
                    '--place-items': 'center',
                } as React.CSSProperties
            }
            role="region"
            aria-labelledby={titleId}
        >
            <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
                <filter
                    id={ids.noise}
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                    colorInterpolationFilters="linearRGB"
                >
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.3"
                        numOctaves="4"
                        seed="15"
                        stitchTiles="stitch"
                        result="turbulence"
                    />
                    <feSpecularLighting
                        surfaceScale="1"
                        specularConstant="1.8"
                        specularExponent="10"
                        lightingColor="#7957A8"
                        in="turbulence"
                        result="specularLighting"
                    >
                        <feDistantLight azimuth="3" elevation="50" />
                    </feSpecularLighting>
                    <feColorMatrix
                        type="saturate"
                        values="0"
                        in="specularLighting"
                        result="colormatrix"
                    />
                </filter>
            </svg>

            <div
                ref={cardRef}
                className="metallic-card"
                style={{ width, height, position: 'relative', borderRadius: 'var(--border-radius)', transformStyle: 'preserve-3d', overflow: 'hidden', boxShadow: '0 10px 50px rgba(0, 0, 0, 0.25)', background: `radial-gradient(ellipse 160% 120% at var(--gradient-position-x) var(--gradient-position-y), transparent 0%, rgba(0, 0, 0, 1) 100%), conic-gradient(from var(--gradient-rotation) at 50% 50%, rgba(0, 0, 0, 0.6) -120deg, rgba(255, 255, 255, 0.4) 9deg, rgba(0, 0, 0, 0.4) 60deg, rgba(0, 0, 0, 0.06) 107deg, rgba(0, 0, 0, 0.3) 131deg, rgba(0, 0, 0, 0) 188deg, rgba(0, 0, 0, 0.6) 240deg, rgba(255, 255, 255, 0.4) 367deg), var(--bg-card)`, transform: 'rotateX(var(--rotate-x)) rotateY(var(--rotate-y))' }}
                onPointerMove={handlePointer}
                onPointerLeave={resetTargets}
                onBlur={resetTargets}
            >
                <div
                    className="metallic-noise"
                    style={{ position: 'absolute', inset: 0, borderRadius: 'var(--border-radius)', filter: 'var(--noise-filter)', opacity: 0.25, zIndex: 1 }}
                />
                <div
                    className="metallic-overlay"
                    style={{ position: 'absolute', inset: 0, borderRadius: 'var(--border-radius)', background: 'var(--bg-card)', mixBlendMode: 'color', zIndex: 2 }}
                />

                <div
                    className="metallic-content"
                    style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'grid', gridTemplateRows: '1fr auto auto', gap: '0.45rem', padding: '1.1rem 1.25rem', color: 'var(--ink)', textShadow: '0 1px 0 rgba(255, 255, 255, 0.30), 0 8px 22px var(--glow-1), 0 2px 10px var(--glow-2)', alignItems: alignCss, textAlign }}
                >
                    {logoSrc && (
                        <img src={logoSrc} alt={logoAlt} style={{ position: 'absolute', top: '0.9rem', right: '0.9rem', height: '28px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.35))' }} />
                    )}

                    <div style={{ alignSelf: 'end', display: 'grid', gap: '0.15rem' }}>
                        <h3 id={titleId} style={{ margin: 0, fontWeight: 800, letterSpacing: '0.01em', lineHeight: 1.12, fontSize: 'clamp(1.05rem, 0.9rem + 0.6vw, 1.25rem)', color: 'var(--ink)' }}>
                            {name}
                        </h3>
                        {role && <p style={{ margin: '0.05rem 0 0 0', color: 'var(--ink)', fontWeight: 800, letterSpacing: '0.02em', lineHeight: 1.25, fontSize: '0.92rem' }}>{role}</p>}
                        {company && <p style={{ margin: '0.1rem 0 0 0', color: 'var(--ink)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.01em', lineHeight: 1.18, fontVariantCaps: 'all-small-caps' }}>{company}</p>}
                    </div>

                    {(email || phone || website) && (
                        <div style={{ alignSelf: 'end', display: 'grid', gap: '0.14rem', color: 'var(--ink)', fontSize: '0.80rem', letterSpacing: '0.015em', fontWeight: 700 }}>
                            {email && <p style={{ margin: 0 }}>{email}</p>}
                            {phone && <p style={{ margin: 0 }}>{phone}</p>}
                            {website && <p style={{ margin: 0 }}>{website}</p>}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .metal-wrap {
          --gradient-rotation: 0deg;
          --gradient-position-x: 50%;
          --gradient-position-y: 50%;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
        }
        .metallic-card {
           transition: transform 0.1s ease-out, box-shadow 0.2s ease-out;
        }
        .metallic-content::before {
          content: '';
          position: absolute;
          inset: 0.6rem;
          border-radius: calc(var(--border-radius) - 8px);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)), radial-gradient(80% 40% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 60%);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(2px) saturate(1.07);
          z-index: -1;
        }
      `}</style>
        </div>
    );
}
