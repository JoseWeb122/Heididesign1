import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { px } from "../../data/store";
import { Eyebrow, FxImg, Reveal } from "../../components/ui";

const stats = [
  { n: "12,400+", label: "Events celebrated" },
  { n: "4.9 / 5", label: "Average rating" },
  { n: "100%", label: "Made by hand" },
  { n: "48 hrs", label: "Sketch turnaround" },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-14%"]);

  return (
    <section id="story" ref={ref} className="scroll-mt-24 overflow-hidden bg-deep text-ondeep">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <Eyebrow light>The Art of the Detail</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-medium sm:text-5xl lg:text-[3.8rem]">
              Small Details. <br />
              <em className="text-gold">Lasting</em> Memories.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg font-display text-[1.35rem] leading-relaxed font-light text-ondeep/85 italic">
              "Anyone can fill a box. We consider the weight of the ribbon, the sound the lid makes, the note they'll
              find first — because guests remember how a thing felt, not what it cost."
            </p>
            <p className="mt-4 text-[11px] font-medium tracking-[0.3em] uppercase text-ondeep/50">
              — Elodie Marchand, Founder & Head Maker
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ondeep/65">
              Every favor is folded, every bracelet strung, every candle poured at our Hudson Valley workbench. We buy
              materials in small lots, reject anything that feels mass-made, and sign the inside of each box before it
              ships. It's slower. That's rather the point.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px bg-ondeep/10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="bg-deep px-4 py-6 text-center">
                  <p className="font-display text-2xl font-medium text-gold sm:text-[1.7rem]">{s.n}</p>
                  <p className="mt-1 text-[10px] tracking-[0.22em] uppercase text-ondeep/55">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* layered imagery */}
        <div className="relative min-h-[480px] sm:min-h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[78%] overflow-hidden">
            <FxImg
              src={px(10474307, 1000, 1250)}
              alt="Overhead view of jewelry being made at the bench"
              className="aspect-[4/5] w-full"
            />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[52%] border-[6px] border-deep shadow-2xl">
            <FxImg
              src={px(38582060, 800, 1000)}
              alt="Hands arranging beads"
              className="aspect-[4/5] w-full"
            />
          </motion.div>
          <Reveal delay={0.3} className="absolute -bottom-2 right-4 hidden sm:block">
            <p className="max-w-[180px] text-right text-[11px] leading-relaxed tracking-[0.14em] uppercase text-ondeep/45">
              The workbench, mid-commission — where every order begins
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
