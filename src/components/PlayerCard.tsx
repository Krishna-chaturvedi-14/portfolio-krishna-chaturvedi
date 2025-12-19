import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { LegoStuds } from './LegoStuds';
import { Eye } from 'lucide-react';

interface PlayerCardProps {
  title: string;
  icon: ReactNode;
  shortDescription: string;
  metadata?: string[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  onViewDetails: () => void;
  delay?: number;
}

const colorClasses = {
  red: {
    bg: 'bg-accent',
    border: 'border-accent',
    text: 'text-accent-foreground',
    shadow: 'shadow-lego',
    hoverShadow: 'hover:shadow-lego-hover',
  },
  yellow: {
    bg: 'bg-success',
    border: 'border-success',
    text: 'text-success-foreground',
    shadow: 'shadow-lego',
    hoverShadow: 'hover:shadow-lego-hover',
  },
  blue: {
    bg: 'bg-primary',
    border: 'border-primary',
    text: 'text-primary-foreground',
    shadow: 'shadow-lego',
    hoverShadow: 'hover:shadow-lego-hover',
  },
  green: {
    bg: 'bg-success',
    border: 'border-success',
    text: 'text-success-foreground',
    shadow: 'shadow-lego',
    hoverShadow: 'hover:shadow-lego-hover',
  },
  orange: {
    bg: 'bg-accent',
    border: 'border-accent',
    text: 'text-accent-foreground',
    shadow: 'shadow-lego',
    hoverShadow: 'hover:shadow-lego-hover',
  },
};

export const PlayerCard = ({
  title,
  icon,
  shortDescription,
  metadata = [],
  color,
  onViewDetails,
  delay = 0,
}: PlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorClasses[color];

  return (
    <motion.div
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
          y: isHovered ? -4 : 0,
          scale: isHovered ? 1.01 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative overflow-hidden rounded-md ${colors.bg} ${colors.text} ${colors.shadow} ${colors.hoverShadow} cursor-pointer transition-shadow duration-200`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <LegoStuds rows={1} cols={3} color="rgba(255,255,255,0.2)" />
        
        {/* Card Content */}
        <div className="p-5 pt-8">
          {/* Icon */}
          <div className="mb-3 flex items-center justify-center">
            <div className="w-14 h-14 rounded-md bg-background/20 backdrop-blur-sm flex items-center justify-center text-2xl">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-sm text-center mb-2 font-semibold leading-snug">{title}</h3>

          {/* Hover Content */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm opacity-90 mb-3 text-center">{shortDescription}</p>
            
            {metadata.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {metadata.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-mono bg-background/20 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
              className="w-full py-2 px-4 bg-background/30 hover:bg-background/40 rounded font-body text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={14} />
              View Details
            </button>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <div className="h-1.5 bg-background/10" />
      </motion.div>
    </motion.div>
  );
};