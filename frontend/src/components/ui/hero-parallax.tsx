import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import type { MotionValue } from 'motion/react';

export interface ParallaxItem {
  title: string;
  /** Ruta interna del proyecto, p. ej. /proyectos/pyfgroup-alquileres */
  link: string;
  thumbnail: string;
  /** Pie corto: qué muestra esta captura. */
  caption?: string;
}

/**
 * Muro de capturas con parallax.
 *
 * Adaptado del componente original en tres puntos que importaban:
 *
 * 1. Los enlaces eran `<a href>`. Como acá las rutas son internas, eso
 *    provocaba una recarga completa de la SPA en cada clic — se perdía el
 *    estado y volvía a descargarse todo el bundle. Ahora usa el `Link` del
 *    router.
 * 2. Las quince imágenes se cargaban de golpe. Van con `loading="lazy"`,
 *    porque sólo cinco entran en pantalla al principio.
 * 3. Con `prefers-reduced-motion` el muro se queda quieto: la versión
 *    original mueve 1000 px en dos ejes más rotación en tres, que es
 *    exactamente lo que esa preferencia existe para evitar.
 */
export function HeroParallax({
  items,
  header,
}: {
  items: ParallaxItem[];
  header?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const firstRow = items.slice(0, 5);
  const secondRow = items.slice(5, 10);
  const thirdRow = items.slice(10, 15);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 900]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -900]),
    springConfig,
  );
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 380]),
    springConfig,
  );

  const stage = reduced ? undefined : { rotateX, rotateZ, translateY, opacity };

  return (
    <div
      ref={ref}
      className="relative flex flex-col self-auto overflow-hidden py-28 antialiased [perspective:1000px] [transform-style:preserve-3d] md:h-[280vh] md:py-40"
    >
      {header}

      <motion.div style={stage}>
        <Row items={firstRow} translate={translateX} reverse reduced={reduced} />
        <Row items={secondRow} translate={translateXReverse} reduced={reduced} />
        <Row items={thirdRow} translate={translateX} reverse reduced={reduced} />
      </motion.div>
    </div>
  );
}

function Row({
  items,
  translate,
  reverse,
  reduced,
}: {
  items: ParallaxItem[];
  translate: MotionValue<number>;
  reverse?: boolean;
  reduced: boolean | null;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={`mb-12 flex gap-8 md:mb-20 md:gap-20 ${
        reverse ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {items.map((item) => (
        <Card key={`${item.link}-${item.thumbnail}`} item={item} translate={translate} reduced={reduced} />
      ))}
    </div>
  );
}

function Card({
  item,
  translate,
  reduced,
}: {
  item: ParallaxItem;
  translate: MotionValue<number>;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      style={reduced ? undefined : { x: translate }}
      whileHover={reduced ? undefined : { y: -18 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-ink-2)] md:h-80 md:w-[28rem]"
    >
      <Link to={item.link} className="block h-full w-full">
        <img
          src={item.thumbnail}
          alt={item.caption ? `${item.title} — ${item.caption}` : item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-95"
        />

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="t-h3 text-[var(--color-paper)]">{item.title}</p>
          {item.caption && (
            <p className="t-label mt-1.5 text-[var(--color-paper-dim)]">{item.caption}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
