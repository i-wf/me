import { Typewriter } from "@/components/ui/typewriter";
import StackedArticleCards, { type ArticleItem } from "@/components/ui/stacked-article-cards";
import { Marquee } from "@/components/ui/marquee";
import { cardData } from "@/lib/utils";

const SKILLS_ITEMS: ArticleItem[] = cardData.map(skill => ({
    title: skill.title,
    subTitle: skill.description,
    url: "#",
    img: (skill as any).certificateUrl || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=200&h=200&fit=crop",
}));

const SkillsRedesign = () => {
    return (
        <section id="arsenal" className="bg-neutral-950 py-32 border-t border-white/5">
            <div className="max-w-4xl mx-auto px-6 mb-20">
                <div className="w-full text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    <span className="text-zinc-600 block mb-2 underline decoration-zinc-800 underline-offset-8">Professional</span>
                    <Typewriter
                        text={[
                            "skills",
                            "work",
                            "arsenal",
                            "capabilities",
                            "create things that make the world a better place",
                        ]}
                        speed={70}
                        className="text-white italic"
                        waitTime={1500}
                        deleteSpeed={40}
                        cursorChar={"_"}
                    />
                </div>
            </div>

            {/* Tags Marquee */}
            <div className="py-8 border-y border-white/5 bg-neutral-900/20 backdrop-blur-sm mb-20">
                <Marquee duration={40} pauseOnHover>
                    {cardData.map((skill, i) => (
                        <div key={i} className="flex items-center gap-4 mx-12 group">
                            <span className="text-2xl md:text-4xl font-black text-white/10 group-hover:text-white/40 transition-colors uppercase tracking-tighter italic">
                                {skill.title}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-cyan-500 transition-all shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Stacked Cards Section */}
            <div className="relative min-h-[400px] flex flex-col items-center justify-center py-10">
                <div className="mb-12 text-center">
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                        Click the stack to expand definitely
                    </p>
                </div>

                <StackedArticleCards items={SKILLS_ITEMS} />
            </div>
        </section>
    );
};

export default SkillsRedesign;
