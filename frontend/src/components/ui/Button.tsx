import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Ruta interna. Excluyente con `href`. */
  to?: string;
  /** URL externa o mailto/tel. */
  href?: string;
  download?: boolean;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Botón / enlace del sistema.
 *
 * Reemplaza a MagneticButton. El efecto imán movía el botón lejos del cursor
 * del usuario, lo que aumenta el tiempo de adquisición del objetivo (ley de
 * Fitts) y hace fallar el clic en trackpads. El feedback acá es el correcto:
 * respuesta inmediata al pulsar (`active:scale`) y cambio de superficie al
 * pasar por encima — sin mover el objetivo de sitio.
 */

const BASE =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-medium ' +
  'transition-[background-color,border-color,color,transform] duration-[var(--duration-quick)] ease-[var(--ease-out-quart)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.8125rem]',
  md: 'px-5 py-2.5 text-sm',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[var(--color-paper)] text-[var(--color-ink)] hover:bg-white',
  secondary:
    'border border-[var(--color-border)] text-[var(--color-paper)] ' +
    'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]',
  ghost:
    'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  download,
  external,
  type = 'button',
  disabled,
  onClick,
}: BaseProps) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
