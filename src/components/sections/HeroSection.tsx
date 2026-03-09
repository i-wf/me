import { motion } from "framer-motion";
import { Mail, ArrowDown, Sparkles } from "lucide-react";
import ProfileCard from "@/components/ui/profile-card";

const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20">
    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <motion.div
        className="glass-strong rounded-3xl p-8 md:p-12 lg:p-16 glow-soft"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground"
            >
              <Sparkles className="w-3.5 h-3.5 text-foreground" />
              15 years old · Full Stack Creator
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <span className="text-gradient">Saif</span>
              <br />
              <span className="text-gradient-dim">Medhat</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              AI Engineer · Full Stack Developer · UI/Graphic Designer · 
              ML Specialist · Automation Expert · Vibe Coder
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <a
                href="mailto:q@qn.ci"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                <Mail className="w-4 h-4" /> Contact Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                View Work <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ProfileCard
              name="Saif Medhat"
              role="Full Stack Creator"
              email="q@qn.ci"
              statusText="Available for work"
              glowText="Building the Future at 15"
            />
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
