import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { px } from "../../data/store";
import { useStore } from "../../context/StoreContext";
import { ButtonPrimary, ButtonGhost, FxImg } from "../../components/ui";

const HERO_IMG = px(10622328, 2200, 1400);

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { navigate, setCustomOpen, setSearchOpen } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-deep text-ondeep">
      {/* backdrop */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <FxImg src={HERO_IMG} alt="Candlelit celebration table" eager className="animate-kenburns h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/35 to-deep/85" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_40%,transparent_30%,rgba(6,7,9,0.55)_100%)]" />

      {/* copy */}
      <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pt-36 pb-44 sm:px-8 sm:pb-52">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease }}
          className="flex items-center gap-3 text-[11px] font-medium tracking-[0.4em] uppercase text-ondeep/70"
        >
          <span className="h-px w-10 bg-gold" />
          Handcrafted celebration pieces · Est. 2019
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[13vw] leading-[0.98] font-medium sm:text-7xl lg:text-[5.6rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease }}
            >
              Made for Moments
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.62, duration: 1, ease }}
            >
              Worth <em className="font-light text-gold">Celebrating.</em>
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-ondeep/75 sm:text-base"
        >
          Handcrafted details, beautiful keepsakes, and unforgettable touches designed to make every celebration feel
          extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <ButtonPrimary light onClick={() => navigate({ name: "shop" })}>
            Shop the Collection <ArrowRight size={14} />
          </ButtonPrimary>
          <ButtonGhost light onClick={() => setCustomOpen(true)}>
            <Sparkles size={14} /> Create Something Custom
          </ButtonGhost>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute right-8 bottom-32 z-10 hidden flex-col items-center gap-3 text-ondeep/50 lg:flex"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <ArrowDown size={14} className="animate-drift" />
      </motion.div>

      {/* floating category rail */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease }}
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t border-ondeep/15 bg-deep/40 py-1 backdrop-blur-md">
            {[
              { label: "Party Favors", cat: "favors" },
              { label: "Centerpieces", cat: "centerpieces" },
              { label: "Jewelry", cat: "jewelry" },
              { label: "Chocolate Candles", cat: "candles" },
              { label: "Party Supplies", cat: "supplies" },
              { label: "Custom Creations", cat: "custom" },
            ].map((c) => (
              <button
                key={c.cat}
                onClick={() => navigate({ name: "shop", category: c.cat })}
                className="group flex shrink-0 items-center gap-2 px-5 py-4 text-[11px] font-medium tracking-[0.22em] whitespace-nowrap uppercase transition-colors hover:text-gold"
              >
                <span className="h-1 w-1 rounded-full bg-gold/70 transition-transform duration-300 group-hover:scale-150" />
                {c.label}
              </button>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-auto hidden shrink-0 items-center gap-2 border-l border-ondeep/15 px-5 py-4 text-[11px] tracking-[0.22em] uppercase text-ondeep/60 transition-colors hover:text-ondeep sm:flex"
            >
              Search everything →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
