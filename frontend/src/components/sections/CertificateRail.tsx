import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Certificate } from '@/types';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Certificados en tarjetas cuadradas, en una fila que se arrastra.
 *
 * En fila y no en grilla porque esta sección vive dentro de un panel apilado:
 * dos filas de cuadrados no caben en una pantalla, y lo que no cabe en un
 * panel `sticky` queda por debajo del pliegue sin forma de llegar.
 *
 * Antes cada tarjeta traía su propia inclinación por puntero y un halo del
 * color del emisor: seis instancias del hook, seis capas promovidas y seis
 * degradados que se recalculaban al pasar por encima. Ahora el reposo es
 * estático y el hover es un `translateY` y un cambio de borde — dos
 * propiedades que el compositor resuelve solo. La única foto que se inclina
 * en la página es la del retrato, que es donde el gesto se nota.
 *
 * La placa del logo es siempre negra, también en los paneles blancos: los
 * PNG de los emisores son opacos y con fondo oscuro, así que sobre blanco
 * quedarían como bloques sucios. Negro sobre blanco es deliberado.
 */

export default function CertificateRail({ items }: { items: Certificate[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.06)}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((cert, i) => (
        <motion.li
          key={cert.id}
          variants={fadeUp}
          className="w-[min(78vw,19rem)] shrink-0 snap-start"
        >
          <a
            href={encodeURI(cert.credentialUrl)}
            target="_blank"
            rel="noreferrer"
            className="group flex aspect-square flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surf)] p-5 transition-[transform,border-color] duration-[var(--duration-normal)] ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:border-[var(--line-strong)]"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="t-label text-[var(--fg-mute)]">{cert.category}</span>
              <span className="t-label shrink-0 text-[var(--fg-mute)] tabular-nums">
                {String(i + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
              </span>
            </span>

            {/* Placa negra con el logo grande */}
            <span className="mt-4 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#09090a] p-6">
              {cert.logo ? (
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  loading="lazy"
                  decoding="async"
                  className="max-h-20 w-full max-w-[76%] object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
                />
              ) : (
                <span className="t-h3 text-[#33333a]">{cert.issuer}</span>
              )}
            </span>

            <span className="mt-4">
              <span className="t-body block truncate text-[var(--fg)]">{cert.title}</span>
              <span className="mt-1.5 flex items-center justify-between gap-3">
                <span className="t-label text-[var(--fg-mute)]">{cert.issueDate}</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[var(--fg-mute)] transition-[color,transform] duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
                />
              </span>
            </span>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
