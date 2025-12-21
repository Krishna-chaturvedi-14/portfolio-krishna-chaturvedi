import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'visitor_toast_shown';

export const VisitorToast = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if toast was already shown this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const fetchVisitorCount = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke('visitor');
        
        if (fnError) {
          throw new Error(fnError.message);
        }
        
        if (data?.count) {
          setVisitorCount(data.count);
          setIsVisible(true);
          sessionStorage.setItem(STORAGE_KEY, 'true');

          // Auto-dismiss after 3.5 seconds
          setTimeout(() => {
            setIsVisible(false);
          }, 3500);
        } else {
          throw new Error('No count in response');
        }
      } catch (err) {
        // Show error state for debugging
        console.log('Visitor count unavailable:', err);
        setError(true);
        setIsVisible(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');

        // Auto-dismiss after 3.5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3500);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
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
            className="px-5 py-3.5 rounded-[0.375rem]
              bg-card/80 backdrop-blur-md
              border border-border/40
              shadow-lg shadow-black/20"
          >
            {error ? (
              <p className="text-sm font-medium text-muted-foreground tracking-wide">
                Visitor count unavailable
              </p>
            ) : (
              <p className="text-sm font-medium text-foreground/90 tracking-wide">
                Welcome — you are visitor{' '}
                <span className="font-mono text-accent font-semibold">
                  #{visitorCount?.toLocaleString()}
                </span>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
