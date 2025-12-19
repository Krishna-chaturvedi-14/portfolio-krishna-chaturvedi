import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// LEGO Spider-Man minifigure cursor SVG
const LegoSpiderManCursor = ({ isHovering, isClicking }: { isHovering: boolean; isClicking: boolean }) => (
  <motion.svg
    width="40"
    height="50"
    viewBox="0 0 40 50"
    animate={{
      scale: isClicking ? 0.85 : isHovering ? 1.1 : 1,
      rotate: isHovering ? [0, -3, 3, 0] : 0,
    }}
    transition={{ 
      scale: { duration: 0.1 },
      rotate: { duration: 0.3, repeat: isHovering ? Infinity : 0, repeatType: 'reverse' }
    }}
    style={{ filter: 'drop-shadow(2px 3px 4px rgba(0,0,0,0.4))' }}
  >
    {/* LEGO Minifigure - Spider-Man Style */}
    
    {/* Head */}
    <rect x="10" y="2" width="20" height="16" rx="2" fill="#c41e3a" />
    {/* Face mask pattern */}
    <rect x="12" y="4" width="16" height="12" rx="1" fill="#b01030" />
    {/* Eyes */}
    <path d="M14 8 L18 7 L18 11 L14 12 Z" fill="white" />
    <path d="M22 7 L26 8 L26 12 L22 11 Z" fill="white" />
    {/* Web pattern on head */}
    <line x1="20" y1="2" x2="20" y2="18" stroke="#8b0000" strokeWidth="0.5" />
    <line x1="10" y1="10" x2="30" y2="10" stroke="#8b0000" strokeWidth="0.5" />
    <path d="M12 4 Q20 8 28 4" stroke="#8b0000" strokeWidth="0.5" fill="none" />
    <path d="M12 14 Q20 10 28 14" stroke="#8b0000" strokeWidth="0.5" fill="none" />
    
    {/* Neck/connector */}
    <rect x="16" y="18" width="8" height="3" fill="#c41e3a" />
    
    {/* Torso */}
    <rect x="8" y="21" width="24" height="14" rx="1" fill="#c41e3a" />
    {/* Blue sides of torso */}
    <rect x="8" y="21" width="5" height="14" fill="#1e5aa8" />
    <rect x="27" y="21" width="5" height="14" fill="#1e5aa8" />
    {/* Spider emblem */}
    <ellipse cx="20" cy="27" rx="4" ry="3" fill="#1a1a1a" />
    <line x1="20" y1="24" x2="20" y2="30" stroke="#1a1a1a" strokeWidth="1" />
    <line x1="16" y1="25" x2="13" y2="23" stroke="#1a1a1a" strokeWidth="0.8" />
    <line x1="24" y1="25" x2="27" y2="23" stroke="#1a1a1a" strokeWidth="0.8" />
    <line x1="16" y1="29" x2="13" y2="31" stroke="#1a1a1a" strokeWidth="0.8" />
    <line x1="24" y1="29" x2="27" y2="31" stroke="#1a1a1a" strokeWidth="0.8" />
    {/* Web pattern on torso */}
    <line x1="20" y1="21" x2="20" y2="35" stroke="#8b0000" strokeWidth="0.3" />
    
    {/* Arms */}
    {/* Left arm */}
    <rect x="2" y="21" width="6" height="10" rx="1" fill="#c41e3a" />
    <rect x="2" y="21" width="6" height="4" fill="#1e5aa8" />
    {/* Left hand (C-grip) */}
    <path d="M2 31 L2 35 L5 35 L5 33 L4 33 L4 31 Z" fill="#f5c542" />
    
    {/* Right arm */}
    <rect x="32" y="21" width="6" height="10" rx="1" fill="#c41e3a" />
    <rect x="32" y="21" width="6" height="4" fill="#1e5aa8" />
    {/* Right hand (C-grip) */}
    <path d="M38 31 L38 35 L35 35 L35 33 L36 33 L36 31 Z" fill="#f5c542" />
    
    {/* Legs/Hips */}
    <rect x="11" y="35" width="18" height="4" fill="#1e5aa8" />
    
    {/* Left leg */}
    <rect x="11" y="39" width="8" height="9" fill="#1e5aa8" />
    {/* Left foot */}
    <rect x="9" y="48" width="10" height="2" rx="0.5" fill="#1e5aa8" />
    
    {/* Right leg */}
    <rect x="21" y="39" width="8" height="9" fill="#1e5aa8" />
    {/* Right foot */}
    <rect x="21" y="48" width="10" height="2" rx="0.5" fill="#1e5aa8" />
    
    {/* LEGO studs on head */}
    <circle cx="15" cy="1" r="2" fill="#a01828" />
    <circle cx="25" cy="1" r="2" fill="#a01828" />
  </motion.svg>
);

// Small LEGO brick for default cursor
const LegoBrickCursor = ({ isClicking }: { isClicking: boolean }) => (
  <motion.svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    animate={{
      scale: isClicking ? 0.85 : 1,
    }}
    transition={{ duration: 0.1 }}
    style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.3))' }}
  >
    {/* LEGO 2x1 Brick - Spider-Man red */}
    {/* Top face with studs */}
    <rect x="2" y="6" width="20" height="12" rx="1" fill="#c41e3a" />
    {/* Studs */}
    <ellipse cx="8" cy="6" rx="4" ry="2" fill="#a01828" />
    <ellipse cx="16" cy="6" rx="4" ry="2" fill="#a01828" />
    {/* Highlight */}
    <rect x="2" y="6" width="20" height="2" fill="#d42e4a" opacity="0.5" />
    {/* Bottom shadow */}
    <rect x="2" y="16" width="20" height="2" rx="0.5" fill="#8b0000" opacity="0.5" />
  </motion.svg>
);

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer'
      );
      
      // Check if it's a text input - revert to system cursor
      const isTextInput = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;
      
      if (isTextInput) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
        setIsHovering(isInteractive);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
        input, textarea, [contenteditable="true"] {
          cursor: text !important;
        }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: isHovering ? '-50%' : '-30%',
          translateY: '-30%',
        }}
      >
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={isHovering ? 'spiderman' : 'brick'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              {isHovering ? (
                <LegoSpiderManCursor isHovering={isHovering} isClicking={isClicking} />
              ) : (
                <LegoBrickCursor isClicking={isClicking} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
