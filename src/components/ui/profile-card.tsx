"use client";

import { useMemo, useState } from "react";
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
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("w-full max-w-sm", className)}
    >
      <Card className="relative overflow-hidden glass rounded-2xl border-border/30">
        {/* Gradient glow background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-foreground blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-muted-foreground blur-3xl" />
        </div>

        {/* Glow text banner */}
        <div className="relative px-4 py-2 border-b border-border/20">
          <motion.p
            className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Zap className="w-3 h-3 text-primary" />
            {glowText}
          </motion.p>
        </div>

        <CardContent className="relative p-5 space-y-4">
          {/* Status row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className={cn("w-2 h-2 rounded-full animate-pulse", statusColor)} />
              {statusText}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
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
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary/30"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold text-gradient">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 gap-1.5 rounded-xl">
              <Plus className="w-3.5 h-3.5" />
              Hire Me
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              className="flex-1 gap-1.5 rounded-xl"
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
