import { motion } from 'framer-motion';

export const BackgroundSystem = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Radial glow spots */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-[80px]" />
      
      {/* Grid pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating LEGO studs - subtle decoration */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-accent/20"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[45%] right-[15%] w-2 h-2 rounded-full bg-primary/30"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[20%] w-2.5 h-2.5 rounded-full bg-success/20"
        animate={{ y: [0, -12, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[70%] right-[25%] w-2 h-2 rounded-full bg-accent/15"
        animate={{ y: [0, -8, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
    </div>
  );
};
