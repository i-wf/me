"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem = CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance || !len) return;
    if (pauseOnHover && hovering) return;
    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, len, loop, active, next]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={cn("relative flex flex-col items-center gap-6", className)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: cardWidth + cardSpacing * maxOffset * 2 + 40,
          height: cardHeight + 80,
          perspective: perspectivePx,
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-2xl" />

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;

              const isMobileLocal = typeof window !== 'undefined' && window.innerWidth < 768;
              const rotateZ = off * (isMobileLocal ? spreadDeg * 0.5 : stepDeg);
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = isMobileLocal ? 0 : -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive || isMobileLocal ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                  drag: "x" as const,
                  dragConstraints: { left: 0, right: 0 },
                  dragElastic: 0.18,
                  onDragEnd: (
                    _e: any,
                    info: { offset: { x: number }; velocity: { x: number } }
                  ) => {
                    const travel = info.offset.x;
                    const v = info.velocity.x;
                    const threshold = Math.min(160, cardWidth * 0.22);
                    if (travel > threshold || v > 650) prev();
                    else if (travel < -threshold || v < -650) next();
                  },
                }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer select-none"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    willChange: 'transform, opacity'
                  }}
                  initial={false}
                  animate={{
                    x,
                    y: y + lift,
                    z,
                    rotateZ,
                    rotateX,
                    scale,
                    opacity: 1 - abs * 0.15,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: isMobileLocal ? 350 : springStiffness, // Snappier on mobile
                    damping: isMobileLocal ? 35 : springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden glass border-border/20 shadow-xl">
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  idx === active
                    ? "bg-foreground"
                    : "bg-foreground/30 hover:bg-foreground/50"
                )}
                aria-label={`Go to ${it.title}`}
              />
            ))}
          </div>
          {activeItem.href && (
            <a href={activeItem.href} target="_blank" rel="noopener noreferrer">
              <SquareArrowOutUpRight className="w-4 h-4 text-muted-foreground hover:text-foreground transition" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative w-full h-full">
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted-foreground">
          No image
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-lg font-bold text-white">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-white/70 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
}
