import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/nav';
import { useScrolled } from '@/hooks/useScrolled';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { duration, ease, springSoft, staggerContainer, fadeUp } from '@/lib/motion';

export default function Navbar() {
  const { pathname } = useLocation();
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: duration.normal, ease: ease.outQuart }}
          aria-label="Principal"
          className={`pointer-events-auto flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 ${
            scrolled || open
              ? 'bg-[var(--color-ink)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-xl shadow-black/10'
              : 'bg-[var(--color-ink)]/50 backdrop-blur-sm border border-[var(--color-border)]/50'
          }`}
        >
          {/* Logo / Monograma */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 rounded-full pl-1 pr-3 py-1 transition-colors hover:bg-white/5"
            aria-label="Elías Cárdenas — Inicio"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-paper)] font-display text-xs font-bold text-[var(--color-ink)] transition-transform group-hover:scale-105">
              E
            </span>
            <span className="text-xs font-semibold text-[var(--color-paper)] tracking-tight">
              Elías
            </span>
          </Link>

          {/* Enlaces Desktop (Pill Slider Effect) */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="relative">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative z-10 block rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={springSoft}
                          className="absolute inset-0 z-0 rounded-full bg-[var(--color-paper)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Acciones & Menú Móvil */}
          <div className="flex items-center gap-2">
            <Link
              to="/contacto"
              className="hidden rounded-full bg-[var(--color-paper)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-all duration-200 hover:bg-white hover:shadow-md active:scale-95 lg:inline-block"
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
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors lg:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: duration.quick, ease: ease.inOut }}
                  className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-[var(--color-paper)]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: duration.quick, ease: ease.inOut }}
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[var(--color-paper)]"
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Overlay Móvil Flotante */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: duration.quick, ease: ease.outQuart }}
            className="fixed inset-x-4 top-20 z-40 max-w-sm mx-auto overflow-hidden rounded-3xl bg-[var(--color-ink)]/95 border border-[var(--color-border)] p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.045, 0.04)}
              className="flex flex-col gap-2"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.to} variants={fadeUp}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
                      pathname === link.to
                        ? 'bg-white/10 text-[var(--color-paper)]'
                        : 'text-[var(--color-paper-dim)] hover:bg-white/5 hover:text-[var(--color-paper)]'
                    }`}
                  >
                    <span className="text-base font-medium">{link.label}</span>
                    <span className="t-num text-xs text-[var(--color-muted)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </motion.li>
              ))}
              
              <motion.li variants={fadeUp} className="pt-2">
                <Link
                  to="/contacto"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-2xl bg-[var(--color-paper)] py-3 text-sm font-medium text-[var(--color-ink)]"
                >
                  Hablemos
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}