'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { Wifi } from 'lucide-react';

type Metal = 'gold' | 'silver' | 'bronze' | 'platinum' | 'telda';

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
    telda: '#1a1a1a', // Telda Black
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
    telda: {
        ink: 'rgba(255, 255, 255, 0.95)',
        sub: 'rgba(255, 255, 255, 0.6)',
        glow1: 'rgba(255, 255, 255, 0.2)',
        glow2: 'rgba(255, 255, 255, 0.1)',
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

    metal = 'telda',
    width: initialWidth = 420,
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
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const width = isMobile ? 260 : initialWidth;
    const height = Math.round(width / 1.586);

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
        if (isMobile) return; // Skip complex calculations on mobile
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
        if (isMobile) {
            // Apply default static variables on mobile
            const host = wrapRef.current;
            if (host) {
                host.style.setProperty('--gradient-rotation', '0deg');
                host.style.setProperty('--rotate-x', '0deg');
                host.style.setProperty('--rotate-y', '0deg');
                host.style.setProperty('--gradient-position-x', '50%');
                host.style.setProperty('--gradient-position-y', '50%');
            }
            return;
        }
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ease, isMobile]);

    const resetTargets = () => {
        target.current = { angle: 0, x: 0, y: 0 };
        targetG.current = { x: 50, y: 50 };
    };

    const handlePointer = (e: React.PointerEvent) => {
        if (isMobile) return;
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
                    '--noise-filter': isMobile ? 'none' : `url(#${ids.noise})`,
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
                        lightingColor="#ffffff"
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
                style={{
                    width,
                    height,
                    position: 'relative',
                    borderRadius: 'var(--border-radius)',
                    transformStyle: 'preserve-3d',
                    overflow: 'hidden',
                    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.4)',
                    background: metal === 'telda'
                        ? `linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)`
                        : `radial-gradient(ellipse 160% 120% at var(--gradient-position-x) var(--gradient-position-y), transparent 0%, rgba(0, 0, 0, 1) 100%), conic-gradient(from var(--gradient-rotation) at 50% 50%, rgba(0, 0, 0, 0.6) -120deg, rgba(255, 255, 255, 0.4) 9deg, rgba(0, 0, 0, 0.4) 60deg, rgba(0, 0, 0, 0.06) 107deg, rgba(0, 0, 0, 0.3) 131deg, rgba(0, 0, 0, 0) 188deg, rgba(0, 0, 0, 0.6) 240deg, rgba(255, 255, 255, 0.4) 367deg), var(--bg-card)`,
                    transform: 'rotateX(var(--rotate-x)) rotateY(var(--rotate-y))'
                }}
                onPointerMove={handlePointer}
                onPointerLeave={resetTargets}
                onBlur={resetTargets}
            >
                {/* Visual noise for texture */}
                <div
                    className="metallic-noise"
                    style={{ position: 'absolute', inset: 0, borderRadius: 'var(--border-radius)', filter: 'var(--noise-filter)', opacity: 0.15, zIndex: 1 }}
                />

                {/* Telda S-Wave Pattern */}
                {metal === 'telda' && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        opacity: 0.1,
                        pointerEvents: 'none',
                        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.1) 100%)'
                    }}>
                        <svg width="100%" height="100%" viewBox="0 0 420 265" preserveAspectRatio="none">
                            <path
                                d="M 0 132 Q 105 30 210 132 T 420 132"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="60"
                                strokeLinecap="round"
                                style={{ opacity: 0.5 }}
                            />
                        </svg>
                    </div>
                )}

                <div
                    className="metallic-content"
                    style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: '0.45rem', padding: '2rem', color: 'var(--ink)', textShadow: '0 1px 2px rgba(0,0,0,0.5)', textAlign }}
                >
                    {/* Top Layer: Telda and Wireless */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 900,
                            letterSpacing: '-1px',
                            fontFamily: 'sans-serif'
                        }}>
                            telda
                        </h2>
                        <Wifi className="w-8 h-8 rotate-90 opacity-80" />
                    </div>

                    {/* Middle Layer: Chip and Name */}
                    <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Metal Chip */}
                        <div style={{
                            width: '50px',
                            height: '38px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #d1d1d1 0%, #8e8e8e 50%, #d1d1d1 100%)', // Silver chip
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridTemplateRows: 'repeat(3, 1fr)',
                            gap: '1px',
                            padding: '5px',
                            border: '1px solid rgba(0,0,0,0.2)'
                        }}>
                            {[...Array(9)].map((_, i) => (
                                <div key={i} style={{ border: '0.5px solid rgba(0,0,0,0.3)', borderRadius: '1px' }} />
                            ))}
                        </div>

                        <div style={{ display: 'grid', gap: '0.2rem' }}>
                            <h3 id={titleId} style={{ margin: 0, fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1.1, fontSize: '1.4rem', color: 'var(--ink)' }}>
                                {name}
                            </h3>
                            {role && <p style={{ margin: 0, color: 'var(--ink-sub)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>{role}</p>}
                        </div>
                    </div>

                    {/* Bottom Layer: Info and Mastercard */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                        {(email || phone || website) && (
                            <div style={{ display: 'grid', gap: '0.2rem', color: 'var(--ink-sub)', fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                                {email && <p style={{ margin: 0 }}>{email}</p>}
                                {website && <p style={{ margin: 0 }}>{website}</p>}
                            </div>
                        )}

                        {/* Mastercard Circles */}
                        <div style={{ position: 'relative', width: '60px', height: '36px' }}>
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#eb001b',
                                opacity: 0.95
                            }} />
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#ff5f00',
                                opacity: 0.95
                            }} />
                        </div>
                    </div>
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
        .metallic-content::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
            pointer-events: none;
        }
      `}</style>
        </div>
    );
}
