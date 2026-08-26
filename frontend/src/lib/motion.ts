import type { Variants, Transition } from 'framer-motion';

/**
 * Tokens de movimiento — espejo de los definidos en index.css.
 * Regla del proyecto: ninguna animación inventa su propia duración o easing.
 * Si un valor no está acá, no se usa.
 */

type Bezier = [number, number, number, number];

export const ease = {
  /** Entradas y salidas de elementos. Frena rápido, se asienta suave. */
  outQuart: [0.25, 1, 0.5, 1] as Bezier,
  /** Reveals largos de scroll. Frenada más pronunciada. */
  outExpo: [0.16, 1, 0.3, 1] as Bezier,
  /** Transiciones entre dos estados (abrir/cerrar). Simétrico. */
  inOut: [0.65, 0, 0.35, 1] as Bezier,
};

export const duration = {
  /** Feedback táctil inmediato: press, focus. */
  instant: 0.12,
  /** Hover, color, opacidad. */
  quick: 0.22,
  /** Entradas, cambios de layout. */
  normal: 0.42,
  /** Reveals al entrar al viewport. */
  slow: 0.7,
};

/**
 * Spring para movimiento dirigido por el puntero (tilt, imanes, píldoras).
 * Se prefiere spring sobre tween acá porque la interacción es interrumpible:
 * el usuario puede cambiar de dirección a mitad del gesto y el spring lo
 * absorbe sin cortes.
 */
export const spring: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.7,
};

/** Spring más suelto para la píldora de navegación (recorre más distancia). */
export const springSoft: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 34,
  mass: 0.8,
};

/* ---------------------------------------------------------------------------
   Variants compartidos
   Un solo vocabulario de entrada en todo el sitio: subir y aparecer.
   Sin blur (cuesta un filtro de pantalla completa y "ensucia" el texto),
   sin scale (deforma la tipografía a mitad de la animación).
   --------------------------------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.outQuart } },
};

/** Contenedor de stagger. El hijo debe usar `fadeUp`. */
export function staggerContainer(stagger = 0.07, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/**
 * Entrada de carga de página. Se dispara una vez, arriba del pliegue.
 * `delayChildren` corto a propósito: nadie debe esperar para leer el H1.
 */
export const pageEnter: Variants = staggerContainer(0.06, 0.04);

/** Margen de viewport compartido para reveals de scroll. */
export const viewportOnce = { once: true, margin: '-12% 0px -8% 0px' } as const;
