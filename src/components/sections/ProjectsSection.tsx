import { motion } from "framer-motion";
import ProjectGrid from "@/components/ui/project-grid";

const ProjectsSection = () => (
  <section id="projects" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
    {/* Decorative background matching the 3rd image vibe */}
    <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#1a1a1c] to-transparent opacity-50" />

    <div className="max-w-6xl mx-auto px-4 mb-20 relative z-10">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
          Participated Work
        </h2>
        <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] mt-6">
          Strategic selected works · 2024 - 2025
        </p>
      </motion.div>
    </div>

    <div className="relative z-10">
      <ProjectGrid />
    </div>

    {/* Bottom glow transition */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-zinc-950 to-transparent opacity-60 pointer-events-none" />
  </section>
);

export default ProjectsSection;
