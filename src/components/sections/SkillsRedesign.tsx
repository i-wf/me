"use client";

import { Typewriter } from "@/components/ui/typewriter";
import { MorphingCardStack, type CardData } from "@/components/ui/morphing-card-stack";
import { Marquee } from "@/components/ui/marquee";
import { cardData } from "@/lib/utils";
import {
    Brain, Code2, Layers, Zap, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap
} from 'lucide-react';

const iconMap: Record<string, any> = {
    Brain, Code2, Layers, Zap, Workflow, Cpu,
    Palette, Smartphone, Search, Terminal, Globe, GraduationCap
};

const SKILLS_CARDS: CardData[] = cardData.map(skill => ({
    id: skill.id.toString(),
    title: skill.title,
    description: skill.description,
    color: skill.color,
    certificateUrl: (skill as any).certificateUrl,
    icon: (() => {
        const Icon = iconMap[skill.iconName] || Code2;
        return <Icon className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />;
    })()
}));

const SkillsRedesign = () => {
    return (
        <section id="arsenal" className="bg-neutral-950 py-32 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-10">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-6 mb-20 relative z-10">
                <div className="w-full text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                    <div className="text-zinc-800 text-3xl md:text-5xl mb-4">MY</div>
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
            <div className="py-6 border-y border-white/5 bg-zinc-900/10 backdrop-blur-xl mb-24 relative z-10">
                <Marquee duration={30} pauseOnHover>
                    {cardData.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 mx-8 group opacity-40 hover:opacity-100 transition-opacity">
                            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                                {skill.title}
                            </span>
                            <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em] ml-3">
                                Saif Medhat
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 ml-4 group-hover:bg-purple-500 transition-colors" />
                        </div>
                    ))}
                </Marquee>
            </div>

            {/* Main Interactive Stack/Grid */}
            <div className="relative z-10">
                <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
                    <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">
                        Interaction Layer v2.0
                    </p>
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter italic">
                        DRAG WITH YOUR HANDS TO VIEW MORE
                    </h3>
                </div>

                <MorphingCardStack
                    cards={SKILLS_CARDS}
                    defaultLayout="stack"
                    className="max-w-6xl"
                />
            </div>
        </section>
    );
};

export default SkillsRedesign;
