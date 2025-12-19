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
  red: 'bg-lego-red text-lego-white border-lego-red',
  yellow: 'bg-lego-yellow text-lego-black border-lego-yellow',
  blue: 'bg-lego-blue text-lego-white border-lego-blue',
  green: 'bg-lego-green text-lego-white border-lego-green',
  orange: 'bg-lego-orange text-lego-white border-lego-orange',
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
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-card rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className={`relative p-6 ${colorClasses[color]}`}>
              <LegoStuds rows={1} cols={5} color="rgba(255,255,255,0.3)" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-lego-white/20 hover:bg-lego-white/30 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 pt-4">
                <div className="w-16 h-16 rounded-xl bg-lego-white/20 flex items-center justify-center text-3xl">
                  {icon}
                </div>
                <h2 className="font-display text-lg leading-relaxed">{title}</h2>
              </div>

              {metadata.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {metadata.map((item, i) => (
                    <div key={i} className="text-sm font-body opacity-90">
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
                  <h4 className="font-display text-xs text-muted-foreground mb-3">HIGHLIGHTS</h4>
                  <ul className="space-y-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-sm text-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-display text-xs text-muted-foreground mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-muted text-foreground rounded-lg font-body text-sm"
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
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-body text-sm font-medium hover:opacity-90 transition-opacity shadow-lego hover:-translate-y-0.5"
                    >
                      {link.type === 'github' ? <Github size={16} /> : <ExternalLink size={16} />}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer decoration */}
            <div className="h-3 bg-muted baseplate-pattern" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
