import { useEffect, useState } from 'react';

/**
 * Media query como estado de React.
 *
 * Existe para poder apagar efectos en pantallas donde no caben, no para
 * maquetar: el layout se resuelve con las variantes de Tailwind. Acá sólo
 * llegan decisiones que necesita el JS — por ejemplo, si el apilado por
 * scroll tiene sitio o hay que servir las secciones una debajo de otra.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
