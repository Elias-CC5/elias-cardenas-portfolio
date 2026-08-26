import { useState } from 'react';
import type { GalleryImage } from '@/types';
import { getSkillIcon } from '@/data/skillIcons';

interface ProjectCoverProps {
  coverImage?: string;
  gallery?: GalleryImage[];
  title: string;
  tech?: string[];
  /** Índice del proyecto: alimenta la portada tipográfica de reserva. */
  seed: number;
  className?: string;
  eager?: boolean;
}

/**
 * Portada de un proyecto.
 *
 * El fallback anterior era un degradado con un icono de imagen y el texto
 * "Captura próximamente": comunicaba que faltaba algo. Dos de los cinco
 * proyectos no tienen capturas, así que ese hueco aparecía en la maqueta
 * como un error.
 *
 * El nuevo fallback es una portada tipográfica deliberada — retícula de
 * hairlines, número de proyecto y stack en mono — que se lee como una
 * decisión de diseño y no como una imagen rota.
 */
export default function ProjectCover({
  coverImage,
  gallery,
  title,
  tech = [],
  seed,
  className = '',
  eager = false,
}: ProjectCoverProps) {
  const [failed, setFailed] = useState(false);
  const src = coverImage ?? gallery?.[0]?.src;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={`Captura de ${title}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-left-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[var(--color-ink-2)] p-6 md:p-8 ${className}`}
    >
      {/* Retícula de hairlines: textura sin recurrir a un degradado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(120% 100% at 30% 0%, black, transparent 75%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="t-num text-xs text-[var(--color-muted)]">
          {String(seed + 1).padStart(2, '0')} / PROYECTO
        </span>
      </div>

      <div className="relative">
        <p className="t-h2 max-w-[14ch] text-[var(--color-border-strong)]">{title}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          {tech.slice(0, 5).map((name) => {
            const { icon: Icon, color } = getSkillIcon(name);
            return (
              <span key={name} className="flex items-center gap-1.5">
                <Icon size={13} style={{ color }} aria-hidden="true" />
                <span className="t-label text-[var(--color-muted)]">{name}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
