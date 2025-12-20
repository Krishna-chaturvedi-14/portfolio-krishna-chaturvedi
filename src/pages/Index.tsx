import { Navbar } from '@/components/Navbar';
import { Section } from '@/components/Section';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { BackgroundSystem } from '@/components/BackgroundSystem';
import { SectionDivider } from '@/components/SectionDivider';
import { CustomCursor } from '@/components/CustomCursor';
import { VisitorToast } from '@/components/VisitorToast';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background snap-container no-scrollbar overflow-y-auto">
      {/* Custom LEGO Spider-Man Cursor */}
      <CustomCursor />
      
      {/* Visitor Counter Toast */}
      <VisitorToast />

      {/* Navbar */}
      <Navbar />

      {/* Layered Background System */}
      <BackgroundSystem />

      {/* Main Content */}
      <main className="relative z-10">
        <Section id="hero" className="bg-gradient-to-b from-transparent to-secondary/10">
          <Hero />
        </Section>

        <SectionDivider variant="subtle" />

        <Section id="about" className="bg-gradient-to-b from-secondary/10 via-transparent to-secondary/5">
          <About />
        </Section>

        <SectionDivider variant="accent" />

        <Section id="skills" className="bg-gradient-to-b from-secondary/5 via-primary/5 to-transparent">
          <Skills />
        </Section>

        <SectionDivider />

        <Section id="projects" className="bg-gradient-to-b from-transparent via-secondary/10 to-accent/5">
          <Projects />
        </Section>

        <SectionDivider variant="accent" />

        <Section id="experience" className="bg-gradient-to-b from-accent/5 via-transparent to-secondary/10">
          <Experience />
        </Section>

        <SectionDivider variant="subtle" />

        <Section id="contact" fullHeight={false} className="bg-gradient-to-b from-secondary/10 to-background">
          <Contact />
        </Section>
      </main>
    </div>
  );
};

export default Index;
