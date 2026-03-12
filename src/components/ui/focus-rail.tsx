"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc: string;
    href?: string;
    meta?: string;
};

interface FocusRailProps {
    items: FocusRailItem[];
    initialIndex?: number;
    loop?: boolean;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    containerHeight?: string;
}

function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
};

const TAP_SPRING = {
    type: "spring",
    stiffness: 450,
    damping: 18,
    mass: 1,
};

export function FocusRail({
    items,
    initialIndex = 0,
    loop = true,
    autoPlay = false,
    interval = 4000,
    className,
    containerHeight = "600px"
}: FocusRailProps) {
    const [active, setActive] = React.useState(initialIndex);
    const [isHovering, setIsHovering] = React.useState(false);
    const lastWheelTime = React.useRef<number>(0);

    const count = items.length;
    const activeIndex = wrap(0, count, active);
    const activeItem = items[activeIndex];

    const handlePrev = React.useCallback(() => {
        if (!loop && active === 0) return;
        setActive((p) => p - 1);
    }, [loop, active]);

    const handleNext = React.useCallback(() => {
        if (!loop && active === count - 1) return;
        setActive((p) => p + 1);
    }, [loop, active, count]);

    const onWheel = React.useCallback(
        (e: React.WheelEvent) => {
            const now = Date.now();
            if (now - lastWheelTime.current < 400) return;
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = isHorizontal ? e.deltaX : e.deltaY;
            if (Math.abs(delta) > 20) {
                if (delta > 0) handleNext();
                else handlePrev();
                lastWheelTime.current = now;
            }
        },
        [handleNext, handlePrev]
    );

    React.useEffect(() => {
        if (!autoPlay || isHovering) return;
        const timer = setInterval(() => handleNext(), interval);
        return () => clearInterval(timer);
    }, [autoPlay, isHovering, handleNext, interval]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

    const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) handleNext();
        else if (swipe > swipeConfidenceThreshold) handlePrev();
    };

    const visibleIndices = [-2, -1, 0, 1, 2];

    return (
        <div
            className={cn(
                "group relative flex w-full flex-col overflow-hidden bg-transparent text-white outline-none select-none overflow-x-hidden",
                className
            )}
            style={{ height: containerHeight }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onWheel={onWheel}
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={`bg-${activeItem.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img src={activeItem.imageSrc} alt="" className="h-full w-full object-cover blur-3xl saturate-200" />
                        <div className="absolute inset-0 bg-neutral-950/80" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8 pt-10">
                <motion.div
                    className="relative mx-auto flex h-[320px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={onDragEnd}
                >
                    {visibleIndices.map((offset) => {
                        const absIndex = active + offset;
                        const index = wrap(0, count, absIndex);
                        const item = items[index];
                        if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                        const isCenter = offset === 0;
                        const dist = Math.abs(offset);
                        const xOffset = offset * 280;
                        const zOffset = -dist * 150;
                        const scale = isCenter ? 1 : 0.8;
                        const rotateY = offset * -20;
                        const opacity = isCenter ? 1 : Math.max(0.2, 1 - dist * 0.4);
                        const blur = isCenter ? 0 : dist * 4;

                        return (
                            <motion.div
                                key={absIndex}
                                className={cn(
                                    "absolute aspect-[4/5] w-[220px] md:w-[260px] rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden",
                                    isCenter ? "z-20 border-white/20" : "z-10"
                                )}
                                animate={{
                                    x: xOffset,
                                    z: zOffset,
                                    scale,
                                    rotateY,
                                    opacity,
                                    filter: `blur(${blur}px)`,
                                }}
                                transition={{
                                    ...(BASE_SPRING as any),
                                    scale: TAP_SPRING as any
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => offset !== 0 && setActive((p) => p + offset)}
                            >
                                <img src={item.imageSrc} alt={item.title} className="h-full w-full object-cover pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                                    <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                                    {item.meta && <span className="text-[10px] uppercase tracking-widest text-white/50">{item.meta}</span>}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left h-24 justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItem.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-1"
                            >
                                <h2 className="text-2xl font-black md:text-3xl text-white uppercase tracking-tight italic">
                                    {activeItem.title}
                                </h2>
                                {activeItem.description && (
                                    <p className="max-w-md text-neutral-400 text-sm font-medium">
                                        {activeItem.description}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-full bg-neutral-900/50 p-1 ring-1 ring-white/10 backdrop-blur-md">
                            <button onClick={handlePrev} className="rounded-full p-2 text-neutral-400 hover:text-white transition"><ChevronLeft className="h-5 w-5" /></button>
                            <span className="min-w-[40px] text-center text-[10px] font-mono text-neutral-500">{activeIndex + 1} / {count}</span>
                            <button onClick={handleNext} className="rounded-full p-2 text-neutral-400 hover:text-white transition"><ChevronRight className="h-5 w-5" /></button>
                        </div>
                        {activeItem.href && (
                            <a href={activeItem.href} className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105">
                                Visit <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
