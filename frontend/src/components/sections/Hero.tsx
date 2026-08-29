  import { useRef } from 'react';
  import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
  import { FiArrowRight, FiDownload } from 'react-icons/fi';
  import { profile, stats } from '@/data/portfolio';
  import Button from '@/components/ui/Button';
  import { duration, ease } from '@/lib/motion';

  /**
   * Portada — retrato a sangre.
   *
   * Vuelve a la composición original, que era la que funcionaba: el texto
   * ocupa la mitad izquierda y la fotografía sangra por el borde derecho de
   * la ventana, sin marco ni esquinas redondeadas. La foto no está "puesta
   * en" la página: es la página. Un degradado la funde con el negro por su
   * lado izquierdo, así que no hay corte duro entre imagen y tipografía.
   *
   * Lo que se conserva de las versiones intermedias, porque no era discutible:
   * - Colores del design system en vez de `zinc-*` escritos a mano. El Hero
   *   hablaba un idioma visual distinto al del resto del sitio.
   * - El titular ya no se escribe carácter a carácter. Escribirlo a 35 ms por
   *   letra tardaba ~1,9 s en mostrar la única frase que hay que leer sí o
   *   sí, y además retrasaba el LCP. El cursor intermitente se queda: da el
   *   registro de terminal sin cobrar la espera.
   * - Entrada por líneas enmascaradas: sólo anima `transform`.
   */

  const HEADLINE_LINES = ['Construyo APIs,', 'sistemas y UIs que no', 'se caen a las 3 a.m.'];

  function riseIn(delay: number, y = 14) {
    return {
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { duration: duration.normal, delay, ease: ease.outQuart },
    };
  }

  export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
      <section ref={ref} className="relative min-h-svh w-full overflow-hidden">
        <div className="grid min-h-svh w-full items-center lg:grid-cols-2">
          {/* ---------- Columna de texto ---------- */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex flex-col justify-center px-6 pt-32 pb-16 sm:px-12 md:px-16 lg:py-0 xl:px-24"
          >
            {/* Chip de disponibilidad */}
            <motion.div
              {...riseIn(0.05, 10)}
              className="mb-8 inline-flex max-w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-signal)] opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[var(--color-paper-dim)]">
                {profile.availability}
              </span>
            </motion.div>

            <motion.span {...riseIn(0.12, 10)} className="t-label block text-[var(--color-muted)]">
              {profile.role}
            </motion.span>

            <h1 className="t-h1 mt-5 max-w-xl text-[var(--color-paper)]">
              <span className="sr-only">{HEADLINE_LINES.join(' ')}</span>
              {HEADLINE_LINES.map((text, i) => (
                <span key={text} aria-hidden="true" className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className="block"
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: duration.slow,
                      delay: 0.18 + i * 0.075,
                      ease: ease.outExpo,
                    }}
                  >
                    {text}
                    {i === HEADLINE_LINES.length - 1 && (
                      <motion.span
                        animate={reduced ? undefined : { opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                        className="ml-1.5 inline-block h-[0.72em] w-[3px] translate-y-[0.04em] bg-[var(--color-paper)] align-baseline"
                      />
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Regla corta: el remate discreto que separaba titular y bajada */}
            <motion.div {...riseIn(0.46, 8)} className="mt-7 h-px w-8 bg-[var(--color-border-strong)]" />

            <motion.p
              {...riseIn(0.52)}
              className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-[var(--color-paper-dim)] sm:text-sm"
            >
              {profile.shortAbout}
            </motion.p>

            <motion.div {...riseIn(0.6)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/contacto" variant="primary">
                Hablemos
                <FiArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="/cv-elias-cardenas.pdf" download external variant="secondary">
                Descargar CV <FiDownload aria-hidden="true" />
              </Button>
            </motion.div>

            {/* Cifras */}
            <motion.dl
              {...riseIn(0.7)}
              className="mt-14 flex flex-wrap items-start gap-x-12 gap-y-6 border-t border-[var(--color-border)] pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="t-num text-2xl font-medium text-[var(--color-paper)]">
                    {stat.value}
                  </dd>
                  <dt className="t-label mt-1.5 text-[var(--color-muted)]">{stat.label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ---------- Retrato a sangre ---------- */}
          <motion.div
            style={{ y: imageY }}
            className="relative h-[52svh] w-full lg:h-svh"
          >
            {/* Degradados de fundido: la foto se funde con el negro por la
                izquierda en escritorio y por abajo en móvil. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-10 hidden w-2/5 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/75 to-transparent lg:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-[var(--color-ink)] to-transparent lg:hidden"
            />

            <img
              src="/images/elias-profile.jpg"
              alt={profile.fullName}
              width={1400}
              height={1750}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
              style={{ filter: 'saturate(0.92) contrast(1.03) brightness(0.95)' }}
            />

            <div className="absolute right-6 bottom-6 z-20 hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3 py-1.5 backdrop-blur-md lg:block">
              <span className="t-label text-[var(--color-paper-dim)]">{profile.fullName}</span>
            </div>
          </motion.div>
        </div>

        {/* ---------- Estado, abajo a la izquierda ---------- */}
        <motion.div
          {...riseIn(0.9, 8)}
          className="absolute bottom-6 left-6 z-20 hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/60 px-3.5 py-1.5 backdrop-blur-md lg:flex xl:left-24"
        >
          <span className="h-1 w-1 rounded-full bg-[var(--color-signal)]" />
          <span className="t-label text-[var(--color-muted)]">no se cae a las 3 a.m.</span>
        </motion.div>
      </section>
    );
  }
