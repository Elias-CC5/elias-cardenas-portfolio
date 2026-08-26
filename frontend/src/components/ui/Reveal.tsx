import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, staggerContainer, viewportOnce, duration, ease } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  /** Retardo en segundos. Usar con moderación: encadenar reveals hace lenta la lectura. */
  delay?: number;
  className?: string;
  /** Desplazamiento vertical inicial. */
  y?: number;
}

/**
 * Reveal al entrar al viewport.
 *
 * Cambios respecto a la versión anterior:
 * - Se eliminó el `filter: blur()`. Animar un blur obliga al navegador a
 *   rasterizar la capa en cada frame y deja el texto sucio a mitad de camino.
 *   Con opacidad + translate alcanza, y corre en el compositor.
 * - Duración y easing salen de los tokens, no de literales por componente.
 */
export default function Reveal({ children, delay = 0, className, y = 18 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.slow, delay, ease: ease.outExpo },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/** Contenedor de stagger. Cada hijo directo debe llevar `variants={staggerItem}`. */
export function StaggerGroup({ children, className, staggerDelay = 0.07 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = fadeUp;
