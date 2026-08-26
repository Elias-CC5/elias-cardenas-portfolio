import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePointerTilt } from '@/hooks/usePointerTilt';

interface TiltPanelProps {
  children: ReactNode;
  className?: string;
  /** Grados máximos. Por defecto 4: suficiente para notarse, no para deformar el texto. */
  max?: number;
  /** Desactiva la inclinación y deja sólo la superficie. */
  flat?: boolean;
}

/**
 * Superficie con inclinación sutil al puntero.
 *
 * Sustituye a cuatro implementaciones idénticas del mismo efecto —
 * `TiltCard` (About), `Photo3D` (About), `TimelineCard` (Experience) y
 * `ProjectCard` — cada una con su propio `useState`, lo que provocaba un
 * render de React por cada `mousemove`. Acá el gesto vive en motion values.
 *
 * El brillo que seguía al cursor se redujo a un realce del borde: el
 * radial-gradient blanco al 14% sobre una superficie casi negra apenas se
 * distinguía, y costaba repintar la tarjeta entera en cada frame.
 */
export default function TiltPanel({ children, className = '', max = 4, flat = false }: TiltPanelProps) {
  const tilt = usePointerTilt({ max, disabled: flat });

  return (
    <div ref={tilt.ref} {...tilt.handlers} style={{ perspective: 900 }}>
      <motion.div
        style={{ ...tilt.transform, transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-ink-2)] transition-colors duration-[var(--duration-quick)] hover:border-[var(--color-border-strong)] ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
