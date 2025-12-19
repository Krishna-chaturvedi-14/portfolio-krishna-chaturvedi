import { motion } from 'framer-motion';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';
import { LegoStuds } from './LegoStuds';
import { PersonalAvatar } from './avatars/PersonalAvatar';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background decorative blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-20 h-12 bg-accent/10 rounded-md"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-40 right-20 w-24 h-14 bg-success/10 rounded-md"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-40 left-20 w-16 h-10 bg-primary/20 rounded-md"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-32 right-32 w-20 h-12 bg-accent/10 rounded-md"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-card rounded-lg p-8 md:p-12 shadow-lego border border-border"
        >
          <LegoStuds rows={1} cols={6} color="hsl(var(--accent))" className="opacity-30" />

          {/* Personal Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <PersonalAvatar size="lg" />
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-muted text-foreground rounded-md font-body text-sm font-medium">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 font-bold"
          >
            Hey, I'm{' '}
            <span className="gradient-text">Krishna</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Building intelligent systems with precision and purpose.
            <br className="hidden md:block" />
            <span className="text-success font-medium">ML Engineer</span> · <span className="text-accent font-medium">Data Scientist</span> · <span className="text-foreground font-medium">AI Enthusiast</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="lego-btn bg-accent text-accent-foreground flex items-center gap-2"
            >
              <Briefcase size={16} />
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="lego-btn bg-muted text-foreground flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
            className="p-3 rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
