import { motion } from 'framer-motion';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { ease } from '@/lib/motion';

/**
 * Foto con profundidad.
 *
 * La tarjeta se inclina siguiendo al puntero y dentro de ella cada capa vive
 * a una altura distinta del eje Z, así que se desplazan a velocidades
 * distintas — que es lo que el ojo lee como volumen.
 *
 *   -36px  halo, por detrás del marco
 *     0px  la foto
 *   +55px  la chapa con el pie, flotando sobre el marco
 *
 * La versión anterior tenía además un reflejo especular que reconstruía un
 * `radial-gradient` en cada `mousemove`. Un degradado nuevo obliga a repintar
 * la capa entera en cada cuadro, y era la causa principal del tirón al mover
 * el cursor sobre las fotos. También se fueron el `drop-shadow` del marco y
 * el `backdrop-blur` de la chapa: los dos son filtros, y un filtro se
 * recalcula cada vez que la capa se transforma. Lo que queda —`rotateX` y
 * `rotateY` sobre motion values— no pasa por el ciclo de render de React ni
 * por el layout del navegador.
 *
 * La inclinación es de ±6°: por encima de eso la foto se deforma y se nota el
 * truco. Se apaga sola en punteros táctiles y con `prefers-reduced-motion`.
 */

interface Photo3DProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Chapa flotante sobre la esquina inferior. */
  badge?: string;
  priority?: boolean;
  className?: string;
}

export default function Photo3D({
  src,
  alt,
  width,
  height,
  badge,
  priority = false,
  className = '',
}: Photo3DProps) {
  const tilt = usePointerTilt({ max: 6 });

  return (
    <div className={`relative ${className}`} style={{ perspective: '1100px' }}>
      <motion.div
        ref={tilt.ref}
        {...tilt.handlers}
        style={{ ...tilt.transform, transformStyle: 'preserve-3d' }}
        className="group relative"
      >
        {/* Halo, por detrás del marco */}
        <span
          aria-hidden="true"
          style={{
            transform: 'translateZ(-36px)',
            background:
              'radial-gradient(58% 54% at 50% 50%, var(--fg, #f4f4f5), transparent 72%)',
          }}
          className="pointer-events-none absolute -inset-6 opacity-[0.08] transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-out-quart)] group-hover:opacity-[0.16]"
        />

        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surf)]">
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            initial={{ scale: 1.07, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: ease.outExpo }}
            className="aspect-[4/5] w-full object-cover object-top"
          />

          {/* Sombra inferior, para que la chapa no pise la foto */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#09090a]/85 to-transparent"
          />
        </div>

        {badge ? (
          <span
            style={{ transform: 'translateZ(55px)' }}
            className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-[#33333a] bg-[#09090a] px-3.5 py-2"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f4f4f5]" />
            <span className="t-label text-[#f4f4f5]">{badge}</span>
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
