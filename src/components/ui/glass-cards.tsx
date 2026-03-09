import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Brain, Code2, Layers, Bot, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
} from 'lucide-react';
import { cardData } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
    Brain, Code2, Layers, Bot, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
};

interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    iconName: string;
    certificateUrl?: string;
}

const Card: React.FC<CardProps> = ({ title, description, index, totalCards, color, iconName, certificateUrl }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const Icon = iconMap[iconName];

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            trigger.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '70vh', // Reduced height for tighter stacking
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '70%',
                    height: '480px', // Slightly increased height for certificate
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: `calc(-5vh + ${index * 25}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '27px',
                        padding: '3px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 60deg,
                            ${color.replace('0.8', '0.6')} 120deg,
                            transparent 180deg,
                            ${color.replace('0.8', '0.4')} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '24px',
                    background: 'rgba(255, 254, 250, 0.12)', // Light cream glass
                    backdropFilter: 'blur(35px) saturate(160%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `
                        0 12px 48px rgba(0, 0, 0, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4)
                    `,
                    overflow: 'hidden',
                    padding: '3.5rem',
                }}>
                    {/* Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Skill Content */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}>
                            {Icon && <Icon className="w-8 h-8" style={{ color: '#1a1a1a' }} />}
                        </div>
                        <h3 style={{
                            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                            fontWeight: 900,
                            color: '#1a1a1a',
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            margin: 0
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                            color: 'rgba(0, 0, 0, 0.8)',
                            lineHeight: 1.5,
                            maxWidth: '600px',
                            fontWeight: 600,
                            margin: 0
                        }}>
                            {description}
                        </p>

                        {/* Certificate Badge */}
                        {certificateUrl && (
                            <div className="group/cert" style={{
                                marginTop: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '10px 16px',
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '16px',
                                width: 'fit-content',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                backdropFilter: 'blur(10px)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    background: '#f0f0f0'
                                }}>
                                    <img src={certificateUrl} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Asset</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>Owner Certificate</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Corner Glow - Reused color for subtle branded accent */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-15%',
                        right: '-15%',
                        width: '50%',
                        height: '50%',
                        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                        opacity: 0.12,
                        filter: 'blur(50px)',
                        zIndex: 1
                    }} />
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <div ref={containerRef}>
            <section style={{
                color: '#ffffff',
                width: '100%'
            }}>
                {cardData.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        index={index}
                        totalCards={cardData.length}
                        color={card.color}
                        iconName={card.iconName}
                        certificateUrl={(card as any).certificateUrl}
                    />
                ))}
            </section>
        </div>
    );
};
