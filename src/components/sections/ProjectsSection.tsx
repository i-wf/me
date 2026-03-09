import { motion } from "framer-motion";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";

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
);

export default ProjectsSection;
