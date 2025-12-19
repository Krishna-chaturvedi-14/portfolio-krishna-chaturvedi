import { motion } from 'framer-motion';
import avatarImage from '@/assets/avatar.png';

interface PersonalAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-36 h-36',
};

export const PersonalAvatar = ({ size = 'md', className = '' }: PersonalAvatarProps) => {
  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-110" />
      
      {/* Avatar container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border bg-card shadow-lego">
        <img
          src={avatarImage}
          alt="Krishna Chaturvedi"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  );
};
