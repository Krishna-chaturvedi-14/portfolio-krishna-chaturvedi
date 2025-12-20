import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'visitor_toast_shown';

export const VisitorToast = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if toast was already shown this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/krishna-chaturvedi/portfolio');
        const data = await response.json();
        
        if (data.value) {
          setVisitorCount(data.value);
          setIsVisible(true);
          sessionStorage.setItem(STORAGE_KEY, 'true');

          // Auto-dismiss after 3.5 seconds
          setTimeout(() => {
            setIsVisible(false);
          }, 3500);
        }
      } catch (error) {
        // Silently fail - don't show toast if API fails
        console.log('Visitor count unavailable');
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && visitorCount && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 md:right-8 z-50 
            max-w-xs w-auto
            md:bottom-6 
            left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0"
        >
          <div 
            className="px-5 py-3.5 rounded-lg
              bg-card/80 backdrop-blur-md
              border border-border/40
              shadow-lg shadow-black/20"
          >
            <p className="text-sm font-medium text-foreground/90 tracking-wide">
              You are visitor{' '}
              <span className="text-accent font-semibold">
                #{visitorCount.toLocaleString()}
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
