import { useCallback, useRef } from 'react';
import type { MotionStyle } from 'framer-motion';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { spring } from '@/lib/motion';

interface TiltOptions {
  /** Grados máximos de rotación. Por encima de ~6 la tipografía se deforma. */
  max?: number;
  /** Desactiva el efecto (por ejemplo en superficies que ya tienen jerarquía). */
  disabled?: boolean;
}

/**
 * Inclinación 3D dirigida por el puntero, más las coordenadas normalizadas
 * del cursor dentro del elemento.
 *
 * Existía cinco veces duplicado (ProjectCard, TiltCard, Photo3D, TimelineCard,
 * SkillCard), cada copia con su propio `useState` — lo que provocaba un render
 * de React por cada `mousemove`. Acá el movimiento vive en motion values, que
 * escriben directo en el estilo sin pasar por el ciclo de render.
 *
 * Se ignora en punteros gruesos (táctil) y con `prefers-reduced-motion`.
 */
export function usePointerTilt({ max = 5, disabled = false }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const off = disabled || reduced === true;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (off || event.pointerType !== 'mouse') return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width);
      py.set((event.clientY - rect.top) / rect.height);
    },
    [off, px, py],
  );

  const onPointerLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return {
    ref,
    /** Se aplica al elemento que recibe el gesto. */
    handlers: { onPointerMove, onPointerLeave },
    /** Se aplica al `style` de un motion.div con `transformStyle: 'preserve-3d'`. */
    transform: (off ? {} : { rotateX, rotateY }) as MotionStyle,
    /** Posición del cursor para brillos/reflejos, en porcentaje. */
    glow: { x: glowX, y: glowY },
    enabled: !off,
  };
}
