import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { getSkillIcon } from '@/data/skillIcons';
import type { Skill, SkillCategory } from '@/types';
import { ease } from '@/lib/motion';

/**
 * Contenido que va dentro de la pantalla del Macbook que se abre al hacer
 * scroll: el stack visto como las aplicaciones de un escritorio.
 *
 * Todo lo de acá dentro se escala con la tapa, así que los tamaños están
 * pensados para el estado abierto. La barra superior hace de filtro por
 * categoría, como las pestañas de una ventana.
 */

const CATEGORY_LABEL: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Bases de datos',
  tools: 'Herramientas',
};

const CATEGORIES: (SkillCategory | 'all')[] = [
  'all',
  'frontend',
  'backend',
  'database',
  'tools',
];

export default function SkillsScreen({
  skills,
  usage,
  selected,
  onSelect,
  activeCategory,
  onCategory,
}: {
  skills: Skill[];
  usage: Map<string, number>;
  selected: string | null;
  onSelect: (name: string) => void;
  activeCategory: SkillCategory | 'all';
  onCategory: (category: SkillCategory | 'all') => void;
}) {
  const visible =
    activeCategory === 'all' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-ink)]">
      {/* Barra de la ventana: filtro por categoría */}
      <div className="flex shrink-0 items-center gap-1 border-b border-[var(--color-border)] bg-[var(--color-ink-2)] px-3 py-1.5">
        <span className="mr-2 font-mono text-[7px] tracking-[0.14em] text-[var(--color-paper-dim)] uppercase">
          Stack
        </span>
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategory(category)}
              aria-pressed={isActive}
              className={`rounded px-1.5 py-0.5 text-[7px] transition-colors ${
                isActive
                  ? 'bg-[var(--color-surface-2)] text-[var(--color-paper)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-paper-dim)]'
              }`}
            >
              {category === 'all' ? 'Todas' : CATEGORY_LABEL[category]}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[7px] text-[var(--color-muted)]">
          {String(visible.length).padStart(2, '0')} apps
        </span>
      </div>

      {/* Escritorio */}
      <div className="hide-scrollbar flex-1 overflow-y-auto px-3 py-3">
        <motion.ul
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
          className="grid grid-cols-9 gap-x-1 gap-y-2"
        >
          {visible.map((skill) => {
            const { icon: Icon, color } = getSkillIcon(skill.name);
            const count = usage.get(skill.name) ?? 0;
            const isSelected = selected === skill.name;

            return (
              <motion.li
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 6, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, ease: ease.outExpo },
                  },
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(skill.name)}
                  aria-pressed={isSelected}
                  title={skill.name}
                  style={{ '--brand': color } as CSSProperties}
                  className="group flex w-full flex-col items-center gap-1 text-center"
                >
                  <span
                    className={`relative flex aspect-square w-full items-center justify-center rounded-[6px] border transition-all duration-200 group-hover:-translate-y-[3px] ${
                      isSelected
                        ? 'border-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_18%,var(--color-ink-2))]'
                        : 'border-[var(--color-border)] bg-[var(--color-ink-2)] group-hover:border-[color-mix(in_srgb,var(--brand)_60%,transparent)]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 rounded-[6px] blur-[6px] transition-opacity duration-300 ${
                        isSelected ? 'opacity-45' : 'opacity-0 group-hover:opacity-35'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                    <Icon size={12} style={{ color }} aria-hidden="true" className="relative" />
                  </span>

                  <span
                    className={`line-clamp-1 w-full text-[6px] leading-none transition-colors ${
                      isSelected ? 'text-[var(--color-paper)]' : 'text-[var(--color-paper-dim)]'
                    }`}
                  >
                    {skill.name}
                  </span>

                  {/* Punto de "app en uso", como el del Dock */}
                  <span
                    aria-hidden="true"
                    className="h-[2px] w-[2px] rounded-full"
                    style={{ backgroundColor: count > 0 ? color : 'transparent' }}
                  />
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
}
