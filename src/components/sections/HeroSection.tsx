import { motion } from "framer-motion";
import { Mail, ArrowDown, Sparkles } from "lucide-react";
import ProfileCard from "@/components/ui/profile-card";
import { SocialIcons } from "@/components/ui/social-icons";
import ExpLevelCard from "@/components/ui/exp-level-card";
import WarpShaderHero from "@/components/ui/wrap-shader";
import HolographicCard from "@/components/ui/holographic-card";
import ShinyButton from "@/components/ui/shiny-button";

const HeroSection = () => (
  <section id="hero" className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 pt-20 md:pt-0 overflow-hidden">
    <WarpShaderHero />

    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <div className="glass rounded-[32px] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              {/* Nickname badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-border/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Sparkles className="w-3 h-3 text-foreground" />
                <span className="text-xs font-semibold text-foreground tracking-wide">aka Chef</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <span className="text-gradient">Saif</span>
                <br />
                <span className="text-gradient-dim">Medhat</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-xl text-muted-foreground max-w-lg leading-relaxed px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                AI Engineer · Full Stack Developer · UI/Graphic Designer ·
                ML Specialist · Automation Expert · Vibe Coder
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 md:gap-3 md:pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <a href="mailto:q@qn.ci">
                  <ShinyButton className="rounded-xl h-auto py-3">
                    <Mail className="w-4 h-4" /> Contact Me
                  </ShinyButton>
                </a>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl glass text-foreground font-medium hover:bg-secondary/50 transition-all hover:scale-105 active:scale-95 text-sm md:text-base h-[48px]"
                >
                  View Work <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4 max-w-xs mx-auto lg:max-w-none w-full">
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              >
                <HolographicCard className="rounded-[28px]">
                  <ProfileCard
                    name="Saif Medhat"
                    role="Full Stack Creator"
                    email="q@qn.ci"
                    statusText="Available for work"
                    glowText="Building the Future at 15"
                    className="scale-90 md:scale-100 origin-center lg:origin-right !shadow-none"
                  />
                </HolographicCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="px-4 md:px-0"
              >
                <ExpLevelCard
                  initialLevel={56}
                  initialExp={85}
                  baseColorClass="from-purple-900 to-black"
                  highlightColorClass="border-purple-500/30"
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex justify-center mt-8 md:mt-12"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground opacity-50" />
          </motion.div>
        </div>
      </div>

      {/* About Me mini section */}
      <motion.div
        className="mt-6 glass rounded-2xl p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center">
          <div className="min-w-[100px]">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Name</p>
            <p className="text-sm md:text-lg font-bold text-foreground">Saif Medhat</p>
          </div>
          <div className="w-px h-8 bg-border/20 hidden sm:block" />
          <div className="min-w-[100px]">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Nickname</p>
            <motion.p
              className="text-sm md:text-lg font-black text-gradient"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Chef
            </motion.p>
          </div>
          <div className="w-px h-8 bg-border/20 hidden sm:block" />
          <div className="min-w-[100px]">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Age</p>
            <p className="text-sm md:text-lg font-bold text-foreground">15 years old</p>
          </div>
          <div className="w-px h-8 bg-border/20 hidden sm:block" />
          <div className="min-w-[100px]">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Role</p>
            <p className="text-sm md:text-lg font-bold text-foreground">Full Stack Creator</p>
          </div>
        </div>

        {/* Social icons - same style as bottom */}
        <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border/20">
          <SocialIcons />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
