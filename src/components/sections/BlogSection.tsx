import { motion } from "framer-motion";
import { BlogPosts } from "@/components/ui/blog-posts";

const blogPosts = [
  {
    id: 1,
    title: "How I Built an AI-Powered Learning Platform at 15",
    category: "AI Engineering",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    href: "#",
    views: 2180,
    readTime: 8,
    rating: 5,
  },
  {
    id: 2,
    title: "Automating Everything with N8N Workflows",
    category: "Automation",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop",
    href: "#",
    views: 1456,
    readTime: 12,
    rating: 4,
  },
  {
    id: 3,
    title: "Designing Glassmorphic UI Systems",
    category: "UI/UX Design",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
    href: "#",
    views: 987,
    readTime: 6,
    rating: 4,
  },
];

const BlogSection = () => (
  <section id="blog" className="relative py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <BlogPosts
          title="Articles & Insights"
          description="Sharing what I learn along the way"
          backgroundLabel="BLOG"
          backgroundPosition="left"
          posts={blogPosts}
        />
      </motion.div>
    </div>
  </section>
);

export default BlogSection;
