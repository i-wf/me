import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "AI Engineering",
    description: "Architecting state-of-the-art AI systems and integrating LLMs into production workflows.",
    color: "rgba(220, 38, 38, 0.8)",
    iconName: "Brain",
    certificateUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 2,
    title: "Web Development",
    description: "Crafting high-performance web apps with React, TypeScript, Tailwind & Next.js.",
    color: "rgba(37, 99, 235, 0.8)",
    iconName: "Code2",
    certificateUrl: "https://images.unsplash.com/photo-1589330694653-96b6f366113b?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 3,
    title: "Full Stack Dev",
    description: "Building scalable end-to-end architectures, from frontends to server-side infra.",
    color: "rgba(22, 163, 74, 0.8)",
    iconName: "Layers",
    certificateUrl: "https://images.unsplash.com/photo-1523240715636-22442436402f?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 4,
    title: "Vibe Coder",
    description: "Master of intuitive, high-speed development using Claude Code, OpenClaw, and the latest SOTA AI sources. Focusing on product vibes and rapid iteration.",
    color: "hsl(280, 70%, 50%)",
    iconName: "Zap",
    certificateUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 5,
    title: "N8N Automations",
    description: "Designing complex multi-platform automation workflows to streamline operations.",
    color: "rgba(147, 51, 234, 0.8)",
    iconName: "Workflow",
    certificateUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 6,
    title: "Machine Learning",
    description: "Training predictive models, handling large datasets, and optimizing data pipelines.",
    color: "rgba(6, 182, 212, 0.8)",
    iconName: "Cpu",
    certificateUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 7,
    title: "Graphic Design",
    description: "Creating compelling brand identities and high-impact visual assets.",
    color: "rgba(225, 29, 72, 0.8)",
    iconName: "Palette",
    certificateUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 8,
    title: "UI/UX Design",
    description: "Crafting intuitive, user-centric interfaces through rigorous prototyping.",
    color: "rgba(79, 70, 229, 0.8)",
    iconName: "Smartphone",
    certificateUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 9,
    title: "Data Scraping",
    description: "Building resilient automated data extraction systems at scale.",
    color: "rgba(5, 150, 105, 0.8)",
    iconName: "Search",
    certificateUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 10,
    title: "6+ Languages",
    description: "Fluent across Python, JavaScript, TypeScript, C++, and more.",
    color: "rgba(217, 119, 6, 0.8)",
    iconName: "Terminal",
    certificateUrl: "https://images.unsplash.com/photo-1629904853716-f0bc54976a2c?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 11,
    title: "Data Research",
    description: "Deep technical analysis to uncover trends and drive strategic decisions.",
    color: "rgba(124, 58, 237, 0.8)",
    iconName: "Globe",
    certificateUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: 12,
    title: "Skill Coaching",
    description: "Mentoring emerging talent through structured coaching and workshops.",
    color: "rgba(14, 165, 233, 0.8)",
    iconName: "GraduationCap",
    certificateUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300&h=200",
  },
];
