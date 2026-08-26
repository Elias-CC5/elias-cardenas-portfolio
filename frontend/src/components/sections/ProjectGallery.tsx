import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiMaximize2, FiImage } from 'react-icons/fi';
import type { GalleryImage } from '@/types';

interface ProjectGalleryProps {
  images?: GalleryImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const safeImages = images ?? [];

  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir);
      setIndex((newIndex + safeImages.length) % safeImages.length);
    },
    [safeImages.length]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setLightboxOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, next, prev]);

  if (safeImages.length === 0) return null;

  const current = safeImages[index];
  const currentFailed = failed[current.src];

  return (
    <div>
      {/* Main viewer */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        {currentFailed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--color-paper-dim)]">
            <FiImage size={28} />
            <p className="font-mono text-xs">Imagen no disponible</p>
          </div>
        ) : (
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={current.src}
              src={current.src}
              alt={`${title} — ${current.label}`}
              initial={{ opacity: 0, x: direction >= 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onError={() => setFailed((f) => ({ ...f, [current.src]: true }))}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>
        )}

        {/* Label */}
        <div className="glass absolute bottom-4 left-4 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--color-paper)]">
          {current.label}
        </div>

        {/* Counter */}
        <div className="glass absolute top-4 right-4 rounded-full px-3 py-1.5 font-mono text-xs text-[var(--color-paper-dim)]">
          {index + 1} / {safeImages.length}
        </div>

        {/* Expand button */}
        {!currentFailed && (
          <button
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver en pantalla completa"
            className="glass absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
          >
            <FiMaximize2 size={14} />
          </button>
        )}

        {/* Prev/Next arrows */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/60 text-[var(--color-paper)] backdrop-blur-sm transition-colors hover:bg-[var(--color-ink)]/90"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-ink)]/60 text-[var(--color-paper)] backdrop-blur-sm transition-colors hover:bg-[var(--color-ink)]/90"
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border bg-[var(--color-surface)] transition-all duration-200 ${
                i === index ? 'border-[var(--color-accent-bright)] opacity-100' : 'border-[var(--color-border)] opacity-40 hover:opacity-75'
              }`}
            >
              {failed[img.src] ? (
                <div className="flex h-full w-full items-center justify-center text-[var(--color-paper-dim)]">
                  <FiImage size={14} />
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((f) => ({ ...f, [img.src]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && !currentFailed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-ink)]/95 p-6 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Cerrar"
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-paper)] transition-colors hover:bg-[var(--color-surface)]"
            >
              <FiX size={20} />
            </button>
            <img
              src={current.src}
              alt={`${title} — ${current.label}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}