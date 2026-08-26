import { useEffect, useState } from 'react';

/**
 * `true` cuando la página pasó de `threshold` px.
 * El listener es passive y está throttleado con rAF: el handler anterior
 * escribía estado en cada evento de scroll, lo que en móvil dispara
 * decenas de renders por segundo.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      setScrolled(window.scrollY > threshold);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
