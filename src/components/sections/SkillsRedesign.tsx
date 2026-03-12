"use client";

import { motion } from "framer-motion";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { Marquee } from "@/components/ui/marquee";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { cardData } from "@/lib/utils";

const SKILLS_ITEMS: FocusRailItem[] = cardData.map(skill => ({
    id: skill.id,
    title: skill.title,
    description: skill.description,
    meta: "Verified Skill",
    imageSrc: (skill as any).certificateUrl || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    href: "#",
}));

const SkillsRedesign = () => {
    return (
        <section id="skills-redesign" className="bg-neutral-950">
            {/* Parallax Header */}
            <ParallaxComponent />

            {/* Tags Marquee */}
            <div className="py-12 border-y border-white/5 bg-neutral-900/50">
                <Marquee duration={30} pauseOnHover>
                    {cardData.map((skill, i) => (
                        <div key={i} className="flex items-center gap-4 mx-8 group">
                            <span className="text-3xl md:text-5xl font-black text-white/20 group-hover:text-white transition-colors uppercase tracking-tighter italic">
                                {skill.title}
                            </span>
                            <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-purple-500 scale-150 transition-all" />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Focus Rail Skills Carousel */}
            <div className="py-20 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
                    <motion.h3
                        className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Professional Arsenal
                    </motion.h3>
                    <p className="text-neutral-500 font-medium mt-2 uppercase tracking-widest text-[10px]">
                        Click to expand the other skills definitely
                    </p>
                </div>

                <FocusRail
                    items={SKILLS_ITEMS}
                    autoPlay={false}
                    loop={true}
                    containerHeight="700px"
                />
            </div>
        </section>
    );
};

export default SkillsRedesign;
