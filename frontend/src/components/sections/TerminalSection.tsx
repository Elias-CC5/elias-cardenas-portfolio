import { motion } from 'framer-motion';
import { Terminal } from '@/components/ui/terminal';
import { profile, projects, skills } from '@/data/portfolio';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Bloque de terminal.
 *
 * Los comandos no son de relleno: cada salida es un dato verdadero, y casi
 * todos se calculan sobre `portfolio.ts`. Si mañana entra un proyecto o una
 * tecnología nueva, la terminal no queda mintiendo sola.
 */
export default function TerminalSection() {
  const realClients = projects.filter((p) => p.realClient).length;
  const byCategory = (category: string) =>
    skills
      .filter((skill) => skill.category === category)
      .slice(0, 4)
      .map((skill) => skill.name)
      .join(', ');

  const commands = [
    'whoami',
    'cat stack.txt',
    'curl -I https://pyfgroup.com',
    'ls proyectos/ | wc -l',
    'uptime',
  ];

  const outputs: Record<number, string[]> = {
    0: [profile.fullName, `${profile.role} — ${profile.location}`],
    1: [
      `frontend   ${byCategory('frontend')}`,
      `backend    ${byCategory('backend')}`,
      `database   ${byCategory('database')}`,
    ],
    2: ['HTTP/2 200', 'server: vercel', 'x-proyecto: en produccion'],
    3: [
      String(projects.length),
      `${realClients} de ellos los usa una empresa de verdad`,
    ],
    4: ['no se cae a las 3 a.m.'],
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.08)}
      className="shell section relative z-0"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <span className="t-label text-[var(--color-paper-dim)]">Ficha técnica</span>
        <hr className="rule flex-1" />
      </motion.div>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div variants={fadeUp} className="lg:col-span-5">
          <h2 className="t-h2 text-[var(--color-paper)]">
            Lo mismo,
            <span className="block text-[var(--color-muted)]">pero en una sola pantalla.</span>
          </h2>
          <p className="t-lead mt-6 max-w-md text-[var(--color-paper-dim)]">
            Quién soy, con qué construyo y qué está corriendo ahora mismo. Cada salida
            es un dato real, no texto de relleno.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-7">
          <Terminal commands={commands} outputs={outputs} typingSpeed={38} />
        </motion.div>
      </div>
    </motion.section>
  );
}
