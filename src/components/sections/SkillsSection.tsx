import { StackedCards } from "@/components/ui/glass-cards";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24 px-4" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Particle Typography Header */}
        <div className="w-full min-h-[400px] flex items-center justify-center mb-8">
          <CursorDrivenParticleTypography
            text="My Skills"
            fontSize={140}
            particleDensity={5}
            dispersionStrength={20}
            color="#ffffff"
          />
        </div>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-12">
          Scroll through my skills — each card stacks with a glowing glass effect
        </p>
      </div>

      {/* Glass Stacking Cards */}
      <StackedCards />
    </section>
  );
};

export default SkillsSection;
