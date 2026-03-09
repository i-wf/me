import { motion } from "framer-motion";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const skills = [
  { icon: <Brain className="w-4 h-4" />, title: "AI Engineering", description: "Building intelligent AI-powered systems", date: "Core Skill" },
  { icon: <Code2 className="w-4 h-4" />, title: "Web Development", description: "React, TypeScript, Tailwind & Next.js", date: "Core Skill" },
  { icon: <Layers className="w-4 h-4" />, title: "Full Stack Dev", description: "Frontend to backend, end-to-end", date: "Core Skill" },
  { icon: <Bot className="w-4 h-4" />, title: "Vibe Coding", description: "AI-assisted creative development", date: "Specialty" },
  { icon: <Workflow className="w-4 h-4" />, title: "N8N Automations", description: "Complex workflow automation", date: "Specialty" },
  { icon: <Cpu className="w-4 h-4" />, title: "Machine Learning", description: "Training models & data pipelines", date: "Core Skill" },
  { icon: <Palette className="w-4 h-4" />, title: "Graphic Design", description: "Brand identities & visual assets", date: "Creative" },
  { icon: <Smartphone className="w-4 h-4" />, title: "UI/UX Design", description: "Intuitive interfaces & user flows", date: "Creative" },
  { icon: <Search className="w-4 h-4" />, title: "Data Scraping", description: "Automated data extraction at scale", date: "Specialty" },
  { icon: <Terminal className="w-4 h-4" />, title: "6+ Languages", description: "Python, JS, TS, C++, and more", date: "Foundation" },
  { icon: <Globe className="w-4 h-4" />, title: "Data Research", description: "Deep analysis & insight extraction", date: "Specialty" },
  { icon: <GraduationCap className="w-4 h-4" />, title: "Skill Coaching", description: "Teaching & mentoring in tech", date: "Passion" },
];

// Each card offsets by translate-x and translate-y, with grayscale overlay that clears on hover
const skillCards = skills.map((skill, i) => {
  const xOffset = i * 14;  // px right
  const yOffset = i * 10;  // px down
  const isLast = i === skills.length - 1;

  // All cards except the last get a grayscale overlay
  const overlayClass = isLast
    ? ""
    : "before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0";

  return {
    icon: skill.icon,
    title: skill.title,
    description: skill.description,
    date: skill.date,
    iconClassName: "text-foreground",
    titleClassName: "text-foreground",
    className: `[grid-area:stack] hover:-translate-y-10 ${overlayClass}`,
    style: { transform: `translate(${xOffset}px, ${yOffset}px)` },
  };
});

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
          Hover over the cards to explore my skills
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center overflow-visible pb-40"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="grid [grid-template-areas:'stack'] place-items-center">
          {skillCards.map((card, index) => {
            const xOffset = index * 14;
            const yOffset = index * 10;
            const isLast = index === skillCards.length - 1;

            const overlayClass = isLast
              ? ""
              : "before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0";

            return (
              <div
                key={card.title}
                className={`[grid-area:stack] relative flex w-[22rem] flex-col gap-3 overflow-hidden rounded-xl glass p-5 transition-all duration-500 ease-out cursor-default hover:-translate-y-10 [&>*]:flex [&>*]:items-center [&>*]:gap-2 ${overlayClass}`}
                style={{
                  transform: `translate(${xOffset}px, ${yOffset}px)`,
                }}
              >
                <div>
                  <span className="relative z-10 text-foreground">{card.icon}</span>
                  <p className="text-base font-semibold text-foreground">{card.title}</p>
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">{card.description}</p>
                <p className="text-xs text-muted-foreground/60">{card.date}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
