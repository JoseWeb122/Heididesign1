import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/store";
import { Eyebrow, Rating, Reveal } from "../../components/ui";
import { cn } from "../../utils/cn";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: 1 | -1) => setI((v) => (v + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[i];

  return (
    <section
      className="border-y border-line bg-surface py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow className="justify-center">Kind Words</Eyebrow>
          <Quote size={30} strokeWidth={0.8} className="mx-auto mt-8 rotate-180 text-gold" />
        </Reveal>

        <div className="relative mt-6 min-h-[220px] sm:min-h-[190px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-[1.6rem] leading-snug font-medium text-balance sm:text-[2.1rem]">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-7 flex flex-col items-center gap-2">
                <Rating value={5} size={12} />
                <p className="text-[13px] font-semibold tracking-[0.14em] uppercase">{t.name}</p>
                <p className="text-[12px] tracking-wide text-mute">{t.detail}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button aria-label="Previous testimonial" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-bg">
            <ArrowLeft size={15} strokeWidth={1.6} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, d) => (
              <button
                key={d}
                aria-label={`Testimonial ${d + 1}`}
                onClick={() => setI(d)}
                className={cn("h-1 transition-all duration-500", d === i ? "w-8 bg-gold" : "w-3 bg-line hover:bg-accent")}
              />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-bg">
            <ArrowRight size={15} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
