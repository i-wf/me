'use client'

import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export default function ShinyButton({
    className,
    children = 'Hire Me',
    ...props
}: ShinyButtonProps) {
    return (
        <button
            className={cn(
                'group relative h-12 w-max rounded-full border-none bg-[linear-gradient(325deg,#6366f1_0%,#a855f7_55%,#6366f1_90%)] bg-[length:280%_auto] px-8 py-2 font-black text-white shadow-[0px_0px_20px_rgba(168,85,247,0.4)] transition-all duration-700 hover:bg-right hover:shadow-[0px_0px_30px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 focus:outline-none uppercase tracking-widest text-xs',
                className
            )}
            type='button'
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
        </button>
    )
}
