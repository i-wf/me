import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Mail, ArrowDown, Sparkles,
  Terminal, Layers, Smartphone, Globe as GlobeIcon,
  Home, User, Briefcase, MessageSquare, BookOpen
} from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import ProfileCard from "@/components/ui/profile-card";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Globe } from "@/components/Globe";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { BlogPosts } from "@/components/ui/blog-posts";
import { SocialIcons } from "@/components/ui/social-icons";
import DisplayCards from "@/components/ui/display-cards";
import { CursorTrail } from "@/components/ui/cursor-trail";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ArsenalSection from "@/components/sections/ArsenalSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

const navItems = [
  { name: "Home", url: "#hero", icon: Home },
  { name: "Skills", url: "#skills", icon: User },
  { name: "Projects", url: "#projects", icon: Briefcase },
  { name: "Blog", url: "#blog", icon: BookOpen },
  { name: "Contact", url: "#contact", icon: MessageSquare },
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorTrail />
      
      <FallingPattern
        color="hsl(0, 0%, 30%)"
        backgroundColor="hsl(0, 0%, 4%)"
        duration={120}
        blurIntensity="0.5em"
      />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-muted/20 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-muted/15 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <HeroSection />
      <SkillsSection />
      <ArsenalSection />
      <ProjectsSection />
      <BlogSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Built with passion by <span className="text-gradient font-semibold">Saif Medhat</span> · © 2026
          </p>
        </div>
      </footer>

      <AnimeNavBar items={navItems} defaultActive="Home" />
    </div>
  );
};

export default Index;
