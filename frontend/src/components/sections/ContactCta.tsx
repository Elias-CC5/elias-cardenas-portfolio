import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { profile } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Cierre de la experiencia. Una sola idea y un solo objetivo: escribirle.
 * El formulario vive en /contacto; duplicarlo acá dividiría la atención.
 *
 * El titular se parte en dos: cuando la tapa del Macbook baja sobre la
 * sección, la primera línea se va hacia la izquierda y arriba, y la segunda
 * hacia la derecha y abajo, abriendo un corredor por el centro para que la
 * laptop pase. Al terminar de pasar, las dos vuelven a su sitio.
 *
 * El progreso está atado a la posición de la sección, no a un temporizador:
 * la apertura ocurre exactamente cuando hay solapamiento y se revierte sola
 * al subir. Sólo se animan `x` e `y`, así que corre en el compositor.
 */
export default function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  // 0 → la sección asoma · 0.5 → la laptop la cruza · 1 → ya pasó
  const KEY = [0, 0.5, 1];
  const leftX = useTransform(scrollYProgress, KEY, [0, -190, 0]);
  const leftY = useTransform(scrollYProgress, KEY, [0, -70, 0]);
  const rightX = useTransform(scrollYProgress, KEY, [0, 190, 0]);
  const rightY = useTransform(scrollYProgress, KEY, [0, 70, 0]);
  const eyebrowY = useTransform(scrollYProgress, KEY, [0, -50, 0]);
  const actionsY = useTransform(scrollYProgress, KEY, [0, 60, 0]);

  const split = (x: typeof leftX, y: typeof leftY) =>
    reduced ? undefined : { x, y };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.07)}
      className="shell section relative z-0 border-t border-[var(--color-border)] text-center"
    >
      <motion.p
        variants={fadeUp}
        style={reduced ? undefined : { y: eyebrowY }}
        className="t-label text-[var(--color-paper-dim)]"
      >
        Siguiente paso
      </motion.p>

      <motion.h2 variants={fadeUp} className="t-h1 mt-6 text-[var(--color-paper)]">
        <motion.span style={split(leftX, leftY)} className="block will-change-transform">
          ¿Tenés algo que construir?
        </motion.span>
        <motion.span
          style={split(rightX, rightY)}
          className="block text-[var(--color-muted)] will-change-transform"
        >
          Contame qué se te rompe.
        </motion.span>
      </motion.h2>

      <motion.div
        variants={fadeUp}
        style={reduced ? undefined : { y: actionsY }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Button to="/contacto" variant="primary">
          Escribime{' '}
          <FiArrowRight
            aria-hidden="true"
            className="transition-transform duration-[var(--duration-quick)] group-hover:translate-x-0.5"
          />
        </Button>
        <Button href={`mailto:${profile.email}`} variant="ghost">
          {profile.email}
        </Button>
      </motion.div>
    </motion.section>
  );
}
