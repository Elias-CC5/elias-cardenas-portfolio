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
        {/* Cabecera Principal */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="t-label text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Portafolio
            </span>
            <h1 className="t-h1 mt-2 text-[var(--color-paper)]">Proyectos Destacados</h1>
          </div>
          <p className="t-num text-xs text-[var(--color-muted)]">
            MOSTRANDO {filtered.length} DE {projects.length} PROYECTOS
          </p>
        </div>

        {/* Píldora de Filtros */}
        <div
          role="group"
          aria-label="Filtrar proyectos"
          className="mb-14 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/40 p-1.5 backdrop-blur-md"
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
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter"
                    transition={springSoft}
                    className="absolute inset-0 rounded-full bg-[var(--color-paper)]"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
                <span
                  className={`t-num relative z-10 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[var(--color-ink)]/15 text-[var(--color-ink)]'
                      : 'bg-white/5 text-[var(--color-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Listado / Estado Vacío */}
        {filtered.length > 0 ? (
          <WorkList key={filter} projects={filtered} />
        ) : (
          <div className="relative flex min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-ink-2)]/30 p-12 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <p className="relative z-10 text-sm font-medium text-[var(--color-paper-dim)]">
              No hay proyectos disponibles en esta categoría.
            </p>
            <p className="relative z-10 mt-1 text-xs text-[var(--color-muted)]">
              Prueba cambiando los filtros superiores para ver otros trabajos.
            </p>
          </div>
        )}

        {/* Banner de GitHub */}
        <div className="group relative mt-24 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)]/60 via-[var(--color-ink-2)]/40 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-border-strong)] sm:flex-row sm:items-center md:p-10">
          <div className="max-w-md">
            <h2 className="t-h3 text-[var(--color-paper)]">El código fuente está disponible</h2>
            <p className="mt-1.5 text-xs text-[var(--color-paper-dim)] leading-relaxed">
              Explora repositorios, contribuciones y proyectos de código abierto en mi perfil de GitHub.
            </p>
          </div>
          <Button
            href="https://github.com/Elias-CC5"
            external
            variant="secondary"
            className="shrink-0"
          >
            <FiGithub size={15} aria-hidden="true" />
            <span>Ver perfil en GitHub</span>
          </Button>
        </div>
      </section>
    </>
  );
}