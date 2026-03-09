import { StackedCards } from "@/components/ui/glass-cards";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particles-typography";

const SkillsSection = () => {
  return (
    <section id="skills" className="relative" style={{ background: '#0a0a0a' }}>
      {/* Particle Typography Header */}
      <div style={{
        height: '70vh',
        width: '100%',
        display: 'grid',
        placeContent: 'center',
        position: 'relative',
        color: '#ffffff'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }} />
        <div className="relative z-10 text-center px-4">
          <div className="w-full min-h-[300px] flex items-center justify-center">
            <CursorDrivenParticleTypography
              text="My Skills"
              fontSize={140}
              particleDensity={5}
              dispersionStrength={20}
              color="#ffffff"
            />
          </div>
          <p className="text-muted-foreground text-lg mt-4">
            Scroll down to explore my expertise 👇
          </p>
        </div>
      </div>

      {/* Stacking Glass Cards */}
      <StackedCards />
    </section>
  );
};

export default SkillsSection;
