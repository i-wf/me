import { motion } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";

// ✏️ EDIT YOUR PROJECTS HERE - change title, description, and imageSrc
const projectItems: CardStackItem[] = [
  {
    id: 1,
    title: "Universe Academy",                    // ← Change project name
    description: "A comprehensive learning platform pushing the boundaries of education",  // ← Change description
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",  // ← Change image URL
  },
  {
    id: 2,
    title: "AI Automation Suite",                 // ← Change project name
    description: "N8N workflows that automate complex business processes",  // ← Change description
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",  // ← Change image URL
  },
  {
    id: 3,
    title: "ML Data Pipeline",                    // ← Change project name
    description: "End-to-end machine learning pipeline for data analysis",  // ← Change description
    imageSrc: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",  // ← Change image URL
  },
  {
    id: 4,
    title: "Design System",                       // ← Change project name
    description: "A complete glassmorphic design system built from scratch",  // ← Change description
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",  // ← Change image URL
  },
];

const ProjectsSection = () => (
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
        className="flex justify-center items-center overflow-hidden py-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-full max-w-[90vw] md:max-w-none flex justify-center">
          <CardStack
            items={projectItems}
            autoAdvance
            intervalMs={4000}
            // Use responsive sizing - optimized for phone
            cardWidth={typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 480}
            cardHeight={typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 300}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
