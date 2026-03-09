import { motion } from "framer-motion";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

const TestimonialsSection = () => (
  <section className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-gradient-dim mb-4">
          Testimonials
        </h2>
        <p className="text-muted-foreground text-lg">
          What people say about working with me
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <TestimonialCarousel />
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;
