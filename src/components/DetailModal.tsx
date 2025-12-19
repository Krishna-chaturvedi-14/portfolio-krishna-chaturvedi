import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { LegoStuds } from './LegoStuds';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: ReactNode;
  description: string;
  details?: string[];
  technologies?: string[];
  links?: { label: string; url: string; type?: 'github' | 'live' }[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  metadata?: { label: string; value: string }[];
}

const colorClasses = {
  red: 'bg-accent text-accent-foreground border-accent',
  yellow: 'bg-success text-success-foreground border-success',
  blue: 'bg-primary text-primary-foreground border-primary',
  green: 'bg-success text-success-foreground border-success',
  orange: 'bg-accent text-accent-foreground border-accent',
};

export const DetailModal = ({
  isOpen,
  onClose,
  title,
  icon,
  description,
  details = [],
  technologies = [],
  links = [],
  color,
  metadata = [],
}: DetailModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-card rounded-lg shadow-2xl border border-border"
          >
            {/* Header */}
            <div className={`relative p-6 ${colorClasses[color]}`}>
              <LegoStuds rows={1} cols={5} color="rgba(255,255,255,0.2)" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-md bg-background/20 hover:bg-background/30 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 pt-4">
                <div className="w-14 h-14 rounded-lg bg-background/20 flex items-center justify-center text-2xl">
                  {icon}
                </div>
                <h2 className="font-display text-xl leading-snug font-semibold">{title}</h2>
              </div>

              {metadata.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {metadata.map((item, i) => (
                    <div key={i} className="text-sm font-mono opacity-90">
                      <span className="opacity-70">{item.label}:</span> {item.value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <p className="font-body text-foreground leading-relaxed mb-6">{description}</p>

              {details.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-display text-sm text-muted-foreground mb-3 font-semibold uppercase tracking-wide">Highlights</h4>
                  <ul className="space-y-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-display text-sm text-muted-foreground mb-3 font-semibold uppercase tracking-wide">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-muted text-foreground rounded-md font-mono text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {links.length > 0 && (
                <div className="flex flex-wrap gap-3">
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
                </div>
              )}
            </div>

            {/* Footer decoration */}
            <div className="h-2 bg-muted baseplate-pattern" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};