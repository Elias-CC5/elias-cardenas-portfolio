import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/nav';
import { useScrolled } from '@/hooks/useScrolled';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { duration, ease, springSoft, staggerContainer, fadeUp } from '@/lib/motion';

/**
 * Barra de navegación.
 *
 * Antes era una píldora flotante centrada — el patrón por defecto de
 * cualquier plantilla de portfolio. Ahora es una barra a todo el ancho que
 * comparte la retícula del contenido (`.shell`): al hacer scroll no cambia
 * de forma, sólo aparece la superficie y el hairline inferior. El navbar
 * pertenece al sitio en vez de flotar por encima de él.
 *
 * Correcciones de accesibilidad respecto a la versión anterior:
 * - `aria-expanded` y etiqueta del botón que cambia según el estado.
 * - Escape cierra el menú; el foco vuelve al botón que lo abrió.
 * - Trampa de foco dentro del overlay (antes se podía tabular al contenido
 *   de fondo, que estaba tapado pero seguía siendo enfocable).
 * - El scroll del documento se bloquea mientras el overlay está abierto.
 */
export default function Navbar() {
  const { pathname } = useLocation();
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  // El overlay se cierra solo al navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape para cerrar + trampa de foco mientras el overlay está abierto.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('a, button')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration.normal, ease: ease.outQuart }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-normal)] ${
          scrolled || open ? 'panel border-b border-[var(--color-border)]' : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-6" aria-label="Principal">
          {/* Monograma. La versión anterior era texto blanco sobre fondo
              blanco (bg-accent valía #ffffff): la "E" no se veía. */}
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Elías Cárdenas — Inicio"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-paper)] font-display text-sm font-bold text-[var(--color-ink)]">
              E
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-tight text-[var(--color-paper)]">
                Elías Cárdenas
              </span>
              <span className="t-num block text-[0.625rem] leading-tight text-[var(--color-muted)]">
                Full Stack Developer
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative block px-3 py-2 text-sm transition-colors duration-[var(--duration-quick)] ${
                      isActive
                        ? 'text-[var(--color-paper)]'
                        : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={springSoft}
                          className="absolute inset-x-3 -bottom-px h-px bg-[var(--color-paper)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/contacto"
              className="hidden rounded-[var(--radius-md)] bg-[var(--color-paper)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--color-ink)] transition-[background-color,transform] duration-[var(--duration-quick)] hover:bg-white active:scale-[0.98] lg:inline-block"
            >
              Hablemos
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: duration.quick, ease: ease.inOut }}
                  className="absolute inset-x-0 top-0 h-px bg-[var(--color-paper)]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: duration.quick, ease: ease.inOut }}
                  className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-paper)]"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.quick, ease: ease.outQuart }}
            className="fixed inset-0 z-40 bg-[var(--color-ink)] pt-24 lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.045, 0.04)}
              className="shell"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.to} variants={fadeUp} className="border-b border-[var(--color-border)]">
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span className="t-num text-xs text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`t-h3 ${
                        pathname === link.to ? 'text-[var(--color-paper)]' : 'text-[var(--color-paper-dim)]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

