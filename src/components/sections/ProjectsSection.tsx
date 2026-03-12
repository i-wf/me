import { motion } from "framer-motion";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

// ✏️ EDIT YOUR PROJECTS HERE
const projectItems: FocusRailItem[] = [
  {
    id: 1,
    title: "Universe Academy",
    description: "A comprehensive learning platform pushing the boundaries of education",
    meta: "E-Learning • UI/UX",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    title: "AI Automation Suite",
    description: "N8N workflows that automate complex business processes",
    meta: "Automation • N8N",
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "ML Data Pipeline",
    description: "End-to-end machine learning pipeline for data analysis",
    meta: "Data Science • ML",
    imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1000&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "Design System",
    description: "A complete glassmorphic design system built from scratch",
    meta: "Design • React",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop",
    href: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="relative py-32 bg-black border-y border-white/5">
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

    <div className="relative">
      <FocusRail
        items={projectItems}
        autoPlay={false}
        loop={true}
        containerHeight="600px"
      />
    </div>
  </section>
);

export default ProjectsSection;
