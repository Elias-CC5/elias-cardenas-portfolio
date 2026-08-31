import { useEffect, useRef, useState } from 'react';
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

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;

  const [display, setDisplay] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced || !match) return;

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
  }, [inView, reduced, target, duration, match]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
      {match ? suffix : ''}
    </span>
  );
}
