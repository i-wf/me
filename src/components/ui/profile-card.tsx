"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Plus, Copy, Zap } from "lucide-react";

interface ProfileCardProps {
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  statusText?: string;
  statusColor?: string;
  glowText?: string;
  className?: string;
}

export default function ProfileCard({
  name = "Portfolio Owner",
  role = "Developer",
  email = "hello@example.com",
  avatarSrc,
  statusText = "Available for work",
  statusColor = "bg-lime-500",
  glowText = "Currently High on Creativity",
  className,
}: ProfileCardProps) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={cn("w-full transition-all duration-500", className)}
    >
      <Card className="relative overflow-hidden glass rounded-2xl border-border/30 shadow-2xl backdrop-blur-3xl">
        {/* Glow text banner - Optimized for mobile */}
        <div className="relative px-3 py-1.5 md:px-4 md:py-2 border-b border-border/10 bg-white/5">
          <motion.p
            className="text-[10px] md:text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5 font-medium tracking-tight"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Zap className="w-2.5 h-2.5 text-foreground" />
            {glowText}
          </motion.p>
        </div>

        <CardContent className="relative p-4 md:p-5 space-y-3 md:space-y-4">
          {/* Status row */}
          <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground/80">
            <span className="flex items-center gap-1.5">
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse bg-green-400")} />
              {statusText}
            </span>
            <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              {timeText}
            </span>
          </div>

          {/* Avatar + name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center text-lg md:text-xl font-black text-gradient border border-white/10">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight leading-none mb-1">{name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground font-medium opacity-70 leading-none">{role}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button size="sm" className="flex-1 gap-1.5 rounded-xl h-9 md:h-10 text-xs md:text-sm font-bold bg-white text-black hover:bg-white/90">
              <Plus className="w-3.5 h-3.5" />
              Hire Me
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              className="flex-1 gap-1.5 rounded-xl h-9 md:h-10 text-xs md:text-sm font-bold glass-card border-white/5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Copied" : "Copy Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
