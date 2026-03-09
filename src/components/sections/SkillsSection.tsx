import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe
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

        <motion.div
          className="flex justify-center overflow-visible pb-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative grid [grid-template-areas:'stack'] place-items-center">
            {skills.map((skill, index) => {
              const xOffset = index * 16;
              const yOffset = index * 12;
              const isHovered = hoveredIndex === index;
              const isLast = index === skills.length - 1;

              return (
                <motion.div
                  key={skill.title}
                  className="[grid-area:stack] relative flex w-[26rem] flex-col gap-3 overflow-hidden rounded-2xl glass-strong p-6 cursor-default [&>*]:flex [&>*]:items-center [&>*]:gap-2"
                  style={{
                    zIndex: isHovered ? 50 : index,
                  }}
                  initial={{
                    x: xOffset,
                    y: yOffset,
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    x: xOffset,
                    y: isHovered ? yOffset - 60 : yOffset,
                    opacity: 1,
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered || isLast ? "grayscale(0%) brightness(1.1)" : "grayscale(80%) brightness(0.7)",
                  }}
                  transition={{
                    y: { type: "spring", stiffness: 400, damping: 25 },
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    filter: { duration: 0.3 },
                    opacity: { delay: index * 0.05, duration: 0.5 },
                  }}
                  whileInView={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                  viewport={{ once: true }}
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
