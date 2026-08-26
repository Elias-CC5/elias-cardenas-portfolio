import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  noPadding?: boolean;
}

/**
 * Encabezado de página.
 *
 * Se eliminó el efecto máquina de escribir del H1. Escribía el título a
 * 42 ms por carácter: "Experiencia" tardaba ~460 ms y el título de un
 * proyecto más de 1,5 s en estar completo. El H1 es el elemento más
 * importante de la página y el que mide el LCP; esconderlo detrás de una
 * animación es coste puro. Ahora entra de una pieza, en 0,42 s.
 */
export default function PageHeader({ eyebrow, title, description, noPadding = false }: PageHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.07)}
      className={noPadding ? '' : 'shell pt-36 pb-14 md:pt-44 md:pb-16'}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <span className="t-label text-[var(--color-paper-dim)]">{eyebrow}</span>
        <hr className="rule flex-1" />
      </motion.div>

      <motion.h1 variants={fadeUp} className="t-h1 mt-6 text-[var(--color-paper)]">
        {title}
      </motion.h1>

      {description && (
        <motion.p variants={fadeUp} className="t-lead mt-5 max-w-2xl text-[var(--color-paper-dim)]">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
