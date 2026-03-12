"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Layers, LayoutList, ExternalLink, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export type LayoutMode = "stack" | "list"

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
        stack: "relative h-[400px] w-full max-w-[300px]",
        list: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl px-4",
    }

    const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

    return (
        <div className={cn("space-y-12 flex flex-col items-center justify-center w-full", className)}>
            {/* Layout Toggle / Tooltip */}
            <div className="flex flex-col items-center gap-6 z-20">
                <div className="text-center space-y-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] animate-pulse block">
                        {layout === 'stack' ? 'Drag to explore · Click to expand' : 'Expanded Arsenal'}
                    </span>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-full bg-white/5 border border-white/10 p-1.5 backdrop-blur-2xl">
                    {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
                        const Icon = layoutIcons[mode as keyof typeof layoutIcons]
                        return (
                            <button
                                key={mode}
                                onClick={() => setLayout(mode as LayoutMode)}
                                className={cn(
                                    "rounded-full px-4 py-2 transition-all duration-500 flex items-center gap-2",
                                    layout === mode
                                        ? "bg-white text-black shadow-lg"
                                        : "text-zinc-500 hover:text-white hover:bg-white/5",
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Cards Container */}
            <LayoutGroup>
                <motion.div layout className={cn(containerStyles[layout], "mx-auto flex justify-center")}>
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
                                        stiffness: 450,
                                        damping: 35,
                                    }}
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                                    onClick={() => {
                                        if (isDragging) return
                                        if (layout === 'stack') {
                                            setLayout('list')
                                        } else {
                                            setSelectedCard(isSelected ? null : card)
                                        }
                                    }}
                                    className={cn(
                                        "relative cursor-pointer rounded-[24px] border border-white/5 bg-zinc-900/60 p-6 flex items-center gap-6 transition-all duration-500 hover:border-violet-500/30 backdrop-blur-3xl group overflow-hidden shadow-2xl",
                                        layout === "stack" && "absolute w-72 h-80 md:w-80 md:h-96",
                                        layout === "list" && "w-full min-h-[100px]",
                                        isSelected && "ring-2 ring-violet-500/50 bg-zinc-800/80 border-violet-500/40",
                                    )}
                                >
                                    <div
                                        className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: `radial-gradient(circle at center, ${card.color || '#8b5cf6'} 0%, transparent 70%)` }}
                                    />

                                    <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                        {card.icon}
                                    </div>

                                    <div className="relative z-10 flex-1">
                                        <h3 className="font-black text-white text-sm md:text-base uppercase tracking-tighter italic leading-none">{card.title}</h3>
                                        <p className="text-[8px] text-violet-400 font-black uppercase tracking-[0.2em] mt-1">
                                            {isSelected ? 'Active View' : 'Tap to reveal details'}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/* Pop-up Details - CENTERED BELOW */}
            <AnimatePresence>
                {selectedCard && layout === 'list' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="w-full max-w-2xl mx-auto px-4 z-50 py-8"
                    >
                        <div className="p-8 rounded-[40px] bg-zinc-900/90 border border-violet-500/20 backdrop-blur-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                            <div className="noise opacity-10 absolute inset-0 pointer-events-none" />

                            <button onClick={() => setSelectedCard(null)} className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-transform duration-500 hover:rotate-90 p-2">
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="size-20 rounded-[28px] bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shadow-inner relative">
                                    <div className="absolute inset-0 blur-2xl bg-violet-600/30 rounded-full" />
                                    {selectedCard.icon}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                                        {selectedCard.title}
                                    </h4>
                                    <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed italic max-w-lg">
                                        "{selectedCard.description}"
                                    </p>
                                </div>

                                {selectedCard.certificateUrl && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="flex items-center gap-3 px-10 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(139,92,246,0.3)]">
                                                <Eye className="h-4 w-4" /> THE CERTIFICATE POP-UP
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-black/95 border-white/5 backdrop-blur-3xl p-2 rounded-[40px] max-w-3xl focus:outline-none">
                                            <DialogHeader className="sr-only">
                                                <DialogTitle>{selectedCard.title} Verified Credential</DialogTitle>
                                            </DialogHeader>
                                            <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden">
                                                <div className="noise opacity-30 absolute inset-0 z-10 pointer-events-none" />
                                                <img
                                                    src={selectedCard.certificateUrl}
                                                    alt="Certificate"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent pointer-events-none" />
                                                <div className="absolute bottom-10 left-10 flex items-center gap-5">
                                                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">
                                                        <ExternalLink className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[14px] font-black text-white uppercase tracking-[0.4em]">Official Credential</p>
                                                        <p className="text-[12px] font-bold text-violet-400 uppercase tracking-[0.2em]">{selectedCard.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
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
