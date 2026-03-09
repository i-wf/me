import { motion } from "framer-motion";
import { GraduationCap, Mail } from "lucide-react";
import { SocialIcons } from "@/components/ui/social-icons";
import MetallicBusinessCard from "@/components/ui/metallic-business-card";

const ContactSection = () => (
  <section id="contact" className="relative py-24 px-4 overflow-hidden">
    <div className="max-w-4xl mx-auto mb-16">
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
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

    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      <motion.div
        className="glass rounded-2xl p-8"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <GraduationCap className="w-8 h-8 text-foreground mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Education</h3>
        <p className="text-muted-foreground">Currently in High School</p>
        <p className="text-sm text-muted-foreground mt-2">
          Self-taught across 6+ programming languages, AI/ML, design, and automation
        </p>
      </motion.div>

      <motion.div
        className="glass rounded-2xl p-8"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Mail className="w-8 h-8 text-foreground mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h3>
        <a
          href="mailto:q@qn.ci"
          className="text-foreground hover:underline text-lg"
        >
          q@qn.ci
        </a>
        <div className="mt-6">
          <SocialIcons />
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
