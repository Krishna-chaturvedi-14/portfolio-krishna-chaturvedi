import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'default' | 'accent' | 'subtle';
}

export const SectionDivider = ({ variant = 'default' }: SectionDividerProps) => {
  const colors = {
    default: 'from-transparent via-border to-transparent',
    accent: 'from-transparent via-accent/30 to-transparent',
    subtle: 'from-transparent via-border/50 to-transparent',
  };

  return (
    <div className="relative w-full py-8">
      {/* Main line */}
      <motion.div
        className={`h-px w-full bg-gradient-to-r ${colors[variant]}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      />
      
      {/* Center LEGO stud accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-border/60" />
          <div className="w-2 h-2 rounded-full bg-accent/40" />
          <div className="w-2 h-2 rounded-full bg-border/60" />
        </div>
      </motion.div>
    </div>
  );
};
