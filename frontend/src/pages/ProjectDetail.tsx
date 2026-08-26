import { useParams, Link, Navigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiUser,
  FiCalendar,
  FiLayers,
  FiCheck,
} from 'react-icons/fi';
import SEO from '@/components/layout/SEO';
import Reveal, { StaggerGroup, staggerItem } from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ProjectCover from '@/components/sections/ProjectCover';
import ProjectGallery from '@/components/sections/ProjectGallery';
import { getSkillIcon } from '@/data/skillIcons';
import { projects, profile } from '@/data/portfolio';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const index = projects.findIndex((p) => p.slug === slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SEO title={`${project.title} — ${profile.fullName}`} description={project.description} />

      {/* Hero header with ambient glow */}
      <div ref={heroRef} className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
        <motion.div style={{ opacity: headerOpacity }} className="shell shell-narrow relative z-10">
          <Reveal>
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
            >
              <FiArrowLeft size={15} /> Volver a proyectos
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-2">
            {project.status === 'completed' ? (
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-success)]/10 px-3 py-1 font-mono text-[11px] text-[var(--color-success)]">
                <FiCheckCircle size={11} /> Completado
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-warn)]/10 px-3 py-1 font-mono text-[11px] text-[var(--color-warn)]">
                <FiClock size={11} /> En curso
              </span>
            )}
            <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]">
              {project.teamType === 'team' ? <FiUsers size={11} /> : <FiUser size={11} />}
              {project.teamType === 'team' ? 'Proyecto en equipo' : 'Proyecto individual'}
            </span>
            {project.period && (
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-[11px] text-[var(--color-paper-dim)]">
                <FiCalendar size={11} /> {project.period}
              </span>
            )}
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="t-h1 mt-6 text-[var(--color-paper)]">{project.title}</h1>
          </Reveal>
          {project.context && (
            <Reveal delay={0.4}>
              <p className="mt-4 text-lg text-[var(--color-accent-bright)]">{project.context}</p>
            </Reveal>
          )}
        </motion.div>
      </div>

      <article className="pb-24">
        <div className="shell shell-narrow">
          {/* Cover image / Gallery */}
          <Reveal delay={0.1}>
            <div className="relative">
              {project.gallery && project.gallery.length > 0 ? (
                <ProjectGallery images={project.gallery} title={project.title} />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-2xl shadow-black/40">
                  <ProjectCover coverImage={project.coverImage} title={project.title} seed={index} />
                </div>
              )}
            </div>
          </Reveal>

          {/* Links */}
          {(project.repoUrl || project.demoUrl) && (
            <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-3">
              {project.repoUrl && (
                <Button variant="secondary" href={project.repoUrl} external>
                  <FiGithub size={15} /> Ver repositorio
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="primary" href={project.demoUrl} external>
                  <FiExternalLink size={15} /> Ver demo
                </Button>
              )}
            </Reveal>
          )}

          {/* Content grid */}
          <div className="mt-16 grid gap-12 md:grid-cols-[1fr_300px]">
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">El proyecto</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Descripción</h2>
                <p className="mt-4 text-base leading-[1.85] text-[var(--color-paper-dim)] md:text-lg">
                  {project.longDescription ?? project.description}
                </p>
              </Reveal>

              {project.features && project.features.length > 0 && (
                <Reveal delay={0.08} className="mt-12">
                  <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Características principales</h2>
                  <StaggerGroup className="mt-5 grid gap-3 sm:grid-cols-2" staggerDelay={0.06}>
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        whileHover={{ y: -2, borderColor: 'var(--color-accent-bright)' }}
                        className="group flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-paper-dim)] transition-colors duration-300"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)] transition-transform duration-300 group-hover:scale-110">
                          <FiLayers size={12} />
                        </span>
                        {feature}
                      </motion.div>
                    ))}
                  </StaggerGroup>
                </Reveal>
              )}

              <Reveal delay={0.16} className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Lo que hice</h2>
                <StaggerGroup className="mt-5 space-y-3" staggerDelay={0.07}>
                  {project.bullets.map((bullet, i) => (
                    <motion.div
                      key={i}
                      variants={staggerItem}
                      className="flex items-start gap-3 text-sm text-[var(--color-paper-dim)] md:text-base"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
                        <FiCheck size={11} />
                      </span>
                      {bullet}
                    </motion.div>
                  ))}
                </StaggerGroup>
              </Reveal>
            </div>

            {/* Sidebar */}
            <Reveal delay={0.12}>
              <div className="sticky top-28 space-y-5">
                <div className="glass rounded-2xl p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">Mi rol</p>
                  <p className="mt-2 font-display text-lg font-semibold text-[var(--color-paper)]">{project.myRole}</p>
                </div>

                <div className="glass rounded-2xl p-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">Stack tecnológico</p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    {project.tech.map((t) => {
                      const { icon: Icon, color } = getSkillIcon(t);
                      return (
                        <div key={t} className="flex items-center gap-2.5 text-sm text-[var(--color-paper-dim)]">
                          <Icon size={15} style={{ color }} className="shrink-0" />
                          {t}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <div className="mt-24 border-t border-[var(--color-border)] pt-12">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">Sigue explorando</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Otros proyectos</h2>
              </Reveal>
              <StaggerGroup className="mt-6 grid gap-5 sm:grid-cols-2" staggerDelay={0.08}>
                {otherProjects.map((p) => (
                  <motion.div key={p.slug} variants={staggerItem}>
                    <Link
                      to={`/proyectos/${p.slug}`}
                      className="group block h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-bright)]/40"
                    >
                      <p className="font-display text-lg font-semibold text-[var(--color-paper)] transition-colors group-hover:text-[var(--color-accent-bright)]">
                        {p.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-[var(--color-paper-dim)]">{p.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </StaggerGroup>
            </div>
          )}
        </div>
      </article>
    </>
  );
}