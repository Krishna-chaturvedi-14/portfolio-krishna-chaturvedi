import { motion } from 'framer-motion';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';
import { LegoStuds } from './LegoStuds';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background decorative bricks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-24 h-16 bg-lego-red/20 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-40 right-20 w-32 h-20 bg-lego-blue/20 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-40 left-20 w-20 h-12 bg-lego-yellow/30 rounded-lg"
        />
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-32 right-32 w-28 h-14 bg-lego-green/20 rounded-lg"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main brick container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-card rounded-2xl p-8 md:p-12 shadow-lego border-2 border-border"
        >
          <LegoStuds rows={1} cols={6} color="hsl(var(--primary))" className="opacity-40" />

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-body text-sm font-medium">
              👋 Welcome, Builder!
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl md:text-4xl lg:text-5xl mb-4 leading-relaxed"
          >
            Hey, I'm{' '}
            <span className="gradient-text">Krishna</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Building intelligent systems, one brick of data at a time.
            <br className="hidden md:block" />
            <span className="text-primary font-medium">ML Engineer</span> · <span className="text-accent font-medium">Data Scientist</span> · <span className="text-success font-medium">AI Enthusiast</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="lego-btn bg-primary text-primary-foreground flex items-center gap-2"
            >
              <Briefcase size={16} />
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="lego-btn bg-secondary text-secondary-foreground flex items-center gap-2"
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
          transition={{ delay: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
            className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
