import { useRef, useState, useCallback, type MouseEvent } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Reveal, { StaggerGroup, staggerItem } from '@/components/ui/Reveal';
import SEO from '@/components/layout/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, stats, education, certificates, techStackCore } from '@/data/portfolio';
import { getSkillIcon } from '@/data/skillIcons';
import { FiCalendar, FiTarget, FiShield, FiLayers, FiAward, FiDownload } from 'react-icons/fi';

const PRINCIPLES = [
  {
    icon: FiTarget,
    title: 'Orientado a problemas reales',
    text: 'No escribo código por escribirlo. Cada decisión técnica responde a un problema concreto que hay que resolver.',
  },
  {
    icon: FiShield,
    title: 'Seguridad desde el diseño',
    text: 'Autenticación, control de acceso y validaciones no son un parche al final — son parte del plano desde el primer commit.',
  },
  {
    icon: FiLayers,
    title: 'Arquitectura que escala',
    text: 'Construyo pensando en quién va a mantener este código en seis meses — probablemente yo mismo.',
  },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (py - 0.5) * -8, y: (px - 0.5) * 8 });
    setGlow({ x: px * 100, y: py * 100 });
  }, []);

  const handleLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleLeave} style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 hover:border-[var(--color-accent-bright)]/60 ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(240px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 70%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}

function Photo3D({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 10;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)';
    el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const handleEnter = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.1s ease-out';
  }, []);

  return (
    <div style={{ perspective: '900px' }}>
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-accent)]/25 via-[var(--color-accent)]/10 to-transparent blur-3xl" />
      <span className="absolute -top-3 -left-3 z-20 h-7 w-7 rounded-tl-2xl border-t-2 border-l-2 border-[var(--color-accent-bright)]/70" />
      <span className="absolute -right-3 -bottom-3 z-20 h-7 w-7 rounded-br-2xl border-r-2 border-b-2 border-[var(--color-accent-bright)]/70" />

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onMouseEnter={handleEnter}
        className="relative aspect-[4/5] w-full cursor-default overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/50"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div>
            <p className="text-sm font-medium leading-none text-white">Disponible para proyectos</p>
            <p className="mt-1 font-mono text-[10px] text-white/60">Remoto · Full-time / freelance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <>
      <SEO title={`Sobre mí — ${profile.fullName}`} description={profile.about} />

      <div ref={heroRef} className="relative overflow-hidden px-6 pt-32 pb-24 md:px-12 md:pt-40">
        
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -top-40 left-1/3 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/12 blur-[90px]"
        />
        <div className="pointer-events-none absolute top-1/2 right-0 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]/6 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <PageHeader eyebrow="Quién soy" title="Sobre mí" noPadding />

          <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_1.3fr]">

            {/* COLUMNA IZQUIERDA */}
            <div className="space-y-12">
              <div>
                <Reveal>
                  <motion.div style={{ y: photoY }} className="relative">
                    <Photo3D src="/images/elias-profile.jpg" alt={profile.fullName} />
                  </motion.div>
                </Reveal>

                <StaggerGroup className="mt-6 grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <motion.div key={stat.label} variants={staggerItem}>
                      <TiltCard className="p-4 text-center">
                        <p className="font-display text-2xl font-bold text-[var(--color-paper)]">{stat.value}</p>
                        <p className="mt-1 text-[11px] leading-tight text-[var(--color-muted)]">{stat.label}</p>
                      </TiltCard>
                    </motion.div>
                  ))}
                </StaggerGroup>
              </div>

              <div>
                <Reveal delay={0.42}>
                  <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Stack favorito</h2>
                </Reveal>
                <StaggerGroup className="mt-5 flex flex-wrap gap-2.5" staggerDelay={0.05}>
                  {techStackCore.map((tech) => {
                    const { icon: Icon, color } = getSkillIcon(tech);
                    return (
                      <motion.div
                        key={tech}
                        variants={staggerItem}
                        whileHover={{ y: -3, borderColor: 'var(--color-accent-bright)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex cursor-default items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 font-mono text-sm text-[var(--color-paper-dim)] transition-colors"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                        <Icon size={14} style={{ color }} />
                        {tech}
                      </motion.div>
                    );
                  })}
                </StaggerGroup>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-bright)]">Mi historia</p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">
                  De la curiosidad a la arquitectura
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-base leading-[1.85] text-[var(--color-paper-dim)] md:text-lg">{profile.about}</p>
              </Reveal>

              <Reveal delay={0.18} className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Cómo trabajo</h2>
              </Reveal>
              <StaggerGroup className="mt-5 space-y-3" staggerDelay={0.07}>
                {PRINCIPLES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <motion.div key={p.title} variants={staggerItem}>
                      <TiltCard className="flex items-start gap-4 p-5">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)]">
                          <Icon size={17} />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-[var(--color-paper)]">{p.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[var(--color-paper-dim)]">{p.text}</p>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </StaggerGroup>

              <Reveal delay={0.24} className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Formación</h2>
              </Reveal>
              <div className="mt-5 space-y-3">
                {education.map((edu, i) => (
                  <Reveal key={edu.id} delay={0.28 + i * 0.05}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="flex items-start gap-4 rounded-r-2xl border border-[var(--color-border)] border-l-[var(--color-accent-bright)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-bright)]/40"
                      style={{ borderLeftWidth: '3px' }}
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent-bright)]">
                        <FiCalendar size={17} />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-[var(--color-paper)]">{edu.institution}</p>
                        {edu.description && (
                          <p className="mt-1 text-sm text-[var(--color-paper-dim)]">{edu.description}</p>
                        )}
                        <p className="mt-1.5 font-mono text-xs text-[var(--color-muted)]">{edu.period}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>

          {/* SECCIÓN DE CERTIFICACIONES */}
          <div className="mt-24 border-t border-[var(--color-border)] pt-16">
            <Reveal delay={0.32}>
              <h2 className="text-center font-display text-3xl font-semibold text-[var(--color-paper)] md:text-4xl">
                Certificaciones
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert: any, i) => {
                const cardColor = cert.color || 'var(--color-accent-bright)';
                const fullLogoUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${cert.logo}`;
                
                return (
                  <Reveal key={cert.id} delay={0.1 + i * 0.04}>
                    <motion.div
                      whileHover={{ y: -6, borderColor: cardColor }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="flex h-full flex-col rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl shadow-black/10 transition-colors"
                    >
                      {/* CONTENEDOR DE IMAGEN PANORÁMICO OPTIMIZADO PARA LLENAR EL ESPACIO */}
                      <div className="relative flex aspect-[16/9] w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/40 border border-[var(--color-border)]">
                        <div 
                          className="absolute inset-0 opacity-10 blur-2xl transition-opacity pointer-events-none"
                          style={{ backgroundColor: cardColor }}
                        />

                        {cert.logo ? (
                          <img 
                            src={fullLogoUrl} 
                            alt={`Logo de ${cert.issuer}`} 
                            className="h-full w-full object-contain scale-95 select-none transition-transform duration-300 hover:scale-100"
                          />
                        ) : (
                          <FiAward size={52} style={{ color: cardColor }} />
                        )}

                        <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--color-paper-dim)] border border-[var(--color-border)]">
                          {cert.category}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display text-base font-semibold text-[var(--color-paper)] line-clamp-2">
                            {cert.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-paper-dim)] flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: cardColor }} />
                            {cert.issuer}
                          </p>
                          <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">
                            Emitido en {cert.issueDate}
                          </p>
                        </div>
                        
                        <div className="mt-6">
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 font-mono text-xs text-[var(--color-paper-dim)] transition-colors hover:bg-[var(--color-accent)]/5"
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = cardColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                          >
                            <FiDownload size={14} />
                            Ver Certificado (PDF)
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}