"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist, InsightX",
    description:
      "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions. Their dashboarding capabilities went above and beyond our expectations.",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product, NovaLabs",
    description:
      "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

export interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  className?: string;
}

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  className,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex items-stretch gap-0 relative">
        {/* Avatar */}
        <div className="relative z-10 flex-shrink-0 -mr-12 self-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-border shadow-2xl"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 pl-16"
            >
              <h3 className="text-xl font-bold text-foreground">
                {currentTestimonial.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {currentTestimonial.title}
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {currentTestimonial.description}
              </p>
              <div className="flex gap-3 mt-5">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url || "#"}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-border"
          >
            <img
              src={currentTestimonial.imageUrl}
              alt={currentTestimonial.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <h3 className="text-lg font-bold text-foreground">
              {currentTestimonial.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {currentTestimonial.title}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              {currentTestimonial.description}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              {socialIcons.map(({ icon: IconComponent, url, label }) => (
                <a
                  key={label}
                  href={url || "#"}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={label}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full glass hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                idx === currentIndex
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full glass hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
