import { Children, useRef, type ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Apilado de secciones por scroll.
 *
 * Cada panel queda fijo (`sticky`) cuando su borde superior llega a su sitio
 * y el siguiente se le monta encima. El de abajo se encoge y se apaga, así
 * que su canto sigue asomando y la pila se lee como pila.
 *
 * ── Sobre el coste ────────────────────────────────────────────────────────
 * La primera versión iba a tirones, y no por una sola causa: cada panel tenía
 * su propio `useScroll` (cinco suscripciones al scroll), animaba `opacity`
 * sobre una capa del tamaño del viewport —que obliga a repintar, no sólo a
 * componer— y todo colgaba de un `perspective` con `preserve-3d`, que promueve
 * cada panel a una capa 3D del alto de la pantalla.
 *
 * Esta versión deja una sola suscripción al scroll y una sola propiedad
 * animada por panel: `scale`, más la opacidad de una capa plana de color
 * sólido, que el compositor resuelve sin repintar. Sin perspectiva y sin
 * `preserve-3d`: la profundidad de verdad vive en las fotos, que son
 * pequeñas y sólo se mueven cuando el cursor está encima.
 *
 * ── Sobre el color ────────────────────────────────────────────────────────
 * Blanco y negro, alternando. Cada panel publica su propio juego de variables
 * (`--fg`, `--bg`, `--line`, `--surf`…) y todo lo que hay dentro las lee, así
 * que el mismo marcado sirve para un panel negro y para uno blanco.
 *
 * Sólo se apila en ≥768px y sin `prefers-reduced-motion`: en móvil un panel no
 * cabe en una pantalla, y lo que sobresale de un `sticky` queda por debajo del
 * pliegue sin forma de llegar. Ahí los paneles van uno debajo de otro.
 *
 * Requiere que ningún ancestro cree contexto de scroll — por eso `body` usa
 * `overflow-x: clip` y no `hidden`.
 */

const BASE_TOP = 4.5; // rem — por debajo de la barra fija
const STEP = 0.9; // rem que asoma cada panel bajo el siguiente
const SCALE_STEP = 0.025;

/**
 * Los dos tonos. Se alternan por índice dentro de la pila, y se exportan
 * sueltos para las secciones que viven fuera de ella y quieren el mismo
 * lenguaje — la banda blanca del Macbook en la portada, por ejemplo.
 */
export const TONE_DARK = {
  '--bg': '#0d0d0f',
  '--fg': '#f4f4f5',
  '--fg-dim': '#a5a5ad',
  '--fg-mute': '#6f6f79',
  '--line': '#212125',
  '--line-strong': '#33333a',
  '--surf': '#17171a',
  '--surf-2': '#1d1d21',
} as const;

export const TONE_LIGHT = {
  '--bg': '#f4f4f5',
  '--fg': '#09090a',
  '--fg-dim': '#3f3f46',
  '--fg-mute': '#71717a',
  '--line': '#dcdce1',
  '--line-strong': '#b4b4bd',
  '--surf': '#ffffff',
  '--surf-2': '#ebebee',
} as const;

const TONES = [TONE_DARK, TONE_LIGHT] as const;

/**
 * Caja interna de un panel. Fija el alto útil y el aire, y es la que
 * garantiza la condición del apilado: que el contenido quepa en una pantalla.
 * Vive acá y no en cada página porque las dos que apilan deben medir igual.
 */
export function PanelBody({ children }: { children: ReactNode }) {
  return (
    <div className="shell flex min-h-[calc(100vh-11rem)] flex-col justify-center py-16 md:py-20">
      {children}
    </div>
  );
}

export default function ScrollStack({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const wide = useMediaQuery('(min-width: 768px)');
  const enabled = wide && !reduced;

  const panels = Children.toArray(children);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className="relative">
      {panels.map((panel, i) => (
        <Panel
          key={i}
          index={i}
          total={panels.length}
          progress={scrollYProgress}
          enabled={enabled}
        >
          {panel}
        </Panel>
      ))}
    </div>
  );
}

interface PanelProps {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  enabled: boolean;
}

function Panel({ children, index, total, progress, enabled }: PanelProps) {
  const isLast = index === total - 1;
  const tone = TONES[index % TONES.length] ?? TONES[0];

  // Ambas transformaciones salen del mismo scroll del contenedor: una sola
  // suscripción para toda la pila.
  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * SCALE_STEP;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, Math.min(start + 0.45, 1)], [0, isLast ? 0 : 0.55]);

  return (
    <div
      className={enabled ? 'sticky' : 'mb-4 last:mb-0'}
      style={enabled ? { top: `${BASE_TOP + index * STEP}rem`, zIndex: index } : undefined}
    >
      <motion.div
        style={
          enabled
            ? { scale, transformOrigin: 'center top', willChange: 'transform' }
            : undefined
        }
        className="relative"
      >
        <div
          style={{ ...(tone as Record<string, string>), backgroundColor: 'var(--bg)' }}
          className="relative overflow-hidden rounded-3xl border border-[var(--line)] shadow-[0_-24px_70px_-30px_rgba(0,0,0,0.9)]"
        >
          <div className="relative">{children}</div>

          {/* Sombra del panel que se le monta encima. Color sólido: el
              compositor la funde sin repintar el contenido de debajo. */}
          <motion.span
            aria-hidden="true"
            style={{ opacity: enabled ? dim : 0, willChange: 'opacity' }}
            className="pointer-events-none absolute inset-0 bg-[#09090a]"
          />
        </div>
      </motion.div>
    </div>
  );
}
