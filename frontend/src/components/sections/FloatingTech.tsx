import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getSkillIcon } from '@/data/skillIcons';
import { ease } from '@/lib/motion';

/**
 * Iconos de tecnologías flotando alrededor del Macbook.
 *
 * Tres cosas los sacan del registro de "stickers pegados":
 *
 * 1. Profundidad de campo real. El plano de atrás va más chico, más
 *    apagado y LEVEMENTE DESENFOCADO. Es lo que hace que el conjunto se
 *    lea como espacio y no como una fila de recuadros.
 * 2. Cada uno lleva un halo en su color de marca detrás del cristal, así
 *    el color se percibe aunque el icono sea pequeño.
 * 3. Derivan en dos ejes y rotan un poco, cada uno con su propio periodo
 *    y desfase. Si todos subieran y bajaran igual se nota al instante que
 *    es automático.
 *
 * Son decorativos (`aria-hidden`): el stack está escrito en la portada y
 * en /habilidades. Sólo se anima `transform`.
 */

type Spot = {
  name: string;
  top: string;
  left?: string;
  right?: string;
  /** 0 = primer plano, nítido · 1 = fondo, desenfocado */
  depth: 0 | 1;
};

const SPOTS: Spot[] = [
  // Calle izquierda
  { name: 'React', top: '9%', left: '7%', depth: 0 },
  { name: 'TypeScript', top: '17%', left: '16%', depth: 1 },
  { name: 'Next.js', top: '25%', left: '3%', depth: 0 },
  { name: 'Tailwind CSS', top: '33%', left: '14%', depth: 1 },
  { name: 'Node.js', top: '41%', left: '6%', depth: 0 },
  { name: 'Prisma', top: '49%', left: '16%', depth: 1 },
  { name: 'PostgreSQL', top: '57%', left: '2%', depth: 0 },
  { name: 'Docker', top: '65%', left: '13%', depth: 1 },
  { name: 'Framer Motion', top: '73%', left: '5%', depth: 1 },
  { name: 'Vite', top: '81%', left: '15%', depth: 0 },
  { name: 'Git', top: '89%', left: '6%', depth: 1 },
  { name: 'Zustand', top: '3%', left: '14%', depth: 1 },
  // Calle derecha
  { name: 'NestJS', top: '8%', right: '8%', depth: 0 },
  { name: 'Express.js', top: '16%', right: '16%', depth: 1 },
  { name: 'JWT', top: '24%', right: '3%', depth: 0 },
  { name: 'MongoDB', top: '32%', right: '14%', depth: 1 },
  { name: 'Redis', top: '40%', right: '5%', depth: 0 },
  { name: 'Neon', top: '48%', right: '16%', depth: 1 },
  { name: 'Vercel', top: '56%', right: '2%', depth: 0 },
  { name: 'Render', top: '64%', right: '13%', depth: 1 },
  { name: 'Swagger', top: '72%', right: '5%', depth: 1 },
  { name: 'VS Code', top: '80%', right: '15%', depth: 0 },
  { name: 'MySQL', top: '88%', right: '7%', depth: 1 },
  { name: 'Cloudinary', top: '2%', right: '15%', depth: 1 },
];

export default function FloatingTech() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {SPOTS.map((spot, i) => {
        const { icon: Icon, color } = getSkillIcon(spot.name);
        const front = spot.depth === 0;
        const size = front ? 56 : 44;
        const drift = front ? 14 : 9;

        return (
          <motion.span
            key={spot.name}
            style={
              {
                top: spot.top,
                left: spot.left,
                right: spot.right,
                width: size,
                height: size,
                '--brand': color,
                filter: front ? undefined : 'blur(0.7px)',
              } as CSSProperties
            }
            className="absolute block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: front ? 1 : 0.5, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.55, delay: i * 0.035, ease: ease.outExpo }}
          >
            <motion.span
              animate={
                reduced
                  ? undefined
                  : {
                      y: [0, -drift, 0, drift * 0.6, 0],
                      x: [0, drift * 0.4, 0, -drift * 0.3, 0],
                      rotate: [0, front ? 4 : -3, 0, front ? -3 : 2, 0],
                    }
              }
              transition={{
                duration: 11 + i * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.28,
              }}
              className="relative flex h-full w-full items-center justify-center"
            >
              {/* Halo de marca detrás del cristal */}
              <span
                className="absolute inset-0 rounded-[1rem] opacity-25 blur-lg"
                style={{ backgroundColor: color }}
              />

              <span className="relative flex h-full w-full items-center justify-center rounded-[1rem] border border-[color-mix(in_srgb,var(--brand)_28%,var(--color-border))] bg-[var(--color-ink-2)]/75 backdrop-blur-md">
                {/* Reflejo superior: da volumen de cristal sin sombras */}
                <span className="pointer-events-none absolute inset-x-2 top-px h-px rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <Icon size={front ? 24 : 19} style={{ color }} />
              </span>
            </motion.span>
          </motion.span>
        );
      })}
    </div>
  );
}
