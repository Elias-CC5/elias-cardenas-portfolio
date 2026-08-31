import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import SEO from '@/components/layout/SEO';
import Button from '@/components/ui/Button';
import WorkList from '@/components/sections/WorkList';
import { HeroParallax, type ParallaxItem } from '@/components/ui/hero-parallax';
import { projects, profile } from '@/data/portfolio';
import { fadeUp, staggerContainer, springSoft } from '@/lib/motion';

type Filter = 'all' | 'completed' | 'in-progress';

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Completados', value: 'completed' },
  { label: 'En curso', value: 'in-progress' },
];

function matches(status: string, filter: Filter) {
  if (filter === 'all') return true;
  if (filter === 'completed') return status === 'completed';
  return status !== 'completed';
}

/**
 * Esta página estaba escrita contra un modelo de datos que no existe:
 * pedía `image`, `thumbnail`, `bgColor`, `textColor`, `featured`, `subtitle`,
 * `client`, `role`, `type` y `tags`. Ninguno de esos campos está en
 * `Project` — los reales son `coverImage`, `context`, `myRole`, `teamType`
 * y `tech`. Además de romper el build con quince errores de tipos, la
 * página renderizaba `undefined` en todos ellos.
 *
 * Ahora lee los datos reales y no duplica nada: el muro de parallax se
 * arma con las capturas que ya están en `portfolio.ts`.
 */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = projects.filter((project) => matches(project.status, filter));

  /**
   * Quince capturas para las tres filas del muro.
   *
   * Se reparten en round-robin —una de cada proyecto por vuelta— en lugar
   * de tomar las primeras quince de la lista. Si no, las tres filas se
   * llenarían con el mismo proyecto y el muro parecería un solo trabajo.
   */
  const parallaxItems = useMemo<ParallaxItem[]>(() => {
    const perProject = projects.map((project) =>
      (project.gallery ?? []).slice(0, 4).map((shot) => ({
        title: project.title.split('—')[0].trim(),
        link: `/proyectos/${project.slug}`,
        thumbnail: shot.src,
        caption: shot.label,
      })),
    );

    const out: ParallaxItem[] = [];
    for (let round = 0; round < 4 && out.length < 15; round += 1) {
      for (const list of perProject) {
        if (list[round] && out.length < 15) out.push(list[round]);
      }
    }
    return out;
  }, []);

  const realClients = projects.filter((p) => p.realClient).length;

  return (
    <>
      <SEO
        title={`Proyectos — ${profile.fullName}`}
        description="Proyectos full stack en producción y trabajo académico: arquitectura backend, autenticación e interfaces."
      />

      <HeroParallax
        items={parallaxItems}
        header={
          <motion.header
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.07)}
            className="shell relative left-0 top-0 w-full pt-32 pb-20 md:pt-40 md:pb-28"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="t-label text-[var(--color-paper-dim)]">Trabajo realizado</span>
              <hr className="rule flex-1" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="t-display mt-8 text-[var(--color-paper)]">
              Proyectos
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="t-lead mt-6 max-w-2xl text-[var(--color-paper-dim)]"
            >
              {realClients} de estos {projects.length} los usa una empresa de verdad. Los otros{' '}
              {projects.length - realClients} son de TECSUP. En todos, el trabajo estuvo en el
              modelo de datos, la autenticación y las reglas de negocio.
            </motion.p>
          </motion.header>
        }
      />

      <section className="shell pb-28">
        <div
          role="group"
          aria-label="Filtrar proyectos"
          className="mb-14 flex flex-wrap items-center gap-1 border-y border-[var(--color-border)] py-3"
        >
          {FILTERS.map((option) => {
            const isActive = filter === option.value;
            const count = projects.filter((p) => matches(p.status, option.value)).length;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={isActive}
                className={`relative rounded-[var(--radius-md)] px-3.5 py-2 text-[0.8125rem] transition-colors duration-[var(--duration-quick)] ${
                  isActive
                    ? 'text-[var(--color-paper)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-paper-dim)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    transition={springSoft}
                    className="absolute inset-0 rounded-[var(--radius-md)] bg-[var(--color-surface)]"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
                <span className="t-num relative z-10 ml-2 text-[0.6875rem] text-[var(--color-muted)]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <WorkList key={filter} projects={filtered} />
        ) : (
          <p className="border-y border-[var(--color-border)] py-24 text-center text-sm text-[var(--color-muted)]">
            No hay proyectos en esta categoría.
          </p>
        )}

        <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--color-border)] pt-10">
          <p className="t-h3 max-w-md text-[var(--color-paper-dim)]">
            El código de la mayoría está público.
          </p>
          <Button href="https://github.com/Elias-CC5" external variant="secondary">
            <FiGithub size={15} aria-hidden="true" /> Ver perfil en GitHub
          </Button>
        </div>
      </section>
    </>
  );
}
