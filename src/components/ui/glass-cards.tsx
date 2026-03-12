import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Brain, Code2, Layers, Bot, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
    X
} from 'lucide-react';
import { cardData } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Disable all scroll animations on mobile for maximum speed

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
                const { progress } = self;
                const { interpolate } = gsap.utils;
                const scale = interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            trigger.kill();
        };
    }, [index, totalCards, isMobile]);

    return (
        <div
            ref={containerRef}
            style={{
                height: isMobile ? 'auto' : '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: isMobile ? 'relative' : 'sticky',
                top: 0,
                paddingBottom: isMobile ? '2rem' : 0
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: isMobile ? '92%' : '70%',
                    height: isMobile ? 'auto' : '480px',
                    minHeight: isMobile ? '320px' : 'none',
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: isMobile ? 0 : `calc(-5vh + ${index * 25}px)`,
                    transformOrigin: 'top',
                    margin: isMobile ? '0 auto' : undefined
                }}
                className="card-content"
            >
                {/* Simplified Border - No animation for performance */}
                <div
                    style={{
                        position: 'absolute',
                        inset: isMobile ? '-1px' : '-2px',
                        borderRadius: '25px',
                        background: color,
                        opacity: isMobile ? 0.3 : 1,
                        zIndex: -1,
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
                    background: isMobile ? '#111' : 'rgba(255, 254, 250, 0.12)', // Solid dark on mobile for speed
                    backdropFilter: isMobile ? 'none' : 'blur(35px) saturate(160%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isMobile ? '0 4px 20px rgba(0,0,0,0.4)' : '0 12px 48px rgba(0, 0, 0, 0.12)',
                    overflow: 'hidden',
                    padding: isMobile ? '1.5rem' : '3.5rem',
                }}>
                    {/* Smoothed Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Skill Content */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: isMobile ? '0.6rem' : '1.2rem' }}>
                        <div style={{
                            width: isMobile ? '42px' : '64px',
                            height: isMobile ? '42px' : '64px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}>
                            {Icon && <Icon className={isMobile ? "w-5 h-5" : "w-8 h-8"} style={{ color: '#fff' }} />}
                        </div>
                        <h3 style={{
                            fontSize: isMobile ? '1.5rem' : 'clamp(2.2rem, 4vw, 3.2rem)',
                            fontWeight: 900,
                            color: '#fff',
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            margin: 0
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            fontSize: isMobile ? '0.85rem' : 'clamp(0.95rem, 1.6vw, 1.15rem)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.4,
                            maxWidth: '600px',
                            fontWeight: 500,
                            margin: 0,
                        }}>
                            {description}
                        </p>

                        {/* Certificate Badge - NO HOVER as requested */}
                        {certificateUrl && (
                            <div
                                onClick={() => setIsModalOpen(true)}
                                style={{
                                    marginTop: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '8px 12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '12px',
                                    width: 'fit-content',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                <div style={{
                                    width: '45px',
                                    height: '30px',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: '#111',
                                }}>
                                    <img src={certificateUrl} alt="Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>View Certificate</span>
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

            {/* Certificate Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            backdropFilter: 'blur(15px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            cursor: 'zoom-out'
                        }}
                    >
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                color: 'white',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: 'full',
                                padding: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
                                cursor: 'default'
                            }}
                        >
                            <img
                                src={certificateUrl}
                                alt="Full Certificate"
                                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '2rem',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div className="flex flex-col">
                                    <span className="text-white font-black text-2xl uppercase tracking-tighter">{title}</span>
                                    <span className="text-white/60 font-bold text-sm tracking-widest uppercase">Verified Skill Credential</span>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform active:scale-95"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
