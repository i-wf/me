import { Typewriter } from "@/components/ui/typewriter";
import { SkillsGrid } from "@/components/ui/skills-grid";
import { Marquee } from "@/components/ui/marquee";
import { cardData } from "@/lib/utils";

const SkillsRedesign = () => {
    return (
        <section id="arsenal" className="bg-neutral-950 py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-6 mb-16 relative z-10">
                <div className="w-full text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                    <span className="text-zinc-700 block text-2xl md:text-4xl mb-2">MY</span>
                    <Typewriter
                        text={["SKILLS", "WORK", "LOVE", "HOBBY"]}
                        speed={100}
                        className="text-white italic"
                        waitTime={2000}
                        deleteSpeed={60}
                        cursorChar={"_"}
                    />
                </div>
            </div>

            {/* Small Discrete Marquee */}
            <div className="py-4 border-y border-white/5 bg-neutral-900/10 backdrop-blur-md mb-16 relative z-10">
                <Marquee duration={30} pauseOnHover>
                    {cardData.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 mx-6 group opacity-30 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                                {skill.title}
                            </span>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.2em] ml-2">
                                · Saif Medhat ·
                            </span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Main Interactive Grid */}
            <div className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 mb-10 text-center md:text-left">
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] ml-4">
                        Select a capability to view details definitely
                    </p>
                </div>

                <SkillsGrid items={cardData} />
            </div>
        </section>
    );
};

export default SkillsRedesign;
