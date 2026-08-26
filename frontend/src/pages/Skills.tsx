import PageHeader from '@/components/ui/PageHeader';
import SEO from '@/components/layout/SEO';
import SkillCard from '@/components/sections/SkillCard';
import { StaggerGroup, staggerItem } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { skills, profile } from '@/data/portfolio';
import type { SkillCategory } from '@/types';

const GROUPS: { key: SkillCategory; index: string; label: string; note: string }[] = [
  { key: 'frontend', index: '01', label: 'Frontend', note: 'Interfaces y experiencia de usuario' },
  { key: 'backend', index: '02', label: 'Backend', note: 'APIs, autenticación y lógica de negocio' },
  { key: 'database', index: '03', label: 'Bases de datos', note: 'Modelado, consultas y persistencia' },
  { key: 'tools', index: '04', label: 'Herramientas', note: 'Entorno de trabajo y despliegue' },
];

/**
 * Se eliminó el filtro por categoría. Con 28 tecnologías repartidas en
 * cuatro grupos, filtrar esconde información y obliga a hacer clic para
 * ver algo que cabe entero en una pantalla. Mostrarlas agrupadas comunica
 * la misma jerarquía sin pedirle nada al visitante.
 */
export default function Skills() {
  return (
    <>
      <SEO
        title={`Habilidades — ${profile.fullName}`}
        description="Tecnologías con las que construyo: frontend, backend, bases de datos y herramientas."
      />

      <PageHeader
        eyebrow="Capacidades técnicas"
        title="Stack"
        description="Del frontend a la base de datos. Ordenado por dónde lo uso, no por cuánto me gusta."
      />

      <div className="shell pb-24">
        {GROUPS.map((group) => {
          const items = skills.filter((skill) => skill.category === group.key);
          if (items.length === 0) return null;

          return (
            <section key={group.key} className="border-t border-[var(--color-border)] py-10 md:py-12">
              <div className="grid gap-6 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10">
                <header>
                  <div className="flex items-baseline gap-3">
                    <span className="t-num text-xs text-[var(--color-muted)]">{group.index}</span>
                    <h2 className="t-h3 text-[var(--color-paper)]">{group.label}</h2>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
                    {group.note}
                  </p>
                  <p className="t-num mt-3 text-xs text-[var(--color-muted)]">
                    {String(items.length).padStart(2, '0')} tecnologías
                  </p>
                </header>

                <StaggerGroup
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"
                  staggerDelay={0.03}
                >
                  {items.map((skill) => (
                    <motion.div key={`${group.key}-${skill.name}`} variants={staggerItem}>
                      <SkillCard name={skill.name} />
                    </motion.div>
                  ))}
                </StaggerGroup>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
