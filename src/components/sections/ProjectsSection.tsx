"use client";

import { motion } from "framer-motion";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

// ✏️ EDIT YOUR PROJECTS HERE
const projectItems: CardStackItem[] = [
  {
    id: 1,
    title: "Universe Academy",
    description: "A comprehensive learning platform pushing the boundaries of education",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    title: "AI Automation Suite",
    description: "N8N workflows that automate complex business processes",
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "ML Data Pipeline",
    description: "End-to-end machine learning pipeline for data analysis",
    imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "Design System",
    description: "A complete glassmorphic design system built from scratch",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop",
    href: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="relative py-32 bg-black border-y border-white/5 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
          Participated Work
        </h2>
        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-4">
          Navigating through my selected works and contributions
        </p>
      </motion.div>
    </div>

    <div className="flex justify-center items-center py-10 px-4 md:px-0 mt-10">
      <div className="w-full max-w-[95vw] md:max-w-none flex justify-center">
        <CardStack
          items={projectItems}
          autoAdvance
          intervalMs={4000}
          // Responsive sizing optimized for phone and desktop
          cardWidth={typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 520}
          cardHeight={typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 320}
          overlap={0.5}
          spreadDeg={35}
          depthPx={100}
        />
      </div>
    </div>
  </section>
);

export default ProjectsSection;
