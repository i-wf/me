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
import Footer from "@/components/sections/Footer";

const navItems = [
  { name: "Home", url: "#hero", icon: Home },
  { name: "Arsenal", url: "#arsenal", icon: Code },
  { name: "Projects", url: "#projects", icon: Briefcase },
  { name: "Connect", url: "#contact", icon: MessageSquare },
];

const Index = () => {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      <div className="noise" />

      {!isMobile && <CursorTrail />}

      {!isMobile && (
        <FallingPattern
          color="hsl(280, 50%, 30%)"
          backgroundColor="hsl(0, 0%, 4%)"
          duration={150}
          blurIntensity="0.8em"
        />
      )}

      {/* Ambient glow orbs - Lush Glassmorphism Colors */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[140px]"
          animate={!isMobile ? { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[160px]"
          animate={!isMobile ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px]"
          animate={!isMobile ? { x: [0, -100, 0], y: [0, -50, 0], scale: [1, 0.9, 1] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <AnimeNavBar items={navItems} defaultActive="Home" />
        <HeroSection />
        <SkillsRedesign />
        <ProjectsSection />
        <TestimonialsSection />
        <div id="contact">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
