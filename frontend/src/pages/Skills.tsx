import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiX } from 'react-icons/fi';
import SEO from '@/components/layout/SEO';
import { MacbookScroll } from '@/components/ui/macbook-scroll';
import SkillsScreen from '@/components/sections/SkillsScreen';
import { getSkillIcon } from '@/data/skillIcons';
import { skills, projects, profile } from '@/data/portfolio';
import type { SkillCategory } from '@/types';
import { duration, ease } from '@/lib/motion';

/**
 * Normaliza nombres para cruzar `skills` con `projects[].tech`.
 * Los datos no siempre coinciden literalmente: "JavaScript (ES6+)" en
 * skills es "JavaScript" en el stack de un proyecto.
 */
function normalize(name: string) {
  return name.toLowerCase().split('(')[0].replace(/[.\s]/g, '').trim();
}

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const [category, setCategory] = useState<SkillCategory | 'all'>('all');

  /** Proyectos que usan cada tecnología. Se calcula una sola vez. */
  const projectsBySkill = useMemo(() => {
    const map = new Map<string, typeof projects>();
    for (const skill of skills) {
      const key = normalize(skill.name);
      map.set(
        skill.name,
        projects.filter((project) => project.tech.some((t) => normalize(t) === key)),
      );
    }
    return map;
  }, []);

  const counts = useMemo(
    () => new Map([...projectsBySkill].map(([name, list]) => [name, list.length])),
    [projectsBySkill],
  );

  const selectedProjects = selected ? (projectsBySkill.get(selected) ?? []) : [];

  return (
    <>
      <SEO
        title={`Habilidades — ${profile.fullName}`}
        description="Tecnologías con las que construyo, y en qué proyectos las usé."
      />

      <h1 className="sr-only">Stack — tecnologías con las que construyo</h1>


      {/* El componente define su propia altura y su animación depende de
          recorrerla entera: no se envuelve en una sección con altura fija. */}
      {/* El conjunto se escala desde `origin-top`, así que crece hacia
          abajo: sin este `pb` el footer —que es opaco y va en z-[2]— se
          pintaba encima de la pantalla y la cortaba a media grilla. */}
      <section className="relative z-0 w-full pt-16 pb-[38vh] md:pt-24 lg:pb-[48vh]">
        <MacbookScroll
          showGradient={false}
          /* Recorrido corto: la pantalla es interactiva, y con los 520 px
             de la portada se deslizaba fuera de la vista antes de poder
             tocar un icono. */
          travel={130}
          containerClassName="scale-[0.62] sm:scale-[0.9] md:scale-[1.2] lg:scale-[1.45] xl:scale-[1.6] md:pt-12 md:pb-16"
          screen={
            <SkillsScreen
              skills={skills}
              usage={counts}
              selected={selected}
              onSelect={(name) => setSelected((current) => (current === name ? null : name))}
              activeCategory={category}
              onCategory={(next) => {
                setCategory(next);
                setSelected(null);
              }}
            />
          }
          title={
            <span className="t-h2 block text-[var(--color-paper)]">
              Todo lo que tengo
              <span className="block text-[var(--color-muted)]">instalado</span>
            </span>
          }
        />
      </section>

      {/* Detalle de la tecnología elegida */}
      <section className="shell pb-28">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: duration.quick, ease: ease.outQuart }}
              className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-ink-2)] px-6 py-5"
            >
              {(() => {
                const { icon: Icon, color } = getSkillIcon(selected);
                return (
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)]"
                    style={{ backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
                  >
                    <Icon size={22} style={{ color }} aria-hidden="true" />
                  </span>
                );
              })()}

              <span>
                <span className="block text-sm font-medium text-[var(--color-paper)]">
                  {selected}
                </span>
                <span className="t-label text-[var(--color-muted)]">
                  {selectedProjects.length > 0
                    ? `${selectedProjects.length} ${selectedProjects.length === 1 ? 'proyecto' : 'proyectos'}`
                    : 'Sin proyecto publicado'}
                </span>
              </span>

              {selectedProjects.length > 0 && (
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {selectedProjects.map((project) => (
                    <li key={project.id}>
                      <Link
                        to={`/proyectos/${project.slug}`}
                        className="group inline-flex items-center gap-1.5 text-[0.8125rem] text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
                      >
                        <span className="link-underline">
                          {project.title.split('—')[0].trim()}
                        </span>
                        <FiArrowUpRight
                          aria-hidden="true"
                          size={13}
                          className="transition-transform duration-[var(--duration-quick)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar detalle"
                className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-paper)]"
              >
                <FiX size={16} aria-hidden="true" />
              </button>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="t-label text-center text-[var(--color-muted)]"
            >
              Tocá un icono para ver en qué proyectos lo usé
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
