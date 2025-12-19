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
    bg: 'bg-lego-red',
    border: 'border-lego-red',
    text: 'text-lego-white',
    shadow: 'shadow-[0_6px_0_hsl(0,60%,40%)]',
    hoverShadow: 'hover:shadow-[0_8px_0_hsl(0,60%,35%)]',
  },
  yellow: {
    bg: 'bg-lego-yellow',
    border: 'border-lego-yellow',
    text: 'text-lego-black',
    shadow: 'shadow-[0_6px_0_hsl(45,80%,40%)]',
    hoverShadow: 'hover:shadow-[0_8px_0_hsl(45,80%,35%)]',
  },
  blue: {
    bg: 'bg-lego-blue',
    border: 'border-lego-blue',
    text: 'text-lego-white',
    shadow: 'shadow-[0_6px_0_hsl(210,70%,35%)]',
    hoverShadow: 'hover:shadow-[0_8px_0_hsl(210,70%,30%)]',
  },
  green: {
    bg: 'bg-lego-green',
    border: 'border-lego-green',
    text: 'text-lego-white',
    shadow: 'shadow-[0_6px_0_hsl(145,50%,30%)]',
    hoverShadow: 'hover:shadow-[0_8px_0_hsl(145,50%,25%)]',
  },
  orange: {
    bg: 'bg-lego-orange',
    border: 'border-lego-orange',
    text: 'text-lego-white',
    shadow: 'shadow-[0_6px_0_hsl(25,75%,40%)]',
    hoverShadow: 'hover:shadow-[0_8px_0_hsl(25,75%,35%)]',
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          rotateY: isHovered ? 8 : 0,
          rotateX: isHovered ? -5 : 0,
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative overflow-hidden rounded-xl ${colors.bg} ${colors.text} ${colors.shadow} ${colors.hoverShadow} cursor-pointer transition-shadow duration-300`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <LegoStuds rows={1} cols={3} color="rgba(255,255,255,0.4)" />
        
        {/* Card Content */}
        <div className="p-6 pt-10">
          {/* Icon */}
          <div className="mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-lg bg-lego-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-sm text-center mb-2 leading-relaxed">{title}</h3>

          {/* Hover Content */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm opacity-90 mb-3 text-center">{shortDescription}</p>
            
            {metadata.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {metadata.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-body bg-lego-white/20 rounded-md"
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
              className="w-full py-2 px-4 bg-lego-white/30 hover:bg-lego-white/40 rounded-md font-body text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              View Details
            </button>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <div className="h-2 bg-lego-white/10" />
      </motion.div>
    </motion.div>
  );
};
