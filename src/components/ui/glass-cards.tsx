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
}

const Card: React.FC<CardProps> = ({ title, description, index, totalCards, color, iconName }) => {
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
                height: '100vh',
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
                    height: '450px',
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
                    justifyContent: 'space-between', // Changed to space-between for card layout
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: `
                        0 20px 50px rgba(0, 0, 0, 0.1),
                        0 4px 12px rgba(0, 0, 0, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.5)
                    `,
                    overflow: 'hidden',
                    padding: '2.5rem',
                }}>
                    {/* Top Section: Chip and Telda */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 2 }}>
                        {/* Credit Card Chip */}
                        <div style={{
                            width: '45px',
                            height: '35px',
                            borderRadius: '6px',
                            background: 'linear-gradient(135deg, #e5c07b 0%, #d19a66 50%, #98c379 100%)',
                            position: 'relative',
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridTemplateRows: 'repeat(3, 1fr)',
                            gap: '1px',
                            padding: '4px',
                            border: '1px solid rgba(0,0,0,0.1)'
                        }}>
                            {[...Array(9)].map((_, i) => (
                                <div key={i} style={{ border: '0.5px solid rgba(0,0,0,0.2)', borderRadius: '1px' }} />
                            ))}
                        </div>

                        {/* Telda Icon (Placeholder/Stylized) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                backgroundColor: '#1a1a1a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>
                                t
                            </div>
                            <span style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>TELDA</span>
                        </div>
                    </div>

                    {/* Middle Section: Skill Content */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {Icon && <Icon className="w-6 h-6" style={{ color: '#1a1a1a' }} />}
                        </div>
                        <h3 style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                            color: '#4a4a4a',
                            lineHeight: 1.5,
                            maxWidth: '450px',
                            margin: 0
                        }}>
                            {description}
                        </p>
                    </div>

                    {/* Bottom Section: Mastercard Logo */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', zIndex: 2 }}>
                        <div style={{ position: 'relative', width: '60px', height: '36px' }}>
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#eb001b',
                                opacity: 0.9
                            }} />
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#ff5f00',
                                opacity: 0.9
                            }} />
                        </div>
                    </div>

                    {/* Subtle Security Hologram Element */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2.5rem',
                        left: '2.5rem',
                        fontSize: '10px',
                        color: 'rgba(0,0,0,0.2)',
                        fontWeight: 'monospace',
                        letterSpacing: '2px',
                        zIndex: 2
                    }}>
                        SECURE ELEMENT VALIDATED
                    </div>

                    {/* Card shine effect overlay */}
                    <div style={{
                        position: 'absolute',
                        top: '-100%',
                        left: '-100%',
                        width: '300%',
                        height: '300%',
                        background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 60%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                        opacity: 0.5
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
                    />
                ))}
            </section>
        </div>
    );
};
