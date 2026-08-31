import { motion, useReducedMotion } from 'framer-motion';
import { getSkillIcon } from '@/data/skillIcons';

/**
 * Iconos de tecnologías flotando alrededor del Macbook.
 *
 * Van sólo en las calles laterales — la laptop ocupa la banda central — y
 * cada uno respira con su propio periodo y desfase, así el conjunto nunca
 * late al unísono, que es lo que delata una animación automática.
 *
 * Son decorativos: llevan `aria-hidden`, porque el stack ya está escrito en
 * la portada y en /habilidades. Sólo se anima `transform`.
 */

type Spot = {
  name: string;
  /** Posición en porcentaje dentro de la sección. */
  top: string;
  left?: string;
  right?: string;
  /** Tamaño relativo: los del fondo van más chicos y más apagados. */
  depth: 0 | 1;
};

const SPOTS: Spot[] = [
  // Calle izquierda
  { name: 'React', top: '10%', left: '7%', depth: 0 },
  { name: 'TypeScript', top: '17%', left: '16%', depth: 1 },
  { name: 'Node.js', top: '25%', left: '3%', depth: 0 },
  { name: 'Tailwind CSS', top: '32%', left: '13%', depth: 1 },
  { name: 'PostgreSQL', top: '40%', left: '6%', depth: 0 },
  { name: 'Prisma', top: '47%', left: '16%', depth: 1 },
  { name: 'Vite', top: '55%', left: '2%', depth: 1 },
  { name: 'Git', top: '62%', left: '12%', depth: 0 },
  { name: 'JavaScript (ES6+)', top: '70%', left: '5%', depth: 1 },
  { name: 'Astro', top: '77%', left: '15%', depth: 0 },
  { name: 'Bootstrap', top: '85%', left: '4%', depth: 1 },
  { name: 'Python', top: '92%', left: '11%', depth: 1 },
  { name: 'HTML5', top: '4%', left: '13%', depth: 1 },
  // Calle derecha
  { name: 'Next.js', top: '9%', right: '8%', depth: 1 },
  { name: 'NestJS', top: '16%', right: '16%', depth: 0 },
  { name: 'Express.js', top: '24%', right: '3%', depth: 1 },
  { name: 'MongoDB', top: '31%', right: '14%', depth: 0 },
  { name: 'MySQL', top: '39%', right: '5%', depth: 1 },
  { name: 'Supabase', top: '46%', right: '16%', depth: 0 },
  { name: 'GitHub', top: '54%', right: '2%', depth: 1 },
  { name: 'Postman', top: '61%', right: '13%', depth: 0 },
  { name: 'Firebase', top: '69%', right: '6%', depth: 1 },
  { name: 'PHP', top: '76%', right: '15%', depth: 0 },
  { name: 'SQL Server', top: '84%', right: '4%', depth: 1 },
  { name: 'npm', top: '91%', right: '12%', depth: 1 },
  { name: 'C++', top: '3%', right: '14%', depth: 1 },
];

export default function FloatingTech() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {SPOTS.map((spot, i) => {
        const { icon: Icon, color } = getSkillIcon(spot.name);
        const size = spot.depth === 0 ? 26 : 20;

        return (
          <motion.span
            key={spot.name}
            style={{ top: spot.top, left: spot.left, right: spot.right }}
            className="absolute flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-ink-2)]/70 p-3 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: spot.depth === 0 ? 0.95 : 0.45, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              animate={reduced ? undefined : { y: [0, spot.depth === 0 ? -12 : -8, 0] }}
              transition={{
                duration: 5 + i * 0.55,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.35,
              }}
              className="flex"
            >
              <Icon size={size} style={{ color }} />
            </motion.span>
          </motion.span>
        );
      })}
    </div>
  );
}
