import { cn } from "@/lib/utils";
import { MoveRight, Star } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
}

interface GridSectionProps {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: BlogPost[];
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

export const BlogPosts = ({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  onPostClick,
}: GridSectionProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4 text-center">
        {title}
      </h2>

      {backgroundLabel && (
        <span
          className={cn(
            "absolute top-0 text-[8rem] md:text-[12rem] font-black text-foreground/[0.02] select-none pointer-events-none leading-none",
            backgroundPosition === "left" ? "left-0" : "right-0"
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-12">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const {
            title: postTitle,
            category,
            imageUrl,
            views,
            readTime,
            rating = 4,
            className: postClassName,
          } = post;

          const isPrimary = index === 0;

          return (
            <div
              key={post.id}
              onClick={() => onPostClick?.(post)}
              className={cn(
                "group relative rounded-2xl overflow-hidden cursor-pointer glass transition-all duration-500 hover:scale-[1.02]",
                isPrimary && "md:col-span-2 lg:col-span-1",
                postClassName
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              <div className="relative p-6 flex flex-col justify-end min-h-[280px]">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-gradient transition-all">
                    {postTitle}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{category}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={cn(
                              "w-3 h-3",
                              idx < rating
                                ? "text-foreground fill-foreground"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({views} Views)
                      </span>
                    </div>
                    {readTime && (
                      <p className="text-xs text-muted-foreground">
                        {readTime} min read
                      </p>
                    )}
                  </div>
                </div>
                <MoveRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all mt-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
