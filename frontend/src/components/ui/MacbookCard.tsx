"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MacbookCardProps {
  src: string;
  alt: string;
  className?: string;
}

export function MacbookCard({ src, alt, className }: MacbookCardProps) {
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto py-4 select-none [perspective:1000px]", className)}>
      <div className="group relative flex flex-col items-center">
        
        {/* PANTALLA (Inclinación 3D ligera) */}
        <div className="relative z-10 w-full rounded-[1.2rem] bg-[#0d0d0d] p-2 sm:p-3 shadow-2xl border border-neutral-700/60 ring-1 ring-white/10 [transform:rotateX(4deg)] transition-transform duration-500 ease-out origin-bottom group-hover:[transform:rotateX(1deg)]">
          
          {/* Muesca / Notch de Cámara */}
          <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center h-2.5 sm:h-3 w-12 sm:w-16 rounded-b-md bg-black">
            <div className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-[#1e1e1e] ring-1 ring-neutral-800" />
          </div>

          {/* Área de la Captura de Pantalla - object-contain asegura 0 recortes */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.6rem] sm:rounded-[0.8rem] bg-black flex items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* BISAGRA CENTRAL */}
        <div className="relative z-20 h-1.5 sm:h-2 w-[18%] bg-[#18181b] rounded-b-sm border-t border-black shadow-md" />

        {/* BASE DEL CHASIS (Perspectiva 3D inclinada hacia al frente) */}
        <div className="relative z-0 -mt-1 h-12 sm:h-16 w-[103%] rounded-b-2xl bg-gradient-to-b from-[#242427] via-[#161618] to-[#09090b] border-t border-neutral-500/40 shadow-2xl [transform:rotateX(65deg)] origin-top flex flex-col items-center justify-start pt-1.5">
          
          {/* Muesca central para apertura */}
          <div className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-sm bg-black/80" />

          {/* Teclado sutil estilizado */}
          <div className="w-[86%] h-6 sm:h-8 rounded-md bg-[#09090b] border border-white/5 p-1 flex flex-col justify-between opacity-80">
            <div className="w-full h-1 bg-neutral-800/60 rounded-sm" />
            <div className="w-full h-1 bg-neutral-800/60 rounded-sm" />
            <div className="w-full h-1 bg-neutral-800/60 rounded-sm" />
          </div>

          {/* Trackpad */}
          <div className="mt-1 h-3 w-16 sm:w-20 rounded-sm bg-[#18181a] border border-white/5" />
        </div>

        {/* SOMBRA INFERIOR PROYECTADA */}
        <div className="mx-auto -mt-5 sm:-mt-6 h-4 w-[90%] bg-black/90 blur-md rounded-full" />
      </div>
    </div>
  );
}