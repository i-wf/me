"use client"

import { useState, type ReactNode } from "react"
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
        stack: "relative h-[450px] w-full max-w-[320px]",
        grid: "grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-4xl",
        list: "flex flex-col gap-4 max-w-2xl",
    }

    const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

    return (
        <div className={cn("space-y-12 flex flex-col items-center justify-center w-full px-4", className)}>
            {/* Layout Toggle / Tooltip */}
            <div className="flex flex-col items-center gap-6 z-20">
                <div className="text-center space-y-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] animate-pulse block">
                        {layout === 'stack' ? 'Drag with your hands · Force to expand' : 'Direct interaction layer'}
                    </span>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-full bg-white/5 border border-white/10 p-1.5 backdrop-blur-2xl shadow-2xl">
                    {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
                        const Icon = layoutIcons[mode]
                        return (
                            <button
                                key={mode}
                                onClick={() => setLayout(mode)}
                                className={cn(
                                    "rounded-full px-4 py-2 transition-all duration-500 flex items-center gap-2",
                                    layout === mode
                                        ? "bg-white text-black shadow-lg shadow-white/10"
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
                <motion.div layout className={cn(containerStyles[layout], "mx-auto relative")}>
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
                                    whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 100 }}
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
                                        "relative cursor-pointer rounded-[32px] border border-white/5 bg-zinc-900/60 p-8 flex flex-col items-center justify-center transition-all duration-500 hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl group overflow-hidden",
                                        layout === "stack" && "absolute w-full h-[350px] left-0 md:left-auto",
                                        layout === "grid" && "aspect-[3/2] w-full",
                                        layout === "list" && "w-full h-32",
                                        isSelected && "ring-2 ring-white/40 border-white/40 bg-zinc-800/80",
                                    )}
                                >
                                    <div
                                        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                        style={{ background: `radial-gradient(100% 100% at 50% 0%, ${card.color || '#fff'}15 0%, transparent 100%)` }}
                                    />

                                    <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                                        <div className="p-5 rounded-[24px] bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            {card.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-tighter italic leading-none">{card.title}</h3>
                                            <p className="text-[8px] text-[#3ca2fa] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {isSelected ? 'Selected' : 'Tap to reveal'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/* Pop-up Details - RECTANGLE VIEW DESCRIPTION */}
            <AnimatePresence>
                {selectedCard && layout !== 'stack' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="w-full max-w-2xl px-4 relative z-50 mt-10"
                    >
                        <div className="p-8 rounded-[48px] bg-zinc-950/80 border border-white/10 backdrop-blur-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                            <div className="noise opacity-10 absolute inset-0 pointer-events-none" />

                            <button onClick={() => setSelectedCard(null)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-all transform hover:rotate-90">
                                <X className="h-6 w-6" />
                            </button>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="size-24 shrink-0 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    {selectedCard.icon}
                                </div>

                                <div className="flex-1 space-y-6 text-center md:text-left">
                                    <div>
                                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-3">
                                            {selectedCard.title}
                                        </h4>
                                        <div className="h-1 w-12 bg-[#3ca2fa] rounded-full mx-auto md:mx-0 shadow-[0_0_15px_#3ca2fa]" />
                                    </div>

                                    <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed italic">
                                        {selectedCard.description}
                                    </p>

                                    <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                                        {selectedCard.certificateUrl && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button className="flex items-center gap-3 px-8 py-4 rounded-[20px] bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all active:scale-95 shadow-xl shadow-white/5 ring-1 ring-white/20">
                                                        <Eye className="h-4 w-4" /> The Certificate Pop-up
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-black/90 border-white/10 backdrop-blur-3xl p-3 rounded-[40px] max-w-3xl overflow-hidden focus:outline-none">
                                                    <DialogHeader className="sr-only">
                                                        <DialogTitle>{selectedCard.title} Credential</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden group">
                                                        <div className="noise opacity-20 absolute inset-0 z-10 pointer-events-none" />
                                                        <img
                                                            src={selectedCard.certificateUrl}
                                                            alt="Certificate Credential"
                                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                                                        <div className="absolute bottom-8 left-8 flex items-center gap-4">
                                                            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                                                                <ExternalLink className="h-5 w-5 text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[12px] font-black text-white uppercase tracking-[0.3em]">Official Credential</p>
                                                                <p className="text-[10px] font-bold text-[#3ca2fa] uppercase tracking-[0.2em]">{selectedCard.title}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </div>
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
