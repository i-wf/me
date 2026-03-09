import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Code2, Brain, Palette, Database, Cpu, Bot,
  Globe as GlobeIcon, Workflow, Search, GraduationCap,
  Mail, Github, Linkedin, Twitter, ArrowDown, Sparkles,
  Terminal, Layers, Smartphone, Server
} from "lucide-react";
import { FallingPattern } from "@/components/ui/falling-pattern";
import ProfileCard from "@/components/ui/profile-card";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Globe } from "@/components/Globe";

const skills = [
  { icon: Brain, label: "AI Engineer", color: "from-purple-500 to-violet-600" },
  { icon: Code2, label: "Software Engineer", color: "from-blue-500 to-cyan-500" },
  { icon: Layers, label: "Full Stack Dev", color: "from-emerald-500 to-teal-500" },
  { icon: Bot, label: "Vibe Coder", color: "from-pink-500 to-rose-500" },
  { icon: Workflow, label: "N8N Automations", color: "from-amber-500 to-orange-500" },
  { icon: GraduationCap, label: "Skill Coach", color: "from-indigo-500 to-blue-500" },
  { icon: Cpu, label: "Machine Learning", color: "from-violet-500 to-purple-600" },
  { icon: Palette, label: "Graphic Designer", color: "from-rose-500 to-pink-500" },
  { icon: Smartphone, label: "UI Designer", color: "from-cyan-500 to-teal-500" },
  { icon: Search, label: "Data Scraper", color: "from-green-500 to-emerald-500" },
  { icon: Database, label: "Data Research", color: "from-sky-500 to-blue-500" },
  { icon: Terminal, label: "6+ Languages", color: "from-orange-500 to-red-500" },
];

const projectItems: CardStackItem[] = [
  {
    id: 1,
    title: "Universe Academy",
    description: "A comprehensive learning platform pushing the boundaries of education",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "AI Automation Suite",
    description: "N8N workflows that automate complex business processes",
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "ML Data Pipeline",
    description: "End-to-end machine learning pipeline for data analysis",
    imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Design System",
    description: "A complete glassmorphic design system built from scratch",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
  },
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

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Falling pattern background */}
      <FallingPattern
        color="hsl(263, 70%, 50%)"
        backgroundColor="hsl(240, 10%, 3.9%)"
        duration={120}
        blurIntensity="0.5em"
      />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Main glass card */}
          <motion.div
            className="glass-strong rounded-3xl p-8 md:p-12 lg:p-16 glow-primary"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              {/* Left content */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  15 years old • Full Stack Creator
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  <span className="text-gradient">All-in-One</span>
                  <br />
                  <span className="text-foreground">Tech</span>
                  <br />
                  <span className="text-gradient-pink">Prodigy</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  AI Engineer · Full Stack Developer · UI/Graphic Designer · 
                  ML Specialist · Automation Expert · Vibe Coder
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <a
                    href="mailto:q@qn.ci"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Contact Me
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-medium hover:bg-secondary/50 transition-colors"
                  >
                    View Work <ArrowDown className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              {/* Right - Profile Card */}
              <div className="flex justify-center lg:justify-end">
                <ProfileCard
                  name="Q"
                  role="All-in-One Tech Creator"
                  email="q@qn.ci"
                  statusText="Available for work"
                  glowText="Building the Future at 15"
                />
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-12"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== SKILLS SECTION ========== */}
      <section className="relative py-24 px-4">
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
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                  skill.color
                )}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-gradient transition-all">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== BENTO GRID SECTION ========== */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gradient-pink mb-4">
              My Arsenal
            </h2>
            <p className="text-muted-foreground text-lg">
              Tools, technologies, and capabilities I bring to every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
            {/* AI & ML - Large */}
            <motion.div
              className="md:col-span-4 md:row-span-2 glass rounded-2xl p-8 relative overflow-hidden group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="relative z-10">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">AI & Machine Learning</h3>
                <p className="text-muted-foreground max-w-md">
                  Building intelligent systems, training models, and creating AI-powered applications 
                  that solve real-world problems.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-60 h-60 opacity-20 group-hover:opacity-30 transition-opacity">
                <Globe className="w-full h-full" />
              </div>
            </motion.div>

            {/* Frontend */}
            <motion.div
              className="md:col-span-2 glass rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Code2 className="w-7 h-7 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-foreground">Frontend</h3>
              <p className="text-sm text-muted-foreground mt-1">React, TypeScript, Tailwind, Next.js</p>
            </motion.div>

            {/* Backend */}
            <motion.div
              className="md:col-span-2 glass rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Server className="w-7 h-7 text-blue-400 mb-3" />
              <h3 className="text-lg font-bold text-foreground">Backend</h3>
              <p className="text-sm text-muted-foreground mt-1">Node.js, Python, APIs, Databases</p>
            </motion.div>

            {/* Automation */}
            <motion.div
              className="md:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Workflow className="w-7 h-7 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-foreground">N8N Automations</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Building complex automation workflows that save hundreds of hours
              </p>
            </motion.div>

            {/* Design */}
            <motion.div
              className="md:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Palette className="w-7 h-7 text-pink-400 mb-3" />
              <h3 className="text-lg font-bold text-foreground">UI & Graphic Design</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Creating stunning visuals and intuitive user interfaces
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS SECTION ========== */}
      <section id="projects" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              Some of the things I've built and worked on
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CardStack
              items={projectItems}
              autoAdvance
              intervalMs={3500}
              cardWidth={480}
              cardHeight={300}
            />
          </motion.div>
        </div>
      </section>

      {/* ========== EDUCATION & CONTACT ========== */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Education */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Education</h3>
            <p className="text-muted-foreground">Currently in High School</p>
            <p className="text-sm text-muted-foreground mt-2">
              Self-taught across 6+ programming languages, AI/ML, design, and automation
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h3>
            <a
              href="mailto:q@qn.ci"
              className="text-primary hover:underline text-lg"
            >
              q@qn.ci
            </a>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Built with passion by <span className="text-gradient font-semibold">Q</span> · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
