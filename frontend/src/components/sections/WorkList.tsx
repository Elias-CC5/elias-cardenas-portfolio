import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '@/types';
import ProjectCover from './ProjectCover';
import { getSkillIcon } from '@/data/skillIcons';
import { fadeUp, viewportOnce } from '@/lib/motion';

/**
 * Presentación editorial del trabajo.
 *
 * Sustituye al índice de sólo texto. Ese índice tenía dos fallos de fondo:
 * el trabajo no se veía (las capturas sólo aparecían al pasar el cursor, y
 * nunca en táctil), y los cinco proyectos pesaban exactamente igual — cinco
 * filas idénticas es el mismo problema que cinco tarjetas idénticas.
 *
 * Acá hay contraste de escala real: el primer proyecto ocupa el ancho
 * completo con su ficha técnica desplegada, y el resto va en filas
 * asimétricas que alternan de lado. La densidad varía, la lectura tiene
 * ritmo, y el espacio horizontal se usa en vez de quedar vacío.
 */
export default function WorkList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <div className="space-y-20 md:space-y-28">
      <FeaturedProject project={lead} index={0} />
      {rest.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i + 1} flip={i % 2 === 1} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Proyecto destacado — ancho completo
   ------------------------------------------------------------------------- */

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
      <Link to={`/proyectos/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-ink-2)] sm:aspect-[16/9] lg:aspect-[21/9]">
          <ProjectCover
            coverImage={project.coverImage}
            gallery={project.gallery}
            title={project.title}
            tech={project.tech}
            seed={index}
            eager
          />
          <span className="t-label absolute top-5 left-5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-ink)]/80 px-3 py-1.5 text-[var(--color-paper-dim)] backdrop-blur-sm">
            Destacado
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="t-num text-xs text-[var(--color-paper-dim)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="t-label text-[var(--color-paper-dim)]">{project.context}</span>
            </div>

            <h3 className="t-h1 mt-4 flex items-start gap-4 text-[var(--color-paper)]">
              <span>{project.title}</span>
              <FiArrowUpRight
                aria-hidden="true"
                className="mt-2 shrink-0 text-[var(--color-muted)] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-paper)]"
              />
            </h3>

            <p className="t-lead mt-5 max-w-2xl text-[var(--color-paper-dim)]">
              {project.description}
            </p>
          </div>

          <SpecSheet project={project} />
        </div>
      </Link>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------
   Fila asimétrica
   ------------------------------------------------------------------------- */

function ProjectRow({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  return (
    <motion.article initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
      <Link
        to={`/proyectos/${project.slug}`}
        className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      >
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-ink-2)] lg:col-span-7 lg:aspect-[16/10] ${
            flip ? 'lg:order-2' : ''
          }`}
        >
          <ProjectCover
            coverImage={project.coverImage}
            gallery={project.gallery}
            title={project.title}
            tech={project.tech}
            seed={index}
          />
        </div>

        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <div className="flex items-baseline gap-4">
            <span className="t-num text-xs text-[var(--color-paper-dim)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="t-label text-[var(--color-muted)]">{project.period}</span>
          </div>

          <h3 className="t-h2 mt-3 flex items-start gap-3 text-[var(--color-paper)]">
            <span>{project.title}</span>
            <FiArrowUpRight
              aria-hidden="true"
              size={20}
              className="mt-1.5 shrink-0 text-[var(--color-muted)] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-paper)]"
            />
          </h3>

          {project.context && (
            <p className="mt-2 text-sm text-[var(--color-paper-dim)]">{project.context}</p>
          )}

          <p className="t-body mt-4 text-[var(--color-paper-dim)]">{project.description}</p>

          <TechRow tech={project.tech} />
        </div>
      </Link>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------
   Ficha técnica — la firma visual del sitio
   ------------------------------------------------------------------------- */

function SpecSheet({ project }: { project: Project }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Rol', value: project.myRole },
    { label: 'Tipo', value: project.teamType === 'team' ? 'En equipo' : 'Individual' },
    { label: 'Periodo', value: project.period ?? '—' },
    { label: 'Estado', value: project.status === 'completed' ? 'Completado' : 'En curso' },
  ];

  return (
    <dl className="border-t border-[var(--color-border)]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-baseline justify-between gap-6 border-b border-[var(--color-border)] py-3"
        >
          <dt className="t-label shrink-0 text-[var(--color-muted)]">{row.label}</dt>
          <dd className="text-right text-[0.8125rem] text-[var(--color-paper)]">{row.value}</dd>
        </div>
      ))}
      <div className="pt-4">
        <TechRow tech={project.tech} limit={7} />
      </div>
    </dl>
  );
}

/**
 * Stack con los iconos de marca. Es la única fuente de color de la maqueta
 * y no es decorativa: identifica la tecnología más rápido que el texto.
 */
function TechRow({ tech, limit = 5 }: { tech: string[]; limit?: number }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2.5">
      {tech.slice(0, limit).map((name) => {
        const { icon: Icon, color } = getSkillIcon(name);
        return (
          <span key={name} className="flex items-center gap-1.5">
            <Icon size={14} style={{ color }} aria-hidden="true" className="shrink-0" />
            <span className="t-label text-[var(--color-paper-dim)]">{name}</span>
          </span>
        );
      })}
      {tech.length > limit && (
        <span className="t-label text-[var(--color-muted)]">+{tech.length - limit}</span>
      )}
    </div>
  );
}
