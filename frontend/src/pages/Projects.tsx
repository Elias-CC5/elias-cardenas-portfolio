import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiFolder } from 'react-icons/fi';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiReactquery,
  SiRedux,
} from 'react-icons/si';
import SEO from '@/components/layout/SEO';
import Button from '@/components/ui/Button';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
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

const TECH_ICONS: Record<string, React.ReactNode> = {
  'NEXT.JS': <SiNextdotjs size={12} />,
  'REACT': <SiReact size={12} className="text-cyan-500" />,
  'TYPESCRIPT': <SiTypescript size={12} className="text-blue-500" />,
  'TAILWIND CSS': <SiTailwindcss size={12} className="text-sky-500" />,
  'FRAMER MOTION': <SiFramer size={12} />,
  'TANSTACK QUERY': <SiReactquery size={12} className="text-red-500" />,
  'ZUSTAND': <SiRedux size={12} className="text-purple-500" />,
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const catalogRef = useRef<HTMLDivElement>(null);

  const filtered = projects.filter((project) => matches(project.status, filter));

  const marqueeImages = projects
    .map((p) => p.coverImage || p.image || p.thumbnail || '')
    .filter(Boolean);

  const handleScrollToWork = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full pt-20">
      <SEO
        title={`Proyectos — ${profile.fullName}`}
        description="Proyectos full stack en producción y trabajo académico: arquitectura backend, autenticación e interfaces."
      />

      {/* 1. HERO INICIAL */}
      <AnimatedMarqueeHero
        tagline={`Portafolio Selección ${new Date().getFullYear()}`}
        title={
          <>
            Proyectos Destacados y <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-paper)] via-[var(--color-paper-dim)] to-[var(--color-muted)]">
              Experiencias Digitales
            </span>
          </>
        }
        description="Explora desarrollos full stack, plataformas interactivas y arquitecturas modernas creadas con React, TypeScript y herramientas de vanguardia."
        ctaText="Explorar Proyectos"
        images={marqueeImages}
        onCtaClick={handleScrollToWork}
      />

      {/* 2. CABECERA Y FILTROS */}
      <div ref={catalogRef} className="shell pt-16 pb-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="t-label text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Catálogo
            </span>
            <h2 className="t-h2 mt-1 text-[var(--color-paper)]">Explora por Categoría</h2>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div
              role="group"
              aria-label="Filtrar proyectos"
              className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/40 p-1.5 backdrop-blur-md"
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

            <p className="t-num text-xs text-[var(--color-muted)]">
              {filtered.length} / {projects.length} PROYECTOS
            </p>
          </div>
        </div>
      </div>

      {/* 3. LISTADO CON STORY SCROLL DE COLOR ADAPTATIVO */}
      <FlowArt aria-label="Catálogo interactivo de proyectos">
        {filtered.map((project, index) => {
          const imageUrl = project.coverImage || project.image || project.thumbnail;
          const formattedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
          const isCompleted = project.status === 'completed';

          // Color de fondo dinámico según la app (o fallback a oscuro)
          const sectionBg = project.bgColor || '#09090b';
          const isLightBg = project.textColor === 'light' || project.bgColor?.toLowerCase().includes('f');

          // Estilos condicionales de contraste según el fondo
          const titleColor = isLightBg ? 'text-neutral-900' : 'text-white';
          const bodyColor = isLightBg ? 'text-neutral-600' : 'text-neutral-400';
          const metaColor = isLightBg ? 'text-neutral-800' : 'text-neutral-200';
          const labelColor = isLightBg ? 'text-neutral-500' : 'text-neutral-500';
          const borderColor = isLightBg ? 'border-neutral-300/80' : 'border-white/10';
          const badgeBg = isLightBg ? 'bg-black/5 border-black/10 text-neutral-800' : 'bg-white/10 border-white/15 text-white';

          return (
            <FlowSection
              key={project.id || project.title}
              aria-label={project.title}
              style={{ backgroundColor: sectionBg, transition: 'background-color 0.4s ease' }}
              className="border-b border-white/5"
            >
              <article className="group relative flex flex-col justify-between h-full gap-6 py-6">
                {project.featured && (
                  <div className="self-start">
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase font-semibold ${badgeBg}`}
                    >
                      Destacado
                    </span>
                  </div>
                )}

                {/* MOCKUP MACBOOK PRO */}
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="relative w-full max-w-[850px] mx-auto my-auto px-4 block cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[20px] border-[10px] border-[#18181b] bg-[#09090b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                    {/* Notch & Cámara */}
                    <div className="absolute top-0 left-1/2 z-30 flex h-4 w-28 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#18181b]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center">
                        <div className="h-0.5 w-0.5 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    <div className="relative flex h-full w-full items-center justify-center bg-[#0d0d0e] p-1">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="h-full w-full object-contain object-top rounded-t-[8px]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-400">
                          <FiFolder size={40} />
                        </div>
                      )}
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
                  </div>

                  {/* Base Laptop */}
                  <div className="relative h-3.5 w-[104%] -left-[2%] rounded-b-2xl bg-gradient-to-b from-[#27272a] via-[#1f1f22] to-[#121214] border-t border-white/10 shadow-xl">
                    <div className="absolute top-0 left-1/2 h-2 w-20 -translate-x-1/2 rounded-b-md bg-[#09090b]/80 border-b border-white/5" />
                    <div className="absolute -bottom-1 left-8 h-1 w-12 rounded-full bg-black/40 blur-[1px]" />
                    <div className="absolute -bottom-1 right-8 h-1 w-12 rounded-full bg-black/40 blur-[1px]" />
                  </div>
                </Link>

                {/* DETALLES CON CONTRASTE DINÁMICO */}
                <div className="grid grid-cols-1 gap-8 pt-2 lg:grid-cols-12 max-w-[950px] mx-auto w-full">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className={`flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase ${labelColor}`}>
                        <span>{formattedIndex}</span>
                        <span>—</span>
                        <span>{project.subtitle || project.client || 'PROYECTO'}</span>
                      </div>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <Link to={`/proyectos/${project.slug}`}>
                          <h3 className={`text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl leading-tight transition-opacity hover:opacity-80 ${titleColor}`}>
                            {project.title}
                          </h3>
                        </Link>

                        <Link
                          to={`/proyectos/${project.slug}`}
                          aria-label={`Ver detalle de ${project.title}`}
                          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center transition-transform hover:scale-110 ${titleColor}`}
                        >
                          <FiArrowUpRight size={26} />
                        </Link>
                      </div>

                      <p className={`mt-3 text-xs md:text-sm leading-relaxed font-normal ${bodyColor}`}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 pt-4 lg:pt-0 ${borderColor}`}>
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className={`flex items-center justify-between border-b pb-1.5 ${borderColor}`}>
                        <span className={`uppercase tracking-widest ${labelColor}`}>ROL</span>
                        <span className={`font-medium ${metaColor}`}>
                          {project.role || 'Arquitectura, backend y frontend'}
                        </span>
                      </div>

                      <div className={`flex items-center justify-between border-b pb-1.5 ${borderColor}`}>
                        <span className={`uppercase tracking-widest ${labelColor}`}>TIPO</span>
                        <span className={`font-medium ${metaColor}`}>{project.type || 'Individual'}</span>
                      </div>

                      <div className={`flex items-center justify-between border-b pb-1.5 ${borderColor}`}>
                        <span className={`uppercase tracking-widest ${labelColor}`}>PERIODO</span>
                        <span className={`font-medium ${metaColor}`}>{project.period || '2026'}</span>
                      </div>

                      <div className={`flex items-center justify-between border-b pb-1.5 ${borderColor}`}>
                        <span className={`uppercase tracking-widest ${labelColor}`}>ESTADO</span>
                        <span className={`font-medium ${metaColor}`}>
                          {isCompleted ? 'Completado' : 'En curso'}
                        </span>
                      </div>
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap items-center gap-1.5">
                        {project.tags.map((tag: string) => {
                          const upperTag = tag.toUpperCase();
                          return (
                            <span
                              key={tag}
                              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider uppercase ${badgeBg}`}
                            >
                              {TECH_ICONS[upperTag] || null}
                              <span>{tag}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </FlowSection>
          );
        })}
      </FlowArt>

      {/* 4. BANNER FINAL GITHUB */}
      <section className="shell py-28">
        <div className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)]/60 via-[var(--color-ink-2)]/40 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-border-strong)] sm:flex-row sm:items-center md:p-10">
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
    </div>
  );
}