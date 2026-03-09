import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "AI Engineering",
    description: "Architecting state-of-the-art AI systems and integrating LLMs into production workflows for intelligent automation.",
    color: "rgba(220, 38, 38, 0.9)", // Red for the top card as requested
    iconName: "Brain",
  },
  {
    id: 2,
    title: "Web Development",
    description: "Crafting high-performance web applications using the modern React ecosystem with a focus on speed and SEO.",
    color: "rgba(243, 244, 246, 0.9)", // Light grey/white
    iconName: "Code2",
  },
  {
    id: 3,
    title: "Full Stack Dev",
    description: "Building scalable end-to-end architectures, from responsive frontends to robust server-side infrastructures.",
    color: "rgba(209, 213, 219, 0.9)", // Medium grey
    iconName: "Layers",
  },
  {
    id: 4,
    title: "Vibe Coding",
    description: "Pioneering creative development cycles by leveraging AI to accelerate prototyping and polished delivery.",
    color: "rgba(156, 163, 175, 0.9)", // Darker grey
    iconName: "Bot",
  },
  {
    id: 5,
    title: "N8N Automations",
    description: "Designing complex multi-platform automation workflows to eliminate manual tasks and streamline operations.",
    color: "rgba(229, 231, 235, 0.9)", // Off-white
    iconName: "Workflow",
  },
  {
    id: 6,
    title: "Machine Learning",
    description: "Developing and training predictive models, handling large datasets, and optimizing data processing pipelines.",
    color: "rgba(107, 114, 128, 0.9)", // Dark grey
    iconName: "Cpu",
  },
  {
    id: 7,
    title: "Graphic Design",
    description: "Formulating compelling brand identities and high-impact visual assets for digital and print media.",
    color: "rgba(249, 250, 251, 0.9)", // Bright white
    iconName: "Palette",
  },
  {
    id: 8,
    title: "UI/UX Design",
    description: "Creating intuitive, user-centric interfaces and friction-less user experiences through rigorous prototyping.",
    color: "rgba(229, 231, 235, 0.9)", // Off-white
    iconName: "Smartphone",
  },
  {
    id: 9,
    title: "Data Scraping",
    description: "Implementing resilient automated data extraction systems to gather actionable insights from web sources.",
    color: "rgba(156, 163, 175, 0.9)", // Darker grey
    iconName: "Search",
  },
  {
    id: 10,
    title: "6+ Languages",
    description: "Fluent in multiple programming paradigms across Python, JavaScript, TypeScript, C++, and more.",
    color: "rgba(209, 213, 219, 0.9)", // Medium grey
    iconName: "Terminal",
  },
  {
    id: 11,
    title: "Data Research",
    description: "Conducting deep technical research and analysis to uncover trends and drive strategic decisions.",
    color: "rgba(243, 244, 246, 0.9)", // Light grey
    iconName: "Globe",
  },
  {
    id: 12,
    title: "Skill Coaching",
    description: "Mentoring emerging talent and sharing technical knowledge through structured coaching and workshops.",
    color: "rgba(107, 114, 128, 0.9)", // Dark grey
    iconName: "GraduationCap",
  },
];

