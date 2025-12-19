import { Navbar } from '@/components/Navbar';
import { Section } from '@/components/Section';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background snap-container no-scrollbar overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Background Pattern */}
      <div className="fixed inset-0 baseplate-pattern opacity-50 pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10">
        <Section id="hero">
          <Hero />
        </Section>

        <Section id="about">
          <About />
        </Section>

        <Section id="skills">
          <Skills />
        </Section>

        <Section id="projects">
          <Projects />
        </Section>

        <Section id="experience">
          <Experience />
        </Section>

        <Section id="contact" fullHeight={false}>
          <Contact />
        </Section>
      </main>
    </div>
  );
};

export default Index;
