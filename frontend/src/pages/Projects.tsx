import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import SEO from '@/components/layout/SEO';
import WorkList from '@/components/sections/WorkList';
import Button from '@/components/ui/Button';
import { projects, profile } from '@/data/portfolio';
import { springSoft } from '@/lib/motion';

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

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = projects.filter((project) => matches(project.status, filter));

  return (
    <>
      <SEO
        title={`Proyectos — ${profile.fullName}`}
        description="Proyectos full stack en producción y trabajo académico: arquitectura backend, autenticación e interfaces."
      />

      <section className="shell pt-32 pb-28 md:pt-36">
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
