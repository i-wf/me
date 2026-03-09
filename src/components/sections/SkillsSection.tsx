import { motion } from "framer-motion";
import {
  Code2, Brain, Palette, Cpu, Bot,
  Workflow, Search, GraduationCap,
  Terminal, Layers, Smartphone, Globe
} from "lucide-react";

const skills = [
  { icon: Brain, title: "AI Engineering", desc: "Building intelligent AI-powered systems" },
  { icon: Code2, title: "Web Development", desc: "React, TypeScript, Tailwind & Next.js" },
  { icon: Layers, title: "Full Stack Dev", desc: "Frontend to backend, end-to-end solutions" },
  { icon: Bot, title: "Vibe Coding", desc: "AI-assisted creative development" },
  { icon: Workflow, title: "N8N Automations", desc: "Complex workflow automation systems" },
  { icon: Cpu, title: "Machine Learning", desc: "Training models & data pipelines" },
  { icon: Palette, title: "Graphic Design", desc: "Brand identities & visual assets" },
  { icon: Smartphone, title: "UI/UX Design", desc: "Intuitive interfaces & user flows" },
  { icon: Search, title: "Data Scraping", desc: "Automated data extraction at scale" },
  { icon: Terminal, title: "6+ Languages", desc: "Python, JS, TS, C++, and more" },
  { icon: Globe, title: "Data Research", desc: "Deep analysis & insight extraction" },
  { icon: GraduationCap, title: "Skill Coaching", desc: "Teaching & mentoring in tech" },
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
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="relative grid place-items-center"
          style={{ gridTemplateAreas: "'stack'", minHeight: "180px" }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            // Small vertical-only offset so cards peek out behind each other
            const yOffset = index * 3;
            const xOffset = index * 1.5;
            return (
              <motion.div
                key={skill.title}
                className="relative flex w-[22rem] flex-col gap-2 overflow-hidden rounded-xl glass p-5 cursor-default"
                style={{
                  gridArea: "stack",
                  zIndex: skills.length - index,
                }}
                initial={{ x: xOffset, y: yOffset }}
                whileHover={{
                  y: -50,
                  zIndex: 50,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-foreground" />
                  <p className="text-base font-semibold text-foreground">{skill.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{skill.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
