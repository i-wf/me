"use client"

import { useState, type ReactNode, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList, ExternalLink, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
    id: string
    title: string
    description: string
    icon?: ReactNode
    color?: string
    certificateUrl?: string
}

export interface MorphingCardStackProps {
    cards?: CardData[]
    className?: string
    defaultLayout?: LayoutMode
    onCardClick?: (card: CardData) => void
}

const layoutIcons = {
    stack: Layers,
    grid: Grid3X3,
    list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
    cards = [],
    className,
    defaultLayout = "stack",
    onCardClick,
}: MorphingCardStackProps) {
    const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [showCert, setShowCert] = useState<string | null>(null)

    if (!cards || cards.length === 0) {
        return null
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info
        const swipe = Math.abs(offset.x) * velocity.x

        if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
            setActiveIndex((prev) => (prev + 1) % cards.length)
        } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
        }
        setIsDragging(false)
    }

    const getStackOrder = () => {
        const reordered = []
        for (let i = 0; i < cards.length; i++) {
            const index = (activeIndex + i) % cards.length
            reordered.push({ ...cards[index], stackPosition: i })
        }
        return reordered.reverse()
    }

    const getLayoutStyles = (stackPosition: number) => {
        switch (layout) {
            case "stack":
                return {
                    top: stackPosition * 8,
                    left: stackPosition * 8,
                    zIndex: cards.length - stackPosition,
                    rotate: (stackPosition - 1) * 2,
                }
            case "grid":
            case "list":
                return {
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    rotate: 0,
                }
        }
    }

    const containerStyles = {
        stack: "relative h-72 w-72",
        grid: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
        list: "flex flex-col gap-4",
    }

    const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

    return (
        <div className={cn("space-y-8", className)}>
            {/* Layout Toggle / Tooltip */}
            <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
                    {layout === 'stack' ? 'Drag to explore · Click to expand' : 'Select a skill for details'}
                </span>
                <div className="flex items-center justify-center gap-1 rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-xl">
                    {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
                        const Icon = layoutIcons[mode]
                        return (
                            <button
                                key={mode}
                                onClick={() => setLayout(mode)}
                                className={cn(
                                    "rounded-full p-2.5 transition-all duration-300",
                                    layout === mode
                                        ? "bg-white text-black shadow-lg shadow-white/20"
                                        : "text-zinc-500 hover:text-white hover:bg-white/10",
                                )}
                            >
                                <Icon className="h-4 w-4" />
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Cards Container */}
            <LayoutGroup>
                <motion.div layout className={cn(containerStyles[layout], "mx-auto px-4")}>
                    <AnimatePresence mode="popLayout">
                        {displayCards.map((card) => {
                            const styles = getLayoutStyles(card.stackPosition)
                            const isTopCard = layout === "stack" && card.stackPosition === 0
                            const isSelected = selectedCard?.id === card.id

                            return (
                                <motion.div
                                    key={card.id}
                                    layoutId={card.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: 0,
                                        ...styles,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.9}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                                    onClick={() => {
                                        if (isDragging) return
                                        if (layout === 'stack') {
                                            setLayout('grid')
                                        } else {
                                            setSelectedCard(isSelected ? null : card)
                                        }
                                        onCardClick?.(card)
                                    }}
                                    className={cn(
                                        "relative cursor-pointer rounded-[24px] border border-white/5 bg-zinc-900/40 p-6 flex flex-col items-center justify-center transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/60 shadow-2xl backdrop-blur-3xl",
                                        layout === "stack" && "absolute w-64 h-64",
                                        layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing hover:scale-105",
                                        layout === "grid" && "aspect-square w-full",
                                        layout === "list" && "w-full h-32",
                                        isSelected && "ring-2 ring-white/50 border-white/40",
                                    )}
                                >
                                    {/* Skill Glow */}
                                    <div
                                        className="absolute inset-0 opacity-10 rounded-[inherit] pointer-events-none"
                                        style={{ background: `radial-gradient(circle at center, ${card.color || '#fff'} 0%, transparent 70%)` }}
                                    />

                                    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            {card.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-tighter leading-none mb-1">{card.title}</h3>
                                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{isSelected ? 'Active Selection' : ''}</p>
                                        </div>
                                    </div>

                                    {/* Top Card indicator */}
                                    {isTopCard && !isSelected && (
                                        <div className="absolute bottom-4 left-0 right-0 text-center">
                                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest animate-bounce">Swipe or Tap</span>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/* Pop-up Details */}
            <AnimatePresence>
                {selectedCard && layout !== 'stack' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="max-w-md mx-auto p-6 rounded-3xl bg-zinc-900/80 backdrop-blur-3xl border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative z-50 text-center"
                    >
                        <button onClick={() => setSelectedCard(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                {selectedCard.icon}
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-black text-white uppercase tracking-tighter italic">{selectedCard.title}</h4>
                                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic line-clamp-3">
                                    "{selectedCard.description}"
                                </p>
                            </div>
                            {selectedCard.certificateUrl && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5">
                                            <Eye className="h-3 w-3" /> View Credential
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-zinc-950/90 border-white/10 backdrop-blur-2xl p-2 rounded-[32px] max-w-2xl overflow-hidden">
                                        <DialogHeader className="p-4 sr-only">
                                            <DialogTitle>{selectedCard.title} Certificate</DialogTitle>
                                        </DialogHeader>
                                        <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden group">
                                            <div className="noise opacity-20 absolute inset-0 z-10 pointer-events-none" />
                                            <img
                                                src={selectedCard.certificateUrl}
                                                alt="Certificate"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent pointer-events-none" />
                                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                                                    <ExternalLink className="h-4 w-4 text-white" />
                                                </div>
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Verified Certification · {selectedCard.title}</p>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pages Indicator */}
            {layout === "stack" && cards.length > 1 && (
                <div className="flex justify-center gap-2 pb-10">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "h-1 rounded-full transition-all duration-500",
                                index === activeIndex ? "w-8 bg-white" : "w-2 bg-zinc-800 hover:bg-zinc-700",
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
