import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home, User, Briefcase, MessageSquare, Code, Award
} from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { SplashScreen } from "@/components/ui/splash-screen";
import { HeroDitheringCard } from "@/components/ui/hero-dithering-card";
import HeroSection from "@/components/sections/HeroSection";
import SkillsRedesign from "@/components/sections/SkillsRedesign";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

const navItems = [
  { name: "Home", url: "#hero", icon: Home },
  { name: "Arsenal", url: "#skills-redesign", icon: Code },
  { name: "Projects", url: "#projects", icon: Briefcase },
  { name: "Contact", url: "#contact", icon: MessageSquare },
];

const Index = () => {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {!isMobile && <CursorTrail />}

      {!isMobile && (
        <FallingPattern
          color="hsl(0, 0%, 30%)"
          backgroundColor="hsl(0, 0%, 4%)"
          duration={120}
          blurIntensity="0.5em"
        />
      )}

      {/* Ambient glow orbs - Simplified for mobile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full bg-muted/10 md:bg-muted/20 blur-[80px] md:blur-[120px]"
          animate={!isMobile ? { x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 rounded-full bg-muted/10 md:bg-muted/15 blur-[60px] md:blur-[100px]"
          animate={!isMobile ? { x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.9, 1] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <AnimeNavBar items={navItems} defaultActive="Home" />
        <HeroSection />
        <SkillsRedesign />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Built with passion by <span className="text-gradient font-semibold">Saif Medhat</span> · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
