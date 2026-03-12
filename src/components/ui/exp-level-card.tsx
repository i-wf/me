import React, { useState } from 'react';

/**
 * High-Quality, Remixable EXP Level Card Component.
 */
export default function ExpLevelCard({
    initialLevel = 56, // Set to 56 as requested
    initialExp = 85, // Static high progress
    expIncrement = 50,
    baseColorClass = 'from-purple-600 to-indigo-900',
    highlightColorClass = 'border-purple-500',
}) {
    const [level] = useState(initialLevel);
    const [exp] = useState(initialExp);

    // Compute EXP needed based on current level
    const expToNextLevel = 100; // Simplified static display

    // Progress bar width
    const progressWidth = `${(exp / expToNextLevel) * 100}%`;

    return (
        <div
            className={`
        relative 
        w-full 
        h-20 md:h-24 
        rounded-2xl 
        overflow-hidden 
        bg-gradient-to-br ${baseColorClass} 
        border-2 ${highlightColorClass} 
        shadow-xl 
        transition-all 
        duration-300
        group
        pointer-events-none // Disable all interactions as requested
      `}
        >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 md:gap-1">
                <span className="text-[8px] md:text-[10px] font-bold text-white/70 tracking-[0.2em] uppercase">
                    EXPERIENCE LEVEL
                </span>
                <div className="flex items-baseline gap-1 md:gap-2">
                    <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                        {level}
                    </span>
                    <span className="text-[10px] md:text-sm font-bold text-white/80 uppercase">LVL</span>
                </div>
            </div>

            {/* Progress Label */}
            <div className="absolute bottom-4 md:bottom-5 left-3 right-3 flex justify-between items-end">
                <span className="text-[7px] md:text-[9px] font-bold text-white/50 tracking-widest uppercase">Progress</span>
                <span className="text-[7px] md:text-[9px] font-bold text-white/50">{Math.round((exp / expToNextLevel) * 100)}%</span>
            </div>

            <div className="absolute bottom-2.5 md:bottom-3 left-3 right-3 h-1 md:h-1.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: progressWidth }}
                />
            </div>
        </div>
    );
}
