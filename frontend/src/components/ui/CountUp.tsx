import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Cifra que sube desde cero al entrar en pantalla.
 *
 * Acepta el valor tal como está en los datos ("5", "2+", "8") y separa el
 * número del sufijo, así el "+" no se pierde ni hay que duplicar el dato.
 *
 * Va con rAF en vez de un temporizador por paso: un `setInterval` de 16 ms
 * se desincroniza del refresco de pantalla y la cuenta se ve a saltos.
 */
export default function CountUp({
  value,
  duration = 1100,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();

  /**
   * `value.match()` devuelve un array NUEVO en cada render. Cuando ese
   * array iba directo en las dependencias del efecto, el efecto se
   * reejecutaba en cada render, reiniciaba la cuenta y provocaba otro
   * render: las cifras giraban sin parar. Ahora las dependencias son
   * primitivas y estables.
   */
  const { target, suffix, isNumeric } = useMemo(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    return {
      target: match ? Number(match[1]) : 0,
      suffix: match ? match[2] : '',
      isNumeric: Boolean(match),
    };
  }, [value]);

  const [display, setDisplay] = useState(() => (reduced ? target : 0));

  useEffect(() => {
    if (!inView || reduced || !isNumeric) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: frena fuerte al final, que es lo que hace que la
      // cifra "aterrice" en vez de detenerse de golpe.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, duration, isNumeric]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? display : value}
      {suffix}
    </span>
  );
}
