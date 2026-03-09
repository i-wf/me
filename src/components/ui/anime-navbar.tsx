"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(defaultActive);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("fixed top-4 left-1/2 -translate-x-1/2 z-50", className)}>
      <div className="glass-strong rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
        <AnimatePresence>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHovered = hoveredTab === item.name;

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                  const el = document.querySelector(item.url);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300",
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}

                <span className="hidden md:inline relative z-10">{item.name}</span>
                <span className="md:hidden relative z-10">
                  <Icon className="w-4 h-4" />
                </span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-full bg-secondary/50"
                    />
                  )}
                </AnimatePresence>
              </a>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
