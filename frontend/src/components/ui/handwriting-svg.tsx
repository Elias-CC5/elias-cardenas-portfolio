"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface HandwritingSvgProps {
  text?: string;
  subtitle?: string;
  className?: string;
}

export function HandwritingSvg({
  text = "ELIAS CARDENAS",
  subtitle = "SOFTWARE DEVELOPER & CREATIVE ARCHITECT",
  className = "",
}: HandwritingSvgProps) {
  // Coordenadas para interacción 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-250, 250], [10, -10]);
  const rotateY = useTransform(dx, [-250, 250], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const letters = text.split("");

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-black/90 p-8 md:p-12 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.03)] perspective-1000 ${className}`}
    >
      {/* 1. Rejilla Monocromática Minimalista */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Resplandor Blanco Plata que sigue el mouse */}
      <motion.div
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-gradient-to-tr from-white/10 via-neutral-400/10 to-transparent blur-3xl"
        style={{
          x: dx,
          y: dy,
        }}
      />

      {/* 3. Contenedor Principal con Inclinación 3D */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 flex flex-col items-center text-center transition-transform duration-200 ease-out"
      >
        {/* Badge Monocromático de Estado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-neutral-300 backdrop-blur-md uppercase shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-200"></span>
          </span>
          System Online
        </motion.div>

        {/* Nombre en Tipografía de Gradiente Cromo / Blanco Puro */}
        <div className="relative flex flex-wrap justify-center overflow-hidden py-2 font-sans font-black tracking-tight text-5xl sm:text-7xl md:text-8xl">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 90, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: index * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block bg-gradient-to-b from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent hover:scale-105 hover:brightness-150 transition-all duration-300 select-none drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Separador de Plata con animación de expansión */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
          className="my-6 h-[1px] w-40 sm:w-72 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Subtítulo Estilizado en Blanco/Gris */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-xl text-xs sm:text-sm font-medium tracking-[0.4em] text-neutral-400 uppercase"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Detalles de Esquinas Estilo Framing Industrial / Minimalista */}
      <div className="absolute top-5 left-5 h-3 w-3 border-t border-l border-white/40" />
      <div className="absolute top-5 right-5 h-3 w-3 border-t border-r border-white/40" />
      <div className="absolute bottom-5 left-5 h-3 w-3 border-b border-l border-white/40" />
      <div className="absolute bottom-5 right-5 h-3 w-3 border-b border-r border-white/40" />
    </div>
  );
}

export default HandwritingSvg;