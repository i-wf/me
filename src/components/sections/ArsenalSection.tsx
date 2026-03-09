import { motion } from "framer-motion";
import { Brain, Code2, Workflow, Palette, Cpu, Smartphone } from "lucide-react";
import { Globe } from "@/components/Globe";

const ArsenalSection = () => (
  <section className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-gradient-dim mb-4">
          My Arsenal
        </h2>
        <p className="text-muted-foreground text-lg">
          Tools, technologies, and capabilities I bring to every project
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
        {/* AI & ML - large card with globe */}
        <motion.div
          className="md:col-span-4 md:row-span-2 glass rounded-2xl p-8 relative overflow-hidden group"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative z-10">
            <Brain className="w-8 h-8 text-foreground mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">AI & Machine Learning</h3>
            <p className="text-muted-foreground max-w-md">
              Building intelligent systems, training models, and creating AI-powered applications 
              that solve real-world problems.
            </p>
          </div>
          <div className="absolute bottom-[-20px] right-[-20px] w-72 h-72 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
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
          <Code2 className="w-7 h-7 text-muted-foreground mb-3" />
          <h3 className="text-lg font-bold text-foreground">Web Development</h3>
          <p className="text-sm text-muted-foreground mt-1">React, TypeScript, Tailwind, Next.js</p>
        </motion.div>

        {/* UI Design */}
        <motion.div
          className="md:col-span-2 glass rounded-2xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Smartphone className="w-7 h-7 text-muted-foreground mb-3" />
          <h3 className="text-lg font-bold text-foreground">UI/UX Design</h3>
          <p className="text-sm text-muted-foreground mt-1">Figma, Adobe Suite, Prototyping</p>
        </motion.div>

        {/* N8N Automations */}
        <motion.div
          className="md:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <Workflow className="w-7 h-7 text-muted-foreground mb-3" />
          <h3 className="text-lg font-bold text-foreground">N8N Automations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Building complex automation workflows that save hundreds of hours
          </p>
        </motion.div>

        {/* Graphic Design */}
        <motion.div
          className="md:col-span-3 glass rounded-2xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Palette className="w-7 h-7 text-muted-foreground mb-3" />
          <h3 className="text-lg font-bold text-foreground">Graphic Design</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Creating stunning visuals and brand identities
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ArsenalSection;
