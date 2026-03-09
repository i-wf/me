"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Brain, Code2, Layers, Bot, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
} from "lucide-react";
import { cardData } from "../../lib/utils";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Brain, Code2, Layers, Bot, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
};

interface SkillCardProps {
    card: typeof cardData[0];
    index: number;
    total: number;
    scrollYProgress: any;
}

function isLightColor(rgba: string): boolean {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return false;
    const [, r, g, b] = match.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55;
}

const SkillCard: React.FC<SkillCardProps> = ({ card, index, total, scrollYProgress }) => {
    const Icon = iconMap[card.iconName];
    const light = isLightColor(card.color);

    // Each card enters and scales based on scroll progress
    const cardStart = index / total;
    const cardEnd = (index + 1) / total;

    const y = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        [100, index * -8]
    );

    const scale = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        [0.92, 1 - index * 0.02]
    );

    const opacity = useTransform(
        scrollYProgress,
        [cardStart, Math.min(cardEnd + 0.05, 1)],
        [0, 1]
    );

    return (
        <motion.div
            style={{
                y,
                scale,
                opacity,
                zIndex: total - index,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
            }}
            className="w-full"
        >
            <div
                className="relative rounded-3xl p-8 md:p-10 overflow-hidden border"
                style={{
                    backgroundColor: card.color,
                    borderColor: light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)",
                    boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.15)",
                    minHeight: "350px",
                }}
            >
                {/* Glass reflection */}
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none rounded-t-3xl"
                    style={{
                        height: "50%",
                        background: light
                            ? "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)"
                            : "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between gap-6" style={{ minHeight: "280px" }}>
                    <div className="space-y-5">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                                backgroundColor: light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
                            }}
                        >
                            {Icon && (
                                <Icon
                                    className="w-7 h-7"
                                    style={{ color: light ? "#1a1a1a" : "#ffffff" }}
                                />
                            )}
                        </div>

                        <h3
                            className="text-3xl md:text-4xl font-extrabold tracking-tight"
                            style={{ color: light ? "#0a0a0a" : "#ffffff" }}
                        >
                            {card.title}
                        </h3>
                    </div>

                    <p
                        className="text-base md:text-lg leading-relaxed max-w-lg"
                        style={{ color: light ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.75)" }}
                    >
                        {card.description}
                    </p>
                </div>

                {/* Decorative glow blob */}
                <div
                    className="absolute bottom-[-30%] right-[-15%] w-72 h-72 rounded-full blur-3xl pointer-events-none"
                    style={{
                        background: light
                            ? "rgba(0,0,0,0.04)"
                            : "rgba(255,255,255,0.06)",
                    }}
                />
            </div>
        </motion.div>
    );
};

const FolderStack = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            style={{ height: `${cardData.length * 80}vh` }}
            className="relative"
        >
            <div className="sticky top-[15vh] w-full max-w-3xl mx-auto px-4 h-[70vh]">
                <div className="relative w-full h-[400px]">
                    {cardData.map((card, index) => (
                        <SkillCard
                            key={card.id}
                            card={card}
                            index={index}
                            total={cardData.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { FolderStack };
