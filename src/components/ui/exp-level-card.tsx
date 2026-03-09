import React, { useState } from 'react';

/**
 * High-Quality, Remixable EXP Level Card Component.
 */
export default function ExpLevelCard({
    initialLevel = 1,
    initialExp = 0,
    expIncrement = 50,
    baseColorClass = 'from-purple-600 to-indigo-900',
    highlightColorClass = 'border-purple-500',
}) {
    const [level, setLevel] = useState(initialLevel);
    const [exp, setExp] = useState(initialExp);

    // Compute EXP needed based on current level
    const expToNextLevel = 100 + (level - 1) * expIncrement;

    // Handle gaining random EXP on click
    const handleGainExp = () => {
        const gained = Math.floor(Math.random() * 50) + 10;
        const totalExp = exp + gained;

        if (totalExp >= expToNextLevel) {
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setExp(totalExp - expToNextLevel);
        } else {
            setExp(totalExp);
        }
    };

    // Progress bar width
    const progressWidth = `${(exp / expToNextLevel) * 100}%`;

    return (
        <div
            className={`
        relative 
        w-full 
        h-24 
        rounded-2xl 
        overflow-hidden 
        bg-gradient-to-br ${baseColorClass} 
        border-2 ${highlightColorClass} 
        shadow-xl 
        cursor-pointer 
        transition-all 
        duration-300
        hover:scale-[1.02]
        active:scale-95
        group
      `}
            onClick={handleGainExp}
        >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] font-bold text-white/70 tracking-[0.2em] uppercase">
                    STATION LEVEL
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white tracking-tighter">
                        {level}
                    </span>
                    <span className="text-sm font-bold text-white/80">LVL</span>
                </div>
            </div>

            {/* Progress Label */}
            <div className="absolute bottom-5 left-3 right-3 flex justify-between items-end">
                <span className="text-[9px] font-bold text-white/50 tracking-widest uppercase">Progress</span>
                <span className="text-[9px] font-bold text-white/50">{Math.round((exp / expToNextLevel) * 100)}%</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 h-1.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: progressWidth }}
                />
            </div>

            {/* Pulse effect on hover */}
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/50 animate-pulse" />
        </div>
    );
}
