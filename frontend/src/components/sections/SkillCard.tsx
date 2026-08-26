import type { CSSProperties } from 'react';
import { getSkillIcon } from '@/data/skillIcons';

/**
 * Tecnología individual.
 *
 * La versión anterior llamaba `useTransform()` dentro de un atributo JSX
 * (`style={{ background: useTransform(...) }}`), es decir, ejecutaba hooks
 * en el cuerpo del render de un atributo. Funcionaba sólo porque el orden
 * de llamada resultaba estable entre renders; es exactamente el caso que
 * `react/rules-of-hooks` existe para atrapar, y se rompe en cuanto el
 * componente renderiza condicionalmente.
 *
 * Además acumulaba seis efectos simultáneos al pasar el cursor: tilt de
 * 15°, brillo radial de color, reflejo especular, borde superior iluminado,
 * elevación en Z del icono y barra inferior. Multiplicado por 28 tecnologías
 * es ruido, no jerarquía. Queda un único gesto: el icono toma su color de
 * marca y la superficie sube un nivel. Todo en CSS, sin JS por tarjeta.
 */
export default function SkillCard({ name }: { name: string }) {
  const { icon: Icon, color } = getSkillIcon(name);

  return (
    <div
      className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-ink-2)] px-3.5 py-3 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]"
      /* El color de marca viaja como custom property para que el hover viva
         entero en CSS en lugar de en estado de React. */
      style={{ '--brand': color } as CSSProperties}
    >
      <Icon
        size={17}
        aria-hidden="true"
        className="shrink-0 text-[var(--color-muted)] transition-colors duration-[var(--duration-quick)] group-hover:text-[var(--brand)]"
      />
      <span className="truncate text-[0.8125rem] text-[var(--color-paper-dim)] transition-colors duration-[var(--duration-quick)] group-hover:text-[var(--color-paper)]">
        {name}
      </span>
    </div>
  );
}
