'use client'

import React, { MouseEventHandler, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }>(
    ({ className, variant, size, ...props }, ref) => (
        <button ref={ref} className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" :
                variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" :
                    variant === "link" ? "text-primary underline-offset-4 hover:underline" :
                        "bg-primary text-primary-foreground hover:bg-primary/90",
            size === "sm" ? "h-9 px-3" : size === "lg" ? "h-11 px-8" : size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2",
            className
        )} {...props} />
    )
);
Button.displayName = "Button";

export interface ArticleItem {
    url: string
    title: string
    subTitle: string
    img: string
}

/** Stacked top offset when collapsed (cards peek behind each other) */
const COLLAPSED_OFFSETS = [
    'top-0',
    'top-4',
    'top-8',
    'top-12',
    'top-16',
    'top-20',
]

interface StackedArticleCardsProps {
    items: ArticleItem[]
    className?: string
}

export default function StackedArticleCards({
    items,
    className,
}: StackedArticleCardsProps) {
    const [isActive, setIsActive] = useState(false)

    const handleExpand = () => {
        setIsActive(true)
    }

    const handleCollapse: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setIsActive(false)
    }

    return (
        <div
            className={cn('relative w-full max-w-md mx-auto transition-all duration-500',
                isActive ? 'h-[800px] md:h-[900px]' : 'h-[200px]',
                className
            )}
            onClick={handleExpand}
        >
            <div className="relative w-full h-full">
                {items.map((item, index) => {
                    // Dynamic offsets for expansion
                    const expandedTop = index * 130; // Spacing between cards when expanded

                    return (
                        <div
                            key={index}
                            className={cn(
                                'absolute left-1/2 -translate-x-1/2 flex h-28 w-full md:w-96 cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-white/10',
                                isActive ? '' : COLLAPSED_OFFSETS[index % COLLAPSED_OFFSETS.length]
                            )}
                            style={{
                                top: isActive ? `${expandedTop}px` : undefined,
                                zIndex: items.length - index,
                                transform: isActive
                                    ? 'translateX(-50%)'
                                    : `translateX(-50%) scale(${1 - index * 0.05})`,
                            }}
                        >
                            <div
                                className={cn(
                                    'flex w-full items-center gap-4 no-underline',
                                    isActive ? 'pointer-events-auto' : 'pointer-events-none'
                                )}
                            >
                                <div className='size-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10'>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className='h-full w-full object-cover transition-transform duration-500 hover:scale-110'
                                    />
                                </div>
                                <div className='min-w-0 flex-1'>
                                    <p className='text-white mb-1 truncate text-base font-bold'>
                                        {item.title}
                                    </p>
                                    <p className='text-zinc-400 line-clamp-2 text-xs leading-relaxed font-medium'>
                                        {item.subTitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Show less toggle */}
                <div
                    className={cn(
                        'absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out',
                        isActive
                            ? 'pointer-events-auto visible opacity-100'
                            : 'pointer-events-none invisible opacity-0'
                    )}
                    style={{ top: `${items.length * 130 + 20}px` }}
                    onClick={handleCollapse}
                >
                    <Button variant={'outline'} size='sm' className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 px-8">
                        Show less
                    </Button>
                </div>
            </div>
        </div>
    )
}
