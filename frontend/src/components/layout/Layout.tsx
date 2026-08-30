import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { useLenis } from '@/hooks/useLenis';
import { duration, ease } from '@/lib/motion';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenisRef]);

  // Manejo del scroll de Lenis durante los 3 segundos de la intro
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.stop();
      const timer = setTimeout(() => {
        lenis.start();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lenisRef]);

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