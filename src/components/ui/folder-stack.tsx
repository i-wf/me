"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { cardData } from "../../lib/utils";
import { cn } from "../../lib/utils";

const FolderStack = () => {
    const [cards, setCards] = useState(cardData);

    const shiftCard = () => {
        setCards((prevCards) => {
            const newCards = [...prevCards];
            const shifted = newCards.shift();
            if (shifted) newCards.push(shifted);
            return newCards;
        });
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center perspective-[1000px]">
            <div className="relative w-[80%] h-[400px]">
                <AnimatePresence mode="popLayout">
                    {cards.map((card, index) => {
                        const IconComponent = (Icons as any)[card.iconName];

                        // Only render the top 5 cards for performance and visual clarity
                        if (index > 4) return null;

                        return (
                            <motion.div
                                key={card.id}
                                layout
                                initial={{ scale: 0.9, y: index * -15, zIndex: 10 - index, opacity: 0 }}
                                animate={{
                                    scale: 1 - index * 0.05,
                                    y: index * -12,
                                    zIndex: 10 - index,
                                    opacity: 1 - index * 0.15
                                }}
                                exit={{
                                    x: 300,
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: 15,
                                    zIndex: 20
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={cn(
                                    "absolute inset-0 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer border border-white/10",
                                )}
                                style={{
                                    backgroundColor: card.color,
                                    backdropFilter: "blur(20px) saturate(180%)",
                                }}
                                onClick={shiftCard}
                            >
                                {/* Folder Tab Effect */}
                                <div
                                    className="absolute top-0 right-10 h-8 w-32 rounded-b-2xl border-x border-b border-white/20"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                />

                                <div className="relative z-10 space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                        {card.title}
                                    </h3>
                                </div>

                                <div className="relative z-10 max-w-md">
                                    <p className="text-white/80 text-lg leading-relaxed font-medium">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Glass Reflection */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                                {/* Subtle pattern */}
                                <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-white/5 blur-3xl rounded-full" />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Visual background stacks (tabs) */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center -space-x-32 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-48 h-10 rounded-t-3xl border-t border-x border-white/10"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            transform: `translateY(${i * -8}px) scale(${1 - i * 0.1})`,
                            zIndex: -1 - i
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export { FolderStack };
