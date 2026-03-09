import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles } from "lucide-react";

const skills = [
  { icon: Brain, label: "AI Engineering" },
  { icon: Code2, label: "Web Development" },
  { icon: Layers, label: "Full Stack Dev" },
  { icon: Bot, label: "Vibe Coding" },
  { icon: Workflow, label: "N8N Automations" },
  { icon: GraduationCap, label: "Skill Coaching" },
  { icon: Cpu, label: "Machine Learning" },
  { icon: Palette, label: "Graphic Design" },
  { icon: Smartphone, label: "UI/UX Design" },
  { icon: Search, label: "Data Scraping" },
  { icon: Terminal, label: "6+ Languages" },
  { icon: Globe, label: "Data Research" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const displayCardData = [
  {
    icon: <Brain className="w-4 h-4" />,
    title: "AI & ML",
    description: "Training models & building intelligent systems",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    title: "Full Stack",
    description: "React, TypeScript, Python & 6+ languages",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    title: "Creative",
    description: "UI/UX, Graphic Design & Vibe Coding",
    date: "Core Skill",
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
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
          Mastering the full spectrum of technology — from AI and machine learning to design and automation
        </p>
      </motion.div>

      {/* Display Cards showcase */}
      <motion.div
        className="flex justify-center mb-20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <DisplayCards cards={displayCardData} />
      </motion.div>

      {/* Skills grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.label}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <skill.icon className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-gradient transition-all">
              {skill.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
