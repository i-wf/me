'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, Code2, Layers, Zap, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap,
    ExternalLink, X
} from 'lucide-react'
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
    Brain, Code2, Layers, Zap, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap
}

interface SkillItem {
    id: number
    title: string
    description: string
    color: string
    iconName: string
    certificateUrl?: string
}

interface SkillsGridProps {
    items: SkillItem[]
}

export function SkillsGrid({ items }: SkillsGridProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {items.map((item) => {
                    const Icon = iconMap[item.iconName] || Code2
                    const isActive = selectedId === item.id

                    return (
                        <div key={item.id} className="relative">
                            <motion.div
                                onClick={() => setSelectedId(isActive ? null : item.id)}
                                className={cn(
                                    "relative h-32 md:h-40 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                                    isActive
                                        ? "bg-white/15 border-white/40 ring-4 ring-white/10"
                                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                )}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* 3D-ish Glow Background */}
                                <div
                                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                                    style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
                                />

                                <div className="relative z-10 flex flex-col items-center gap-3 text-center p-4">
                                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
                                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </div>
                                    <span className="text-xs md:text-sm font-black text-white uppercase tracking-tighter">
                                        {item.title}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Detail Pop-up / Expansion */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute top-full left-0 right-0 z-50 mt-4 p-5 rounded-2xl bg-zinc-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl"
                                    >
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                            className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        <h4 className="text-sm font-bold text-white uppercase mb-2 pr-6">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {item.certificateUrl && (
                                            <a
                                                href={item.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-black uppercase text-white transition-all w-full justify-center"
                                            >
                                                View Certificate <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}

                                        {/* Pointy arrow for the detail box */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900 border-l border-t border-white/20 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
