import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { useLenis } from '@/hooks/useLenis';
import { duration, ease } from '@/lib/motion';

/**
 * Estructura de la aplicación.
 *
 * Se eliminaron tres capas decorativas permanentes:
 * - `AmbientBackground`: mantenía un bucle de requestAnimationFrame vivo
 *   durante toda la sesión para mover un radial-gradient blanco con
 *   blur de 120px. Sobre un fondo casi negro el resultado era una neblina
 *   gris, no profundidad.
 * - `StatusBar`: dos `setInterval` permanentes rotando frases decorativas
 *   ("uptime: 24/7") que no aportaban información.
 * - El `AnimatePresence mode="sync"` de las rutas: montaba la página nueva
 *   encima de la vieja mientras ambas se cruzaban en opacidad, lo que
 *   producía un parpadeo en cada navegación. Ahora la página entrante hace
 *   su propia entrada, sin solapamiento.
 *
 * El grano se conserva: da textura al negro plano y ahora cuesta mucho
 * menos (sin `mix-blend-mode`).
 */
export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenisRef]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />

      <motion.main
        key={pathname}
        id="contenido"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.quick, ease: ease.outQuart }}
        className="relative z-[2] min-h-screen"
      >
        {children}
      </motion.main>

      <Footer />
    </>
  );
}
