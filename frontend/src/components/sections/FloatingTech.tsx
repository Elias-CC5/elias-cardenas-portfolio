import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getSkillIcon } from '@/data/skillIcons';
import { ease } from '@/lib/motion';

/**
 * Iconos de tecnologías flotando alrededor del Macbook.
 *
 * Dos planos: el de adelante va más grande y opaco, el de atrás más chico y
 * más apagado. Cada uno deriva en dos ejes y rota un poco, con su propio
 * periodo y desfase — si todos subieran y bajaran igual se nota al instante
 * que es automático.
 *
 * ── Sobre el coste ────────────────────────────────────────────────────────
 * Son 24. La versión anterior le daba a cada uno una animación infinita de
 * Framer, un halo con `blur-lg` y, en el plano de atrás, un `filter: blur`
 * encima. Eso son 24 bucles de JavaScript recalculando estilos en cada
 * cuadro y 36 filtros que el navegador tiene que volver a resolver cada vez
 * que la capa se mueve — un filtro sobre un elemento animado se recalcula
 * siempre, no se cachea. De ahí el tirón.
 *
 * Ahora la deriva es una animación CSS (`@keyframes float-tech`, en
 * index.css): la resuelve el compositor, fuera del hilo principal, y cuesta
 * lo mismo con 24 que con 240. Framer sólo se ocupa de la entrada, que
 * ocurre una vez. Ningún filtro: el halo es un `radial-gradient`, que se
 * pinta una vez y viaja con la capa.
 *
 * Son decorativos (`aria-hidden`): el stack está escrito en la portada y en
 * /habilidades.
 */

type Spot = {
  name: string;
  top: string;
  left?: string;
  right?: string;
  /** 0 = primer plano · 1 = fondo */
  depth: 0 | 1;
};

const SPOTS: Spot[] = [
  // Calle izquierda
  { name: 'React', top: '9%', left: '6%', depth: 0 },
  { name: 'TypeScript', top: '17%', left: '16%', depth: 1 },
  { name: 'Next.js', top: '25%', left: '2%', depth: 0 },
  { name: 'Tailwind CSS', top: '33%', left: '14%', depth: 1 },
  { name: 'Node.js', top: '41%', left: '5%', depth: 0 },
  { name: 'Prisma', top: '49%', left: '16%', depth: 1 },
  { name: 'PostgreSQL', top: '57%', left: '1%', depth: 0 },
  { name: 'Docker', top: '65%', left: '13%', depth: 1 },
  { name: 'Framer Motion', top: '73%', left: '4%', depth: 1 },
  { name: 'Vite', top: '81%', left: '15%', depth: 0 },
  { name: 'Git', top: '89%', left: '5%', depth: 1 },
  { name: 'Zustand', top: '3%', left: '14%', depth: 1 },
  // Calle derecha
  { name: 'NestJS', top: '8%', right: '7%', depth: 0 },
  { name: 'Express.js', top: '16%', right: '16%', depth: 1 },
  { name: 'JWT', top: '24%', right: '2%', depth: 0 },
  { name: 'MongoDB', top: '32%', right: '14%', depth: 1 },
  { name: 'Redis', top: '40%', right: '4%', depth: 0 },
  { name: 'Neon', top: '48%', right: '16%', depth: 1 },
  { name: 'Vercel', top: '56%', right: '1%', depth: 0 },
  { name: 'Render', top: '64%', right: '13%', depth: 1 },
  { name: 'Swagger', top: '72%', right: '4%', depth: 1 },
  { name: 'VS Code', top: '80%', right: '15%', depth: 0 },
  { name: 'MySQL', top: '88%', right: '6%', depth: 1 },
  { name: 'Cloudinary', top: '2%', right: '15%', depth: 1 },
];

export default function FloatingTech() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {SPOTS.map((spot, i) => {
        const { icon: Icon, color } = getSkillIcon(spot.name);
        const front = spot.depth === 0;
        const size = front ? 78 : 62;
        const drift = front ? 16 : 10;

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
              } as CSSProperties
            }
            className="absolute block"
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: front ? 1 : 0.6, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.55, delay: i * 0.03, ease: ease.outExpo }}
          >
            <span
              style={
                {
                  '--drift': `${drift}px`,
                  '--tilt': front ? '4deg' : '-3deg',
                  animation: reduced
                    ? undefined
                    : `float-tech ${11 + i * 0.7}s ease-in-out ${i * 0.28}s infinite`,
                  willChange: reduced ? undefined : 'transform',
                } as CSSProperties
              }
              className="relative flex h-full w-full items-center justify-center"
            >
              {/* Halo de marca. Degradado, no `blur`: un filtro sobre algo
                  que se mueve se recalcula en cada cuadro. */}
              <span
                className="absolute -inset-2 rounded-[1.4rem] opacity-45"
                style={{
                  background: `radial-gradient(closest-side, ${color}, transparent 78%)`,
                }}
              />

              <span
                style={{ ['--brand' as string]: color }}
                className="relative flex h-full w-full items-center justify-center rounded-[1.25rem] border border-[color-mix(in_srgb,var(--brand)_30%,#212125)] bg-[#0d0d0f] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
              >
                {/* Reflejo superior: da volumen de cristal sin sombras */}
                <span className="pointer-events-none absolute inset-x-3 top-px h-px rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <Icon size={front ? 34 : 27} style={{ color }} />
              </span>
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}
