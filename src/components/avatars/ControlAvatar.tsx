import { motion } from 'framer-motion';

interface ControlAvatarProps {
  isHovered?: boolean;
  size?: number;
}

export const ControlAvatar = ({ isHovered = false, size = 40 }: ControlAvatarProps) => {
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {/* Orbit path */}
      <motion.ellipse
        cx={centerX}
        cy={centerY}
        rx={size * 0.38}
        ry={size * 0.2}
        fill="none"
        stroke="hsl(var(--success))"
        strokeWidth={1}
        strokeOpacity={0.3}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Secondary orbit */}
      <motion.ellipse
        cx={centerX}
        cy={centerY}
        rx={size * 0.2}
        ry={size * 0.38}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth={1}
        strokeOpacity={0.2}
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Central orb with glow */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={size * 0.18}
        fill="url(#orbGradient)"
        animate={{
          scale: isHovered ? [1, 1.12, 1] : [1, 1.06, 1],
        }}
        transition={{
          duration: isHovered ? 1.5 : 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orbiting particle 1 */}
      <motion.circle
        cx={centerX + size * 0.38}
        cy={centerY}
        r={size * 0.05}
        fill="hsl(var(--success))"
        animate={{
          rotate: [0, 360],
          scale: isHovered ? [1, 1.3, 1] : 1,
        }}
        transition={{
          rotate: {
            duration: isHovered ? 4 : 8,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* Orbiting particle 2 */}
      <motion.circle
        cx={centerX}
        cy={centerY - size * 0.38}
        r={size * 0.04}
        fill="hsl(var(--accent))"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: isHovered ? 5 : 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      />

      {/* Gradient definition */}
      <defs>
        <radialGradient id="orbGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="hsl(var(--success))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
};
