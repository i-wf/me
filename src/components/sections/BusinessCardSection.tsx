import { motion } from "framer-motion";
import MetallicBusinessCard from "@/components/ui/metallic-business-card";

const BusinessCardSection = () => {
    return (
        <section id="business-card" className="relative py-24 px-4 overflow-hidden" style={{ background: '#0a0a0a' }}>
            <div className="max-w-6xl mx-auto text-center mb-16">
                <motion.h2
                    className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    My Business Card
                </motion.h2>
                <motion.p
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    A digital representation of my professional identity. Hover to see the metallic reflections.
                </motion.p>
            </div>

            <div className="flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                    <MetallicBusinessCard
                        metal="platinum"
                        width={500}
                        name="Saif Medhat"
                        role="Full Stack Creator"
                        company="Chef Studio"
                        email="q@qn.ci"
                        website="chef.pro"
                        align="left"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default BusinessCardSection;
