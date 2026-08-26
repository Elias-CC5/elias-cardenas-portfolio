import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { profile } from '@/data/portfolio';
import Button from '@/components/ui/Button';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * Cierre de la experiencia. Una sola idea, un solo objetivo: escribirle.
 * Sin formulario acá — el formulario vive en /contacto y duplicarlo divide
 * la atención en lugar de sumarla.
 */
export default function ContactCta() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.07)}
      className="shell section border-t border-[var(--color-border)]"
    >
      <motion.p variants={fadeUp} className="t-label text-[var(--color-paper-dim)]">
        Siguiente paso
      </motion.p>

      <motion.h2 variants={fadeUp} className="t-h1 mt-6 max-w-3xl text-[var(--color-paper)]">
        ¿Tenés algo que construir?
        <span className="block text-[var(--color-muted)]">Contame qué se te rompe.</span>
      </motion.h2>

      <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
        <Button to="/contacto" variant="primary">
          Escribime <FiArrowRight aria-hidden="true" className="transition-transform duration-[var(--duration-quick)] group-hover:translate-x-0.5" />
        </Button>
        <Button href={`mailto:${profile.email}`} variant="ghost">
          {profile.email}
        </Button>
      </motion.div>
    </motion.section>
  );
}
