import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwritingSvg } from '@/components/ui/handwriting-svg';

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-ink)]"
        >
          <HandwritingSvg
            text="Elias Cardenas"
            width={450}
            height={180}
            fontSize={64}
            strokeWidth={1.8}
            duration={2.2}
            className="text-[var(--color-paper)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}