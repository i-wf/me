"use client";

import { useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Dithering = lazy(() =>
    import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

interface HeroDitheringCardProps {
    children: React.ReactNode;
    className?: string;
}

export function HeroDitheringCard({ children, className }: HeroDitheringCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle rotation for holographic effect
        const rotateX = (y - centerY) / 30; // Reduced for subtle feel
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        setIsHovered(false);
    };

    return (
        <div
            className="w-full relative transition-all duration-500 ease-out"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="relative overflow-hidden rounded-[48px] border border-border/30 bg-card/10 backdrop-blur-xl shadow-2xl transition-transform duration-200 ease-out min-h-[600px] flex flex-col items-center justify-center"
            >
                <Suspense fallback={<div className="absolute inset-0 bg-muted/10" />}>
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40 mix-blend-soft-light">
                        <Dithering
                            colorBack="transparent"
                            colorFront="#ffffff" // Using white to match pallete as requested
                            shape="warp"
                            type="4x4"
                            speed={isHovered ? 0.6 : 0.2}
                            className="size-full"
                            minPixelRatio={1}
                        />
                    </div>
                </Suspense>

                <div className="relative z-10 w-full h-full">
                    {children}
                </div>

                {/* Ambient Glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
}
