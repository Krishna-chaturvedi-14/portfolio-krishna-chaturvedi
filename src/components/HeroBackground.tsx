import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

// Pixel-art cityscape silhouette component
const CityLayer = ({ 
  className = '', 
  opacity = 1, 
  yOffset = 0,
  color = 'hsl(var(--foreground))',
  buildings 
}: { 
  className?: string; 
  opacity?: number; 
  yOffset?: number;
  color?: string;
  buildings: { x: number; width: number; height: number; hasAntenna?: boolean; windows?: number }[];
}) => {
  return (
    <svg 
      className={`absolute bottom-0 left-0 w-full ${className}`}
      style={{ opacity, transform: `translateY(${yOffset}px)` }}
      viewBox="0 0 1920 400" 
      preserveAspectRatio="xMidYMax slice"
      fill="none"
    >
      {buildings.map((b, i) => (
        <g key={i}>
          {/* Building body */}
          <rect 
            x={b.x} 
            y={400 - b.height} 
            width={b.width} 
            height={b.height} 
            fill={color}
          />
          {/* LEGO studs on top */}
          {Array.from({ length: Math.floor(b.width / 20) }).map((_, j) => (
            <rect
              key={j}
              x={b.x + 5 + j * 20}
              y={400 - b.height - 8}
              width={12}
              height={8}
              rx={2}
              fill={color}
            />
          ))}
          {/* Antenna */}
          {b.hasAntenna && (
            <>
              <rect 
                x={b.x + b.width / 2 - 2} 
                y={400 - b.height - 35} 
                width={4} 
                height={30} 
                fill={color}
              />
              <circle 
                cx={b.x + b.width / 2} 
                cy={400 - b.height - 40} 
                r={5} 
                fill="hsl(var(--accent))"
                className="animate-pulse"
              />
            </>
          )}
          {/* Windows - pixel style */}
          {Array.from({ length: b.windows || 0 }).map((_, j) => {
            const row = Math.floor(j / 3);
            const col = j % 3;
            const windowSize = 10;
            const gap = 15;
            const startX = b.x + (b.width - (3 * windowSize + 2 * gap)) / 2;
            const startY = 400 - b.height + 20;
            return (
              <rect
                key={j}
                x={startX + col * (windowSize + gap)}
                y={startY + row * (windowSize + gap)}
                width={windowSize}
                height={windowSize}
                fill={Math.random() > 0.3 ? 'hsl(var(--warning) / 0.6)' : 'hsl(var(--warning) / 0.2)'}
                className={Math.random() > 0.7 ? 'animate-pulse' : ''}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
};

// Animated window lights
const WindowLights = () => {
  const [lights, setLights] = useState<{ x: number; y: number; on: boolean }[]>([]);

  useEffect(() => {
    // Generate random window positions
    const newLights = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      y: 50 + Math.random() * 40,
      on: Math.random() > 0.3
    }));
    setLights(newLights);

    // Randomly toggle lights
    const interval = setInterval(() => {
      setLights(prev => prev.map(l => ({
        ...l,
        on: Math.random() > 0.1 ? l.on : !l.on
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lights.map((light, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: light.on ? [0.3, 0.6, 0.3] : 0.1 }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          className="absolute w-1.5 h-1.5 bg-warning/80"
          style={{ left: `${light.x}%`, top: `${light.y}%` }}
        />
      ))}
    </div>
  );
};

// Moon component
const Moon = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, delay: 0.3 }}
    className="absolute top-[8%] left-[15%] md:left-[20%]"
  >
    <div className="relative">
      {/* Moon glow */}
      <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 bg-warning/20 rounded-full blur-[60px]" />
      <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 bg-warning/10 rounded-full blur-[100px] scale-150" />
      {/* Moon body */}
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-warning/40 via-warning/20 to-transparent" />
      {/* Moon texture - pixel craters */}
      <div className="absolute top-[20%] left-[30%] w-4 h-4 rounded-full bg-warning/10" />
      <div className="absolute top-[50%] left-[20%] w-3 h-3 rounded-full bg-warning/10" />
      <div className="absolute top-[35%] left-[55%] w-5 h-5 rounded-full bg-warning/10" />
    </div>
  </motion.div>
);

// Stars component
const Stars = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ 
          duration: 2 + Math.random() * 3, 
          repeat: Infinity, 
          delay: Math.random() * 2 
        }}
        className="absolute w-0.5 h-0.5 bg-foreground/60 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
        }}
      />
    ))}
  </div>
);

export const HeroBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring for parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  // Parallax transforms for different layers
  const layer1X = useTransform(springX, [0, 1], [-5, 5]);
  const layer1Y = useTransform(springY, [0, 1], [-3, 3]);
  const layer2X = useTransform(springX, [0, 1], [-10, 10]);
  const layer2Y = useTransform(springY, [0, 1], [-5, 5]);
  const layer3X = useTransform(springX, [0, 1], [-15, 15]);
  const layer3Y = useTransform(springY, [0, 1], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Building configurations for each layer
  const backBuildings = [
    { x: 0, width: 80, height: 180, hasAntenna: true, windows: 15 },
    { x: 100, width: 120, height: 250, windows: 24 },
    { x: 240, width: 60, height: 160, windows: 9 },
    { x: 320, width: 100, height: 220, hasAntenna: true, windows: 18 },
    { x: 450, width: 70, height: 190, windows: 12 },
    { x: 540, width: 130, height: 280, windows: 27 },
    { x: 700, width: 90, height: 200, hasAntenna: true, windows: 15 },
    { x: 810, width: 110, height: 240, windows: 21 },
    { x: 940, width: 60, height: 170, windows: 9 },
    { x: 1020, width: 100, height: 260, hasAntenna: true, windows: 21 },
    { x: 1140, width: 80, height: 190, windows: 12 },
    { x: 1240, width: 120, height: 230, windows: 18 },
    { x: 1380, width: 70, height: 200, hasAntenna: true, windows: 12 },
    { x: 1470, width: 100, height: 250, windows: 21 },
    { x: 1590, width: 90, height: 180, windows: 12 },
    { x: 1700, width: 110, height: 270, hasAntenna: true, windows: 24 },
    { x: 1830, width: 80, height: 210, windows: 15 },
  ];

  const midBuildings = [
    { x: 50, width: 100, height: 140, windows: 12 },
    { x: 180, width: 80, height: 120, windows: 9 },
    { x: 300, width: 140, height: 180, windows: 18 },
    { x: 480, width: 90, height: 130, windows: 9 },
    { x: 600, width: 110, height: 160, windows: 15 },
    { x: 750, width: 70, height: 110, windows: 6 },
    { x: 860, width: 120, height: 150, windows: 12 },
    { x: 1010, width: 80, height: 130, windows: 9 },
    { x: 1120, width: 100, height: 170, windows: 15 },
    { x: 1260, width: 90, height: 120, windows: 9 },
    { x: 1380, width: 130, height: 160, windows: 15 },
    { x: 1550, width: 80, height: 140, windows: 12 },
    { x: 1660, width: 100, height: 150, windows: 12 },
    { x: 1790, width: 120, height: 170, windows: 15 },
  ];

  const frontBuildings = [
    { x: 20, width: 60, height: 80, windows: 4 },
    { x: 120, width: 100, height: 100, windows: 6 },
    { x: 260, width: 70, height: 70, windows: 3 },
    { x: 370, width: 90, height: 90, windows: 6 },
    { x: 500, width: 60, height: 75, windows: 4 },
    { x: 600, width: 80, height: 85, windows: 6 },
    { x: 720, width: 110, height: 95, windows: 6 },
    { x: 870, width: 70, height: 70, windows: 3 },
    { x: 980, width: 90, height: 80, windows: 4 },
    { x: 1110, width: 60, height: 65, windows: 3 },
    { x: 1210, width: 100, height: 90, windows: 6 },
    { x: 1350, width: 70, height: 75, windows: 4 },
    { x: 1460, width: 80, height: 85, windows: 6 },
    { x: 1580, width: 100, height: 95, windows: 6 },
    { x: 1720, width: 60, height: 70, windows: 3 },
    { x: 1820, width: 90, height: 80, windows: 4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(230,35%,12%)] via-[hsl(225,40%,8%)] to-background" />
      
      {/* Atmospheric color overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Radial glows for atmosphere */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[200px]" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
      
      {/* Stars */}
      <Stars />
      
      {/* Moon */}
      <Moon />

      {/* Back city layer - slowest parallax */}
      <motion.div 
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0"
      >
        <CityLayer 
          buildings={backBuildings}
          color="hsl(var(--foreground) / 0.15)"
          opacity={0.6}
        />
        <WindowLights />
      </motion.div>

      {/* Middle city layer */}
      <motion.div 
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0"
      >
        <CityLayer 
          buildings={midBuildings}
          color="hsl(var(--foreground) / 0.25)"
          opacity={0.7}
        />
      </motion.div>

      {/* Front city layer - fastest parallax */}
      <motion.div 
        style={{ x: layer3X, y: layer3Y }}
        className="absolute inset-0"
      >
        <CityLayer 
          buildings={frontBuildings}
          color="hsl(var(--foreground) / 0.4)"
          opacity={0.9}
        />
      </motion.div>

      {/* Ground gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* TEXT READABILITY OVERLAYS - Critical for legibility */}
      {/* Central dark gradient for text area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,hsl(var(--background)/0.85)_0%,transparent_70%)]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_30%,hsl(var(--background)/0.6)_100%)]" />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
