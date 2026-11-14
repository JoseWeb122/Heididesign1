import React from "react";
import { motion, type Variants } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import { cn } from "../utils/cn";

/* ————— Scroll reveal wrapper ————— */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/* ————— Eyebrow label ————— */
export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.32em]",
        light ? "text-ondeep/60" : "text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}

/* ————— Buttons ————— */
export function ButtonPrimary({
  children,
  onClick,
  className,
  light,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  light?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-all duration-500",
        light
          ? "bg-ondeep text-deep hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.5)]"
          : "bg-ink text-bg hover:shadow-[0_18px_50px_-12px_rgba(16,35,61,0.45)]",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-0.5">
        {children}
      </span>
      <span
        className={cn(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
          light ? "bg-gold/25" : "bg-accent/30"
        )}
      />
    </button>
  );
}

export function ButtonGhost({
  children,
  onClick,
  className,
  light,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center gap-3 border px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-all duration-500",
        light
          ? "border-ondeep/30 text-ondeep hover:border-ondeep hover:bg-ondeep hover:text-deep"
          : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bg",
        className
      )}
    >
      {children}
    </button>
  );
}

/* ————— Star rating ————— */
export function Rating({ value, className, size = 13 }: { value: number; className?: string; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.4;
  return (
    <span className={cn("inline-flex items-center gap-[3px] text-gold", className)} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
        if (i === full && half) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
        return <Star key={i} size={size} className="opacity-30" fill="currentColor" strokeWidth={0} />;
      })}
    </span>
  );
}

/* ————— Section heading ————— */
export function SectionHead({
  eyebrow,
  title,
  copy,
  light,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  light?: boolean;
  align?: "center" | "left" | "split";
  className?: string;
}) {
  if (align === "split") {
    return (
      <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow light={light}>{eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium sm:text-5xl">{title}</h2>
          </Reveal>
        </div>
        {copy && (
          <Reveal delay={0.1}>
            <p className={cn("max-w-sm text-[15px] leading-relaxed", light ? "text-ondeep/65" : "text-mute")}>{copy}</p>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={cn("mx-auto max-w-2xl", align === "center" ? "text-center" : "text-left", className)}>
      <Reveal>
        <Eyebrow light={light} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.4rem]">{title}</h2>
        {copy && (
          <p className={cn("mx-auto mt-5 max-w-xl text-[15px] leading-relaxed", light ? "text-ondeep/65" : "text-mute")}>
            {copy}
          </p>
        )}
      </Reveal>
    </div>
  );
}

/* ————— Fade-in image ————— */
export function FxImg({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onLoad={(e) => e.currentTarget.classList.add("loaded")}
      className={cn("img-fade object-cover", className)}
    />
  );
}
