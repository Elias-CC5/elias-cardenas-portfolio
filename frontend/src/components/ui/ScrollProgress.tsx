import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Barra de progreso de lectura — uso #1 del color señal.
 * Antes era un degradado de blanco a blanco a blanco (los tres tokens de
 * acento valían #ffffff), así que se veía como una línea blanca plana.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.25 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-[var(--color-signal)]"
    />
  );
}
