import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LegoStuds } from './LegoStuds';
import { Eye, X, ExternalLink, Github } from 'lucide-react';
import { WebAvatar } from './avatars/WebAvatar';
import { ControlAvatar } from './avatars/ControlAvatar';

interface PlayerCardProps {
  title: string;
  icon: ReactNode;
  shortDescription: string;
  metadata?: string[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  delay?: number;
  avatarType?: 'web' | 'control';
  // Detail view props
  fullDescription?: string;
  details?: string[];
  technologies?: string[];
  links?: { label: string; url: string; type?: 'github' | 'live' }[];
  detailMetadata?: { label: string; value: string }[];
}

const colorClasses = {
  red: {
    bg: 'bg-accent',
    border: 'border-accent',
    text: 'text-accent-foreground',
    shadow: 'shadow-lego',
  },
  yellow: {
    bg: 'bg-success',
    border: 'border-success',
    text: 'text-success-foreground',
    shadow: 'shadow-lego',
  },
  blue: {
    bg: 'bg-primary',
    border: 'border-primary',
    text: 'text-primary-foreground',
    shadow: 'shadow-lego',
  },
  green: {
    bg: 'bg-success',
    border: 'border-success',
    text: 'text-success-foreground',
    shadow: 'shadow-lego',
  },
  orange: {
    bg: 'bg-accent',
    border: 'border-accent',
    text: 'text-accent-foreground',
    shadow: 'shadow-lego',
  },
};

export const PlayerCard = ({
  title,
  icon,
  shortDescription,
  metadata = [],
  color,
  delay = 0,
  avatarType = 'web',
  fullDescription,
  details = [],
  technologies = [],
  links = [],
  detailMetadata = [],
}: PlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = colorClasses[color];

  // Lock scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  // Close on ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const Avatar = avatarType === 'web' ? WebAvatar : ControlAvatar;

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay * 0.08 }}
        className="perspective-1000"
      >
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            rotateY: isHovered ? 6 : 0,
            rotateX: isHovered ? -3 : 0,
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`relative overflow-hidden rounded-md ${colors.bg} ${colors.text} ${colors.shadow} cursor-pointer transition-shadow duration-200`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <LegoStuds rows={1} cols={3} color="rgba(255,255,255,0.2)" />
          
          {/* Card Content */}
          <div className="p-5 pt-8">
            {/* Animated Avatar */}
            <motion.div 
              className="mb-3 flex items-center justify-center"
              animate={{
                y: isHovered ? -4 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="w-14 h-14 rounded-md bg-background/20 backdrop-blur-sm flex items-center justify-center">
                <Avatar isHovered={isHovered} size={36} />
              </div>
            </motion.div>

            {/* Title */}
            <h3 className="font-display text-sm text-center mb-2 font-semibold leading-snug">{title}</h3>

            {/* Hover Content - Slides in from below */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm opacity-90 mb-3 text-center">{shortDescription}</p>
                  
                  {metadata.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {metadata.slice(0, 3).map((tag, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-2 py-1 text-xs font-mono bg-background/20 rounded"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(true);
                    }}
                    className="w-full py-2 px-4 bg-background/30 hover:bg-background/40 rounded font-body text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={14} />
                    View Details
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom decoration */}
          <div className="h-1.5 bg-background/10" />
        </motion.div>
      </motion.div>

      {/* Expanded Detail Card Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/85 backdrop-blur-md" 
            />

            {/* Expanded Card - emerges from the original */}
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                y: 50,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                y: 30,
              }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-lg ${colors.shadow}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Header - same color as original card */}
              <div className={`relative p-6 ${colors.bg} ${colors.text}`}>
                <LegoStuds rows={1} cols={5} color="rgba(255,255,255,0.2)" />
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-2 rounded-md bg-background/20 hover:bg-background/30 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={18} />
                </motion.button>

                <div className="flex items-center gap-4 pt-4">
                  <motion.div 
                    className="w-16 h-16 rounded-lg bg-background/20 flex items-center justify-center"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Avatar isHovered={true} size={44} />
                  </motion.div>
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-display text-xl leading-snug font-semibold"
                    >
                      {title}
                    </motion.h2>
                    {detailMetadata.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-3 mt-2"
                      >
                        {detailMetadata.map((item, i) => (
                          <div key={i} className="text-sm font-mono opacity-90">
                            <span className="opacity-70">{item.label}:</span> {item.value}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-card overflow-y-auto max-h-[50vh]">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-body text-foreground leading-relaxed mb-6"
                >
                  {fullDescription || shortDescription}
                </motion.p>

                {details.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h4 className="font-display text-sm text-muted-foreground mb-3 font-semibold uppercase tracking-wide">Highlights</h4>
                    <ul className="space-y-2">
                      {details.map((detail, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                          className="flex items-start gap-3 font-body text-sm text-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {technologies.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h4 className="font-display text-sm text-muted-foreground mb-3 font-semibold uppercase tracking-wide">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + i * 0.03 }}
                          className="px-3 py-1.5 bg-muted text-foreground rounded-md font-mono text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {links.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-3"
                  >
                    {links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-lego hover:-translate-y-0.5"
                      >
                        {link.type === 'github' ? <Github size={14} /> : <ExternalLink size={14} />}
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer decoration */}
              <div className="h-2 bg-muted baseplate-pattern" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
