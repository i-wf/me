import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe,
  ChevronLeft, ChevronRight
} from "lucide-react";

const skills = [
  { icon: <Brain className="w-5 h-5" />, title: "AI Engineering", description: "Building intelligent AI-powered systems", tag: "Core Skill" },
  { icon: <Code2 className="w-5 h-5" />, title: "Web Development", description: "React, TypeScript, Tailwind & Next.js", tag: "Core Skill" },
  { icon: <Layers className="w-5 h-5" />, title: "Full Stack Dev", description: "Frontend to backend, end-to-end", tag: "Core Skill" },
  { icon: <Bot className="w-5 h-5" />, title: "Vibe Coding", description: "AI-assisted creative development", tag: "Specialty" },
  { icon: <Workflow className="w-5 h-5" />, title: "N8N Automations", description: "Complex workflow automation", tag: "Specialty" },
  { icon: <Cpu className="w-5 h-5" />, title: "Machine Learning", description: "Training models & data pipelines", tag: "Core Skill" },
  { icon: <Palette className="w-5 h-5" />, title: "Graphic Design", description: "Brand identities & visual assets", tag: "Creative" },
  { icon: <Smartphone className="w-5 h-5" />, title: "UI/UX Design", description: "Intuitive interfaces & user flows", tag: "Creative" },
  { icon: <Search className="w-5 h-5" />, title: "Data Scraping", description: "Automated data extraction at scale", tag: "Specialty" },
  { icon: <Terminal className="w-5 h-5" />, title: "6+ Languages", description: "Python, JS, TS, C++, and more", tag: "Foundation" },
  { icon: <Globe className="w-5 h-5" />, title: "Data Research", description: "Deep analysis & insight extraction", tag: "Specialty" },
  { icon: <GraduationCap className="w-5 h-5" />, title: "Skill Coaching", description: "Teaching & mentoring in tech", tag: "Passion" },
];

const SkillsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black text-gradient mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            What I Do
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover over the cards to explore my skills
          </p>
        </motion.div>

        {/* Arrow buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-xl glass text-foreground hover:bg-secondary/50 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-xl glass text-foreground hover:bg-secondary/50 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-6 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {skills.map((skill, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={skill.title}
                  className="relative flex w-[20rem] min-w-[20rem] flex-col gap-3 overflow-hidden rounded-2xl glass-strong p-6 cursor-default [&>*]:flex [&>*]:items-center [&>*]:gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered ? "grayscale(0%) brightness(1.1)" : "grayscale(0%) brightness(1)",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Shine effect on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: "200%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          background: "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.08), transparent)",
                          width: "50%",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Glow border on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        boxShadow: "0 0 30px -5px hsla(0,0%,100%,0.15), inset 0 0 30px -10px hsla(0,0%,100%,0.05)",
                      }}
                    />
                  )}

                  <div>
                    <motion.span
                      className="relative z-10 text-foreground"
                      animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <p className="text-base font-bold text-foreground">{skill.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{skill.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-muted-foreground">{skill.tag}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
