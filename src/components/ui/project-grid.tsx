"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Folder, FileText, Shield, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    title: string;
    updatedAt: string;
    icon: React.ReactNode;
    href?: string;
    className?: string;
}

const ProjectCard = ({ title, updatedAt, icon, href, className }: ProjectCardProps) => (
    <motion.a
        href={href || "#"}
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        whileTap={{ scale: 0.98 }}
        className={cn(
            "group relative flex items-center gap-6 p-8 rounded-[32px] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl transition-all duration-300",
            className
        )}
    >
        <div className="size-16 md:size-20 shrink-0 rounded-[24px] bg-zinc-800/50 border border-white/5 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>

        <div className="flex-1 min-w-0">
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-1 truncate">
                {title}
            </h4>
            <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-widest leading-none">
                Last updated: {updatedAt}
            </p>
        </div>

        <div className="shrink-0">
            <ArrowUpRight className="size-6 text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>

        {/* Glow effect matching image context */}
        <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-white to-transparent pointer-events-none" />
    </motion.a>
);

const ProjectGrid = () => {
    const projects = [
        { title: "SOPs", updatedAt: "29 April 2025", icon: <Folder className="size-8 text-orange-400" /> },
        { title: "Contracts", updatedAt: "29 April 2025", icon: <FileText className="size-8 text-blue-400" /> },
        { title: "Policies", updatedAt: "29 April 2025", icon: <Shield className="size-8 text-emerald-400" /> },
        { title: "Knowledge Base", updatedAt: "29 April 2025", icon: <Database className="size-8 text-purple-400" /> },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl mx-auto px-4">
            {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </div>
    );
};

export default ProjectGrid;
