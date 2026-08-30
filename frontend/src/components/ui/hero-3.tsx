"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  onCtaClick?: () => void;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-8 px-8 py-3.5 rounded-full bg-white text-black font-semibold shadow-xl hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
  >
    {children}
  </motion.button>
);

// Declaramos los objetos directamente sin el tipo explícito para evitar fallos de importación
const fadeInVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const titleContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  onCtaClick,
  className,
}) => {
  const duplicatedImages =
    images.length > 0 && images.length < 12 ? [...images, ...images] : images;

  return (
    <section
      className={cn(
        "relative w-full min-h-[85vh] overflow-hidden bg-[var(--color-ink,#09090b)] flex flex-col items-center justify-center text-center px-4 pt-28 sm:pt-36 pb-16",
        className
      )}
    >
      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-300 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {tagline}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={titleContainerVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
        >
          {typeof title === "string" ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={fadeInVariants}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeInVariants}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeInVariants}
          transition={{ delay: 0.5 }}
        >
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </motion.div>
      </div>

      {/* Marquee de Capturas */}
      <div className="relative w-full h-52 sm:h-64 mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-6 absolute left-0"
          animate={{
            x: ["0%", "-50%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[16/10] h-44 sm:h-56 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-20"
              style={{
                rotate: `${index % 2 === 0 ? -1.5 : 2}deg`,
              }}
            >
              <img
                src={src}
                alt={`Captura de proyecto ${index + 1}`}
                className="w-full h-full object-cover object-top filter brightness-90 hover:brightness-100 transition-all"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};