import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { profile } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Cierre de la experiencia. Una sola idea y un solo objetivo: escribirle.
 *
 * Cuando la tapa del Macbook baja sobre esta sección, el bloque se aparta
 * para dejarle el centro: las dos líneas del titular se abren en abanico
 * —una a la izquierda, otra a la derecha— y todo el conjunto se desplaza
 * hacia abajo mientras pierde peso. Cuando la laptop termina de pasar,
 * vuelve a su sitio.
 *
 * Por qué se aparta hacia ABAJO y no sólo a los lados: la laptop mide unos
 * 1100 px de ancho dentro de un contenedor de 1312 px. Moverse en
 * horizontal, por mucho que sea, no alcanza para salir de debajo — el
 * centro sólo queda libre si el texto además baja. Ese fue el error de la
 * versión anterior, que sólo abría ±190 px y seguía tapada.
 *
 * El progreso está atado a la posición de la sección y pasa por un spring,
 * así el movimiento tiene inercia en vez de seguir el scroll cuadro a
 * cuadro. Sólo se animan `x`, `y`, `scale` y `opacity`.
 */
export default function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  // El spring le da peso: el texto se aparta y se reacomoda con inercia.
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });

  // 0 → la sección asoma · 0.55 → la laptop la cruza · 1 → ya pasó
  const K = [0, 0.55, 1];

  const eyebrowY = useTransform(p, K, [0, 120, 0]);
  const eyebrowOpacity = useTransform(p, K, [1, 0, 1]);

  const line1X = useTransform(p, K, [0, -240, 0]);
  const line1Y = useTransform(p, K, [0, 150, 0]);
  const line2X = useTransform(p, K, [0, 240, 0]);
  const line2Y = useTransform(p, K, [0, 250, 0]);
  const linesScale = useTransform(p, K, [1, 0.78, 1]);
  const linesOpacity = useTransform(p, K, [1, 0.4, 1]);

  const actionsY = useTransform(p, K, [0, 320, 0]);
  const actionsOpacity = useTransform(p, K, [1, 0.25, 1]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.07)}
      /* El bloque se desplaza hasta 320 px hacia abajo mientras la laptop
         pasa. Ese recorrido es visual (transform), no de layout, así que la
         sección necesita reservar el aire a mano o el contenido invadiría
         el pie de página. */
      className="shell section relative z-0 border-t border-[var(--color-border)] pb-56 text-center md:pb-72"
    >
      <motion.p
        variants={fadeUp}
        style={reduced ? undefined : { y: eyebrowY, opacity: eyebrowOpacity }}
        className="t-label text-[var(--color-paper-dim)]"
      >
        Siguiente paso
      </motion.p>

      <motion.h2 variants={fadeUp} className="t-h1 mt-6 text-[var(--color-paper)]">
        <motion.span
          style={
            reduced
              ? undefined
              : { x: line1X, y: line1Y, scale: linesScale, opacity: linesOpacity }
          }
          className="block origin-right will-change-transform"
        >
          ¿Tenés algo que construir?
        </motion.span>
        <motion.span
          style={
            reduced
              ? undefined
              : { x: line2X, y: line2Y, scale: linesScale, opacity: linesOpacity }
          }
          className="block origin-left text-[var(--color-muted)] will-change-transform"
        >
          Contame qué se te rompe.
        </motion.span>
      </motion.h2>

      <motion.div
        variants={fadeUp}
        style={reduced ? undefined : { y: actionsY, opacity: actionsOpacity }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3 will-change-transform"
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
