import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "AI Engineering",
    description: "Building intelligent AI-powered systems and integrations",
    color: "rgba(99, 102, 241, 0.8)",
  },
  {
    id: 2,
    title: "Web Development",
    description: "React, TypeScript, Tailwind & Next.js applications",
    color: "rgba(59, 130, 246, 0.8)",
  },
  {
    id: 3,
    title: "Full Stack Dev",
    description: "Frontend to backend, end-to-end product delivery",
    color: "rgba(16, 185, 129, 0.8)",
  },
  {
    id: 4,
    title: "Vibe Coding",
    description: "AI-assisted creative development workflows",
    color: "rgba(236, 72, 153, 0.8)",
  },
  {
    id: 5,
    title: "N8N Automations",
    description: "Complex workflow automation and integrations",
    color: "rgba(245, 158, 11, 0.8)",
  },
  {
    id: 6,
    title: "Machine Learning",
    description: "Training models & data pipelines at scale",
    color: "rgba(139, 92, 246, 0.8)",
  },
  {
    id: 7,
    title: "Graphic Design",
    description: "Brand identities & visual assets creation",
    color: "rgba(244, 63, 94, 0.8)",
  },
  {
    id: 8,
    title: "UI/UX Design",
    description: "Intuitive interfaces & user flow design",
    color: "rgba(14, 165, 233, 0.8)",
  },
  {
    id: 9,
    title: "Data Scraping",
    description: "Automated data extraction at scale",
    color: "rgba(34, 197, 94, 0.8)",
  },
  {
    id: 10,
    title: "6+ Languages",
    description: "Python, JS, TS, C++, and more",
    color: "rgba(251, 146, 60, 0.8)",
  },
  {
    id: 11,
    title: "Data Research",
    description: "Deep analysis & insight extraction",
    color: "rgba(168, 85, 247, 0.8)",
  },
  {
    id: 12,
    title: "Skill Coaching",
    description: "Teaching & mentoring in tech",
    color: "rgba(56, 189, 248, 0.8)",
  },
];

