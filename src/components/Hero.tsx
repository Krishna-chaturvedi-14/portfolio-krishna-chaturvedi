import { motion, useAnimation } from 'framer-motion';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';
import { PersonalAvatar } from './avatars/PersonalAvatar';
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
      {/* Atmospheric Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-success/5" />
        
        {/* Radial glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-success/5 rounded-full blur-[200px]" />

        {/* Grid pattern - subtle technical feel */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="heroGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>

        {/* Floating LEGO blocks - environment depth */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[8%] w-16 h-10 bg-gradient-to-br from-accent/20 to-accent/5 rounded-sm border border-accent/10"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[25%] right-[12%] w-20 h-12 bg-gradient-to-br from-success/15 to-success/5 rounded-sm border border-success/10"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[30%] left-[15%] w-14 h-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-sm border border-primary/10"
        />
        <motion.div
          animate={{ 
            y: [0, 18, 0],
            rotate: [0, 8, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[25%] right-[10%] w-18 h-10 bg-gradient-to-br from-accent/15 to-accent/5 rounded-sm border border-accent/10"
        />

        {/* Particle dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 rounded-full bg-foreground/30"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 4) * 15}%`,
            }}
          />
        ))}

        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

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

      {/* Scroll indicator - Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <div className="p-2 rounded-full border border-border/50 group-hover:border-accent/50 transition-colors">
            <ArrowDown size={18} />
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};
