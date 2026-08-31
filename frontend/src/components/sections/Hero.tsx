import { useCallback, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { profile, stats } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import CountUp from '@/components/ui/CountUp';
import { duration, ease } from '@/lib/motion';

/**
 * Portada — retrato a sangre por el borde derecho.
 *
 * El movimiento está orquestado como una sola entrada, no como un puñado
 * de animaciones sueltas:
 *
 *  1. El retrato se revela con un barrido de `clip-path` desde la derecha
 *     mientras se asienta de 1.06 a 1. Es el gesto más largo (1,2 s) y el
 *     que da el tono.
 *  2. El titular entra línea por línea desde una máscara.
 *  3. Un subrayado en color señal se traza bajo "a las 3 a.m." cuando la
 *     última línea aterriza. Es el único acento de color de la sección.
 *  4. Las cifras cuentan desde cero al entrar.
 *
 * Además el retrato responde al puntero: se desplaza unos píxeles en
 * sentido contrario al cursor. Da profundidad sin mover nada que el
 * visitante esté leyendo — sólo `transform`, y desactivado en táctil y
 * con `prefers-reduced-motion`.
 */

const HEADLINE_LINES = ['Construyo APIs,', 'sistemas y UIs', 'que no se caen', 'a las 3 a.m.'];

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
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Parallax de puntero. Los valores viven en motion values: mover el
  // ratón no dispara ni un render de React.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 24, mass: 0.6 };
  const imageX = useSpring(useTransform(pointerX, [-0.5, 0.5], [16, -16]), springCfg);
  const imageY = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), springCfg);

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (reduced || event.pointerType !== 'mouse') return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [reduced, pointerX, pointerY],
  );

  const onPointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const lastLine = HEADLINE_LINES.length - 1;

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-svh w-full overflow-hidden"
    >
      <div className="grid min-h-svh w-full items-center lg:grid-cols-2">
        {/* ---------- Columna de texto ---------- */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col justify-center px-6 pt-32 pb-16 sm:px-12 md:px-16 lg:py-0 xl:px-24"
        >
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
                  className="relative inline-block"
                  initial={{ y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: duration.slow,
                    delay: 0.18 + i * 0.075,
                    ease: ease.outExpo,
                  }}
                >
                  {text}
                  {i === lastLine && (
                    <>
                      {/* Único acento de color de la portada: se traza
                          cuando la última línea termina de aterrizar. */}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.95, ease: ease.outExpo }}
                        className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left rounded-full bg-[var(--color-signal)]"
                      />
                      <motion.span
                        animate={reduced ? undefined : { opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                        className="ml-1.5 inline-block h-[0.72em] w-[3px] translate-y-[0.04em] bg-[var(--color-paper)] align-baseline"
                      />
                    </>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            {...riseIn(0.9, 8)}
            className="mt-8 h-px w-8 bg-[var(--color-border-strong)]"
          />

          <motion.p
            {...riseIn(0.96)}
            className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-[var(--color-paper-dim)] sm:text-sm"
          >
            {profile.shortAbout}
          </motion.p>

          <motion.div {...riseIn(1.04)} className="mt-8 flex flex-wrap items-center gap-3">
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

          <motion.dl
            {...riseIn(1.12)}
            className="mt-14 flex flex-wrap items-start gap-x-12 gap-y-6 border-t border-[var(--color-border)] pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="t-num text-2xl font-medium text-[var(--color-paper)]">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="t-label mt-1.5 text-[var(--color-muted)]">{stat.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Retrato a sangre ---------- */}
        <motion.div
          style={{ y: scrollY }}
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 0% 100%)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.2, ease: ease.outExpo }}
          className="relative h-[52svh] w-full lg:h-svh"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 hidden w-3/5 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/85 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-[var(--color-ink)] to-transparent lg:hidden"
          />

          <motion.img
            src="/images/elias-profile.jpg"
            alt={profile.fullName}
            width={1400}
            height={1750}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ x: imageX, y: imageY, filter: 'saturate(0.92) contrast(1.03) brightness(0.95)' }}
            initial={reduced ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: ease.outExpo }}
            /* El `scale` inicial deja margen para el desplazamiento del
               puntero: sin él, moverse revelaría el borde del contenedor. */
            className="h-[calc(100%+32px)] w-[calc(100%+32px)] -translate-x-4 -translate-y-4 object-cover object-center"
          />

          <motion.div
            {...riseIn(1.3, 8)}
            className="absolute right-6 bottom-6 z-20 hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3 py-1.5 backdrop-blur-md lg:block"
          >
            <span className="t-label text-[var(--color-paper-dim)]">{profile.fullName}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
