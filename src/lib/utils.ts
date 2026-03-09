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
  },
  {
    id: 2,
    title: "Web Development",
    description: "Crafting high-performance web apps with React, TypeScript, Tailwind & Next.js.",
    color: "rgba(37, 99, 235, 0.8)",
    iconName: "Code2",
  },
  {
    id: 3,
    title: "Full Stack Dev",
    description: "Building scalable end-to-end architectures, from frontends to server-side infra.",
    color: "rgba(22, 163, 74, 0.8)",
    iconName: "Layers",
  },
  {
    id: 4,
    title: "Vibe Coding",
    description: "Leveraging AI to accelerate prototyping and polished creative delivery.",
    color: "rgba(234, 88, 12, 0.8)",
    iconName: "Bot",
  },
  {
    id: 5,
    title: "N8N Automations",
    description: "Designing complex multi-platform automation workflows to streamline operations.",
    color: "rgba(147, 51, 234, 0.8)",
    iconName: "Workflow",
  },
  {
    id: 6,
    title: "Machine Learning",
    description: "Training predictive models, handling large datasets, and optimizing data pipelines.",
    color: "rgba(6, 182, 212, 0.8)",
    iconName: "Cpu",
  },
  {
    id: 7,
    title: "Graphic Design",
    description: "Creating compelling brand identities and high-impact visual assets.",
    color: "rgba(225, 29, 72, 0.8)",
    iconName: "Palette",
  },
  {
    id: 8,
    title: "UI/UX Design",
    description: "Crafting intuitive, user-centric interfaces through rigorous prototyping.",
    color: "rgba(79, 70, 229, 0.8)",
    iconName: "Smartphone",
  },
  {
    id: 9,
    title: "Data Scraping",
    description: "Building resilient automated data extraction systems at scale.",
    color: "rgba(5, 150, 105, 0.8)",
    iconName: "Search",
  },
  {
    id: 10,
    title: "6+ Languages",
    description: "Fluent across Python, JavaScript, TypeScript, C++, and more.",
    color: "rgba(217, 119, 6, 0.8)",
    iconName: "Terminal",
  },
  {
    id: 11,
    title: "Data Research",
    description: "Deep technical analysis to uncover trends and drive strategic decisions.",
    color: "rgba(124, 58, 237, 0.8)",
    iconName: "Globe",
  },
  {
    id: 12,
    title: "Skill Coaching",
    description: "Mentoring emerging talent through structured coaching and workshops.",
    color: "rgba(14, 165, 233, 0.8)",
    iconName: "GraduationCap",
  },
];
