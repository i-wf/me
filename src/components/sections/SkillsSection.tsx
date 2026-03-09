import { motion } from "framer-motion";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe, Sparkles
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const allSkillCards = [
  {
    icon: <Brain className="w-4 h-4" />,
    title: "AI Engineering",
    description: "Building intelligent AI-powered systems",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    title: "Web Development",
    description: "React, TypeScript, Tailwind & Next.js",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-8 translate-y-6 hover:-translate-y-2 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Layers className="w-4 h-4" />,
    title: "Full Stack Dev",
    description: "Frontend to backend, end-to-end solutions",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-16 translate-y-12 hover:translate-y-2 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Bot className="w-4 h-4" />,
    title: "Vibe Coding",
    description: "AI-assisted creative development",
    date: "Specialty",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-24 translate-y-18 hover:translate-y-8 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Workflow className="w-4 h-4" />,
    title: "N8N Automations",
    description: "Complex workflow automation systems",
    date: "Specialty",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-32 translate-y-24 hover:translate-y-14 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Cpu className="w-4 h-4" />,
    title: "Machine Learning",
    description: "Training models & data pipelines",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-40 translate-y-30 hover:translate-y-20 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Palette className="w-4 h-4" />,
    title: "Graphic Design",
    description: "Brand identities & visual assets",
    date: "Creative",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-48 translate-y-36 hover:translate-y-26 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Smartphone className="w-4 h-4" />,
    title: "UI/UX Design",
    description: "Intuitive interfaces & user flows",
    date: "Creative",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-56 translate-y-42 hover:translate-y-32 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Search className="w-4 h-4" />,
    title: "Data Scraping",
    description: "Automated data extraction at scale",
    date: "Specialty",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-64 translate-y-48 hover:translate-y-38 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Terminal className="w-4 h-4" />,
    title: "6+ Languages",
    description: "Python, JS, TS, C++, and more",
    date: "Foundation",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-72 translate-y-54 hover:translate-y-44 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Globe className="w-4 h-4" />,
    title: "Data Research",
    description: "Deep analysis & insight extraction",
    date: "Specialty",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-80 translate-y-60 hover:translate-y-50 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <GraduationCap className="w-4 h-4" />,
    title: "Skill Coaching",
    description: "Teaching & mentoring in tech",
    date: "Passion",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className: "[grid-area:stack] translate-x-[352px] translate-y-[264px] hover:translate-y-[224px]",
  },
];

const SkillsSection = () => (
  <section id="skills" className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">
          What I Do
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Hover over the stack to explore all my skills
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center py-10 overflow-visible"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative" style={{ minHeight: "380px", minWidth: "600px" }}>
          <DisplayCards cards={allSkillCards} />
        </div>
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
