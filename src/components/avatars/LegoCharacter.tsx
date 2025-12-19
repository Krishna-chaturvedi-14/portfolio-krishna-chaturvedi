import { motion } from 'framer-motion';

interface LegoCharacterProps {
  type: 'developer' | 'engineer' | 'builder' | 'analyst';
  isHovered?: boolean;
  size?: number;
}

export const LegoCharacter = ({ type, isHovered = false, size = 48 }: LegoCharacterProps) => {
  const scale = size / 48;

  // Color schemes for different character types
  const colors = {
    developer: { body: 'hsl(var(--primary))', accent: 'hsl(var(--accent))', detail: 'hsl(var(--success))' },
    engineer: { body: 'hsl(var(--success))', accent: 'hsl(var(--primary))', detail: 'hsl(var(--accent))' },
    builder: { body: 'hsl(var(--accent))', accent: 'hsl(var(--success))', detail: 'hsl(var(--primary))' },
    analyst: { body: 'hsl(var(--muted))', accent: 'hsl(var(--accent))', detail: 'hsl(var(--success))' },
  };

  const c = colors[type];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className="overflow-visible"
      animate={{
        y: isHovered ? [0, -3, 0] : [0, -2, 0],
      }}
      transition={{
        duration: isHovered ? 0.8 : 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Shadow */}
      <motion.ellipse
        cx="24"
        cy="46"
        rx="10"
        ry="2"
        fill="black"
        opacity={0.2}
        animate={{
          rx: isHovered ? [10, 8, 10] : [10, 9, 10],
        }}
        transition={{
          duration: isHovered ? 0.8 : 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Legs */}
      <motion.rect
        x="16"
        y="36"
        width="6"
        height="8"
        rx="1"
        fill={c.body}
        animate={{
          rotate: isHovered ? [-3, 3, -3] : 0,
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '19px 36px' }}
      />
      <motion.rect
        x="26"
        y="36"
        width="6"
        height="8"
        rx="1"
        fill={c.body}
        animate={{
          rotate: isHovered ? [3, -3, 3] : 0,
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '29px 36px' }}
      />

      {/* Body / Torso */}
      <rect x="14" y="22" width="20" height="16" rx="2" fill={c.body} />
      
      {/* Body detail - brick lines */}
      <rect x="14" y="30" width="20" height="1" fill="black" opacity="0.15" />
      <rect x="24" y="22" width="1" height="16" fill="black" opacity="0.1" />
      
      {/* Chest detail */}
      <rect x="18" y="25" width="12" height="3" rx="0.5" fill={c.accent} opacity="0.8" />

      {/* Arms */}
      <motion.rect
        x="8"
        y="22"
        width="6"
        height="12"
        rx="2"
        fill={c.body}
        animate={{
          rotate: isHovered ? [-15, 15, -15] : [-5, 5, -5],
        }}
        transition={{
          duration: isHovered ? 0.6 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '11px 22px' }}
      />
      <motion.rect
        x="34"
        y="22"
        width="6"
        height="12"
        rx="2"
        fill={c.body}
        animate={{
          rotate: isHovered ? [15, -15, 15] : [5, -5, 5],
        }}
        transition={{
          duration: isHovered ? 0.6 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.1,
        }}
        style={{ transformOrigin: '37px 22px' }}
      />

      {/* Hands */}
      <motion.circle
        cx="11"
        cy="36"
        r="3"
        fill={c.detail}
        animate={{
          rotate: isHovered ? [-15, 15, -15] : [-5, 5, -5],
        }}
        transition={{
          duration: isHovered ? 0.6 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '11px 22px' }}
      />
      <motion.circle
        cx="37"
        cy="36"
        r="3"
        fill={c.detail}
        animate={{
          rotate: isHovered ? [15, -15, 15] : [5, -5, 5],
        }}
        transition={{
          duration: isHovered ? 0.6 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.1,
        }}
        style={{ transformOrigin: '37px 22px' }}
      />

      {/* Head */}
      <rect x="15" y="6" width="18" height="18" rx="3" fill="hsl(var(--foreground))" opacity="0.9" />
      
      {/* Face visor / glasses */}
      <rect x="17" y="12" width="14" height="4" rx="1" fill={c.accent} opacity="0.9" />
      
      {/* Eyes (behind visor) */}
      <circle cx="21" cy="14" r="1.5" fill="white" />
      <circle cx="27" cy="14" r="1.5" fill="white" />
      
      {/* Smile */}
      <path
        d="M 20 19 Q 24 22 28 19"
        stroke={c.body}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Head stud (LEGO connection) */}
      <circle cx="24" cy="4" r="3" fill={c.detail} />
      <circle cx="24" cy="4" r="2" fill={c.detail} opacity="0.7" />

      {/* Tool/accessory based on type */}
      {type === 'developer' && (
        <motion.g
          animate={{
            rotate: isHovered ? [0, 10, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
          style={{ transformOrigin: '37px 36px' }}
        >
          <rect x="40" y="30" width="6" height="8" rx="1" fill={c.accent} />
          <rect x="41" y="32" width="4" height="4" rx="0.5" fill="hsl(var(--foreground))" opacity="0.5" />
        </motion.g>
      )}
    </motion.svg>
  );
};
