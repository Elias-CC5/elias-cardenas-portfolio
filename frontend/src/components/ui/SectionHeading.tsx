import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce, staggerContainer } from '@/lib/motion';

interface SectionHeadingProps {
  /** Índice de sección: "01", "02"… Es lo que da el tono de ficha técnica. */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Acción alineada a la derecha (por ejemplo "Ver todos"). */
  action?: ReactNode;
  className?: string;
}

/**
 * Encabezado de sección del sitio.
 * La regla del índice + hairline + etiqueta mono se define una sola vez acá;
 * antes cada página componía su propio encabezado a mano.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.06)}
      className={className}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        {index && <span className="t-num text-xs text-[var(--color-muted)]">{index}</span>}
        <span className="t-label text-[var(--color-paper-dim)]">{eyebrow}</span>
        <hr className="rule flex-1" />
      </motion.div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <motion.h2 variants={fadeUp} className="t-h2 max-w-2xl text-[var(--color-paper)]">
          {title}
        </motion.h2>
        {action && <motion.div variants={fadeUp}>{action}</motion.div>}
      </div>

      {description && (
        <motion.p
          variants={fadeUp}
          className="t-lead mt-4 max-w-2xl text-[var(--color-paper-dim)]"
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
