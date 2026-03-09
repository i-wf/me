import { FolderStack } from "@/components/ui/folder-stack";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Particle Typography Header */}
        <div className="w-full min-h-[300px] flex items-center justify-center mb-8 relative z-50">
          <CursorDrivenParticleTypography
            text="My Skills"
            fontSize={140}
            particleDensity={5}
            dispersionStrength={20}
            color="#ffffff"
          />
        </div>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-16 relative z-50">
          Click the cards to shuffle through my expertise — a deck of high-performance technical skills.
        </p>
      </div>

      {/* Folder Stacking Cards */}
      <div className="relative z-10">
        <FolderStack />
      </div>
    </section>
  );
};

export default SkillsSection;
