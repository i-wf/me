import { motion } from "framer-motion";
import { Brain, Code2, Workflow, Palette, Smartphone } from "lucide-react";
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
        <motion.h2
          className="text-4xl md:text-5xl font-black text-gradient-dim mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          My Arsenal
        </motion.h2>
        <p className="text-muted-foreground text-lg">
          Tools, technologies, and capabilities I bring to every project
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* AI & ML - large card with FULL globe */}
        <motion.div
          className="md:col-span-4 md:row-span-2 min-h-[420px] glass rounded-2xl p-8 relative overflow-hidden group"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="w-8 h-8 text-foreground mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">AI & Machine Learning</h3>
            <p className="text-muted-foreground max-w-md">
              Building intelligent systems, training models, and creating AI-powered applications 
              that solve real-world problems.
            </p>
          </div>

          {/* Full Globe */}
          <div className="absolute bottom-[-30px] right-[-30px] w-[340px] h-[340px] md:w-[400px] md:h-[400px] opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110">
            <Globe className="w-full h-full" />
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 60px -15px hsla(0,0%,100%,0.06)",
            }}
          />
        </motion.div>

        {/* Frontend */}
        <motion.div
          className="md:col-span-2 min-h-[200px] glass rounded-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Code2 className="w-7 h-7 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
          <h3 className="text-lg font-bold text-foreground">Web Development</h3>
          <p className="text-sm text-muted-foreground mt-1">React, TypeScript, Tailwind, Next.js</p>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* UI Design */}
        <motion.div
          className="md:col-span-2 min-h-[200px] glass rounded-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }}
        >
          <Smartphone className="w-7 h-7 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
          <h3 className="text-lg font-bold text-foreground">UI/UX Design</h3>
          <p className="text-sm text-muted-foreground mt-1">Figma, Adobe Suite, Prototyping</p>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* N8N Automations */}
        <motion.div
          className="md:col-span-3 min-h-[200px] glass rounded-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, y: -4 }}
        >
          <Workflow className="w-7 h-7 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
          <h3 className="text-lg font-bold text-foreground">N8N Automations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Building complex automation workflows that save hundreds of hours
          </p>
        </motion.div>

        {/* Graphic Design */}
        <motion.div
          className="md:col-span-3 min-h-[200px] glass rounded-2xl p-6 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -4 }}
        >
          <Palette className="w-7 h-7 text-muted-foreground mb-3 group-hover:text-foreground transition-colors" />
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
