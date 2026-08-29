import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HandwritingSvg } from '@/components/ui/handwriting-svg';
import { profile } from '@/data/portfolio';

/**
 * Splash de introducción.
 *
 * Comparte vocabulario visual con el Hero (boot log monoespaciado, blanco
 * y negro puro, misma sensación de "sistema arrancando") para que la
 * transición entre ambos se sienta como una sola pieza, no dos efectos
 * distintos pegados con cinta.
 *
 * Capas, de atrás hacia adelante:
 *  1. Fondo: grano estático + retícula de puntos muy tenue + viñeta.
 *  2. Resplandor ambiental que "respira" detrás de la firma (única
 *     animación en loop — todo lo demás ocurre una sola vez).
 *  3. Boot log abajo a la izquierda + barra de progreso real abajo a la
 *     derecha (el % está atado al tiempo transcurrido, no es decorativo).
 *  4. Firma manuscrita centrada; al terminar de dibujarse aparece el rol
 *     real (`profile.role`) debajo.
 *  5. Salida: un barrido horizontal tipo CRT justo antes del fade final,
 *     en vez de un simple opacity a 0.
 *
 * Con `prefers-reduced-motion` se acorta drásticamente (≈900ms), sin
 * loop de respiración, sin stagger del log ni barrido — va directo al
 * estado final y se retira con un fade simple.
 *
 * Añadido funcional (no solo visual): bloquea el scroll del body
 * mientras el splash está visible, y expone un `role="status"` para
 * lectores de pantalla, que antes no tenían ninguna señal de carga.
 */

const BOOT_LINES = [
  { text: '$ elias-cardenas --init', tone: 'muted' as const },
  { text: '✓ ensamblando interfaz', tone: 'ok' as const },
  { text: '✓ sin errores', tone: 'ok' as const },
  { text: '✓ listo', tone: 'ok' as const },
];

const DRAW_START_MS = 250; // debe coincidir con cuándo "empieza" a leerse la firma
const DRAW_DURATION_MS = 2200; // debe coincidir con el prop `duration={2.2}` de HandwritingSvg
const SUBTITLE_DELAY_MS = DRAW_START_MS + DRAW_DURATION_MS + 150;
const SWEEP_MS = 450;
const TOTAL_MS = SUBTITLE_DELAY_MS + 300 + SWEEP_MS;
const REDUCED_TOTAL_MS = 900;

export default function IntroSplash() {
  const reduced = useReducedMotion();

  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'boot' | 'sweep'>('boot');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [percent, setPercent] = useState(0);

  // Cronograma de la secuencia
  useEffect(() => {
    if (reduced) {
      setPercent(100);
      setShowSubtitle(true);
      const t = setTimeout(() => setIsVisible(false), REDUCED_TOTAL_MS);
      return () => clearTimeout(t);
    }

    const timers = [
      setTimeout(() => setShowSubtitle(true), SUBTITLE_DELAY_MS),
      setTimeout(() => setPhase('sweep'), TOTAL_MS - SWEEP_MS),
      setTimeout(() => setIsVisible(false), TOTAL_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // Progreso real atado al tiempo transcurrido (no es una cifra inventada)
  useEffect(() => {
    if (reduced) return;
    const start = Date.now();
    const target = TOTAL_MS - SWEEP_MS;
    const iv = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / target) * 100));
      setPercent(pct);
      if (pct >= 100) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, [reduced]);

  // Bloquea el scroll de fondo mientras el splash cubre la pantalla
  useEffect(() => {
    if (!isVisible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-splash"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-ink)]"
        >
          <span className="sr-only">Cargando el portafolio de {profile.fullName}…</span>

          {/* ---------- Fondo ambiental ---------- */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-border-strong) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-ink) 100%)' }}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay"
          >
            <filter id="splash-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#splash-grain)" />
          </svg>

          {/* ---------- Firma ---------- */}
          <div className="relative flex flex-col items-center">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-[var(--color-paper)] blur-[80px]"
              animate={
                reduced
                  ? { opacity: 0.15 }
                  : { opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 1] }
              }
              transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <HandwritingSvg
              text="Elias Cardenas"
              width={450}
              height={180}
              fontSize={64}
              strokeWidth={1.8}
              duration={2.2}
              className="text-[var(--color-paper)]"
            />

            <motion.p
              aria-hidden="true"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 6 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mt-3 font-mono text-[11px] tracking-[0.2em] text-[var(--color-muted)] uppercase"
            >
              {profile.role}
            </motion.p>
          </div>

          {/* ---------- Boot log ---------- */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-6 space-y-1 font-mono text-[11px] sm:left-10 sm:text-xs"
          >
            {BOOT_LINES.map((line, i) => (
              <motion.p
                key={line.text}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduced ? 0 : i * 0.15, duration: 0.3 }}
                className={line.tone === 'ok' ? 'text-[var(--color-paper)]' : 'text-[var(--color-muted)]'}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          {/* ---------- Progreso real ---------- */}
          <div
            aria-hidden="true"
            className="absolute right-6 bottom-8 flex items-center gap-3 font-mono text-[11px] text-[var(--color-muted)] sm:right-10"
          >
            <span className="w-9 text-right tabular-nums">{percent}%</span>
            <div className="h-px w-24 overflow-hidden bg-[var(--color-border)] sm:w-32">
              <div
                className="h-full bg-[var(--color-paper)] transition-[width] duration-150 ease-linear"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* ---------- Barrido de salida, tipo CRT ---------- */}
          {phase === 'sweep' && !reduced && (
            <motion.div
              aria-hidden="true"
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: SWEEP_MS / 1000, ease: 'easeIn' }}
              className="absolute inset-x-0 h-px bg-[var(--color-paper)] shadow-[0_0_20px_2px_var(--color-paper)]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}