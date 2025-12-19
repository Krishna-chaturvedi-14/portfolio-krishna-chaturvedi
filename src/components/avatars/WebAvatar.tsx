import { motion } from 'framer-motion';

interface WebAvatarProps {
  isHovered?: boolean;
  size?: number;
}

export const WebAvatar = ({ isHovered = false, size = 40 }: WebAvatarProps) => {
  const nodeCount = 6;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i * 2 * Math.PI) / nodeCount - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      {/* Connection lines */}
      {nodes.map((node, i) => (
        <motion.line
          key={`line-center-${i}`}
          x1={centerX}
          y1={centerY}
          x2={node.x}
          y2={node.y}
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
          strokeOpacity={0.4}
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: 1,
            strokeOpacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}

      {/* Outer connections */}
      {nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodeCount];
        return (
          <motion.line
            key={`line-outer-${i}`}
            x1={node.x}
            y1={node.y}
            x2={nextNode.x}
            y2={nextNode.y}
            stroke="hsl(var(--accent))"
            strokeWidth={1}
            strokeOpacity={0.3}
            animate={{
              strokeOpacity: isHovered ? 0.6 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      {/* Center node */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={size * 0.12}
        fill="hsl(var(--primary))"
        animate={{
          scale: isHovered ? [1, 1.15, 1] : [1, 1.08, 1],
        }}
        transition={{
          duration: isHovered ? 1.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={size * 0.06}
          fill="hsl(var(--accent))"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
            opacity: isHovered ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: isHovered ? 1.2 : 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Pulse ring */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={1}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </motion.svg>
  );
};
