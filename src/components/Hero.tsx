import { motion, useAnimation } from 'framer-motion';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';
import { PersonalAvatar } from './avatars/PersonalAvatar';
import { HeroBackground } from './HeroBackground';
import { useEffect, useState } from 'react';

// Typing animation component
const TypeWriter = ({ 
  text, 
  delay = 0, 
  className = '',
  onComplete
}: { 
  text: string; 
  delay?: number; 
  className?: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
        />
      )}
    </span>
  );
};

// Staggered text reveal
const StaggerReveal = ({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: string; 
  delay?: number; 
  className?: string;
}) => {
  const words = children.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            delay: delay + i * 0.1,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const Hero = () => {
  const [showTagline, setShowTagline] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const controls = useAnimation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    });
  }, [controls]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Atmospheric Cityscape Background */}
      <HeroBackground />

      {/* Floating Avatar - Top area */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-[12%] md:top-[15%] right-[10%] md:right-[15%] z-20"
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          <div className="relative">
            {/* Glow behind avatar */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-150" />
            <PersonalAvatar size="lg" />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content - Free floating, centered */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-16 md:pt-0">
        {/* Greeting Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2.5 bg-muted/50 backdrop-blur-sm text-foreground/80 rounded-full font-mono text-sm tracking-wide border border-border/50">
            <TypeWriter text="// Welcome to my portfolio" delay={600} />
          </span>
        </motion.div>

        {/* Name - Large, Animated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
              className="block text-foreground/90"
            >
              Hey, I'm
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="block mt-2"
            >
              <span className="relative">
                <span className="gradient-text text-5xl md:text-7xl lg:text-8xl">Krishna</span>
                {/* Underline accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 0.5, ease: 'easeOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-success to-primary rounded-full origin-left"
                />
              </span>
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          onAnimationComplete={() => setShowTagline(true)}
          className="font-body text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed"
        >
          {showTagline ? (
            <StaggerReveal delay={0}>
              Building intelligent systems with precision and purpose.
            </StaggerReveal>
          ) : (
            <span className="opacity-0">Building intelligent systems with precision and purpose.</span>
          )}
        </motion.p>

        {/* Role Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          onAnimationComplete={() => setShowRoles(true)}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {[
            { label: 'ML Engineer', color: 'success' },
            { label: 'Data Scientist', color: 'accent' },
            { label: 'AI Enthusiast', color: 'primary' },
          ].map((role, i) => (
            <motion.span
              key={role.label}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 3.4 + i * 0.15, duration: 0.4 }}
              className={`px-4 py-2 rounded-full font-mono text-sm font-medium backdrop-blur-sm border
                ${role.color === 'success' ? 'bg-success/10 text-success border-success/20' : ''}
                ${role.color === 'accent' ? 'bg-accent/10 text-accent border-accent/20' : ''}
                ${role.color === 'primary' ? 'bg-primary/20 text-foreground border-primary/30' : ''}
              `}
            >
              {role.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 bg-accent text-accent-foreground rounded-lg font-body font-semibold text-sm uppercase tracking-wide overflow-hidden transition-shadow hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Briefcase size={18} />
              View My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-muted/50 backdrop-blur-sm text-foreground border border-border rounded-lg font-body font-semibold text-sm uppercase tracking-wide hover:bg-muted/70 transition-all hover:border-accent/50"
          >
            <span className="flex items-center gap-2">
              <Mail size={18} />
              Contact Me
            </span>
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
};
