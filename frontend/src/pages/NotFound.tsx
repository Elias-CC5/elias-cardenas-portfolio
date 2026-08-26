import { FiArrowLeft } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <p className="font-display text-8xl font-bold text-[var(--color-border)] md:text-9xl">404</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--color-paper)] md:text-3xl">Esta página no existe</h1>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-3 max-w-md text-[var(--color-paper-dim)]">Parece que este endpoint nunca llegó a producción. Volvamos a algo que sí funciona.</p>
      </Reveal>
      <Reveal delay={0.26} className="mt-8">
        <Button to="/" variant="primary">
          <FiArrowLeft aria-hidden="true" /> Volver al inicio
        </Button>
      </Reveal>
    </section>
  );
}
