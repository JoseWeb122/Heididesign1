import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PenLine, Package, Palette } from "lucide-react";
import { px } from "../../data/store";
import { useStore } from "../../context/StoreContext";
import { ButtonPrimary, Eyebrow, FxImg, Reveal } from "../../components/ui";

const steps = [
  {
    icon: PenLine,
    n: "01",
    title: "Share the vision",
    copy: "Tell us the occasion, the palette, the feeling. A mood board or a single sentence — both are perfect.",
  },
  {
    icon: Palette,
    n: "02",
    title: "We design & sketch",
    copy: "Within one business day you'll receive concepts, materials and honest pricing. Revisions until it sings.",
  },
  {
    icon: Package,
    n: "03",
    title: "Made & delivered",
    copy: "Handcrafted in small batches, wrapped like a gift, and tracked to your door — days before the big day.",
  },
];

export default function CustomCreation() {
  const { setCustomOpen } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        {/* image */}
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[760px]">
          <motion.div style={{ y: imgY }} className="absolute -inset-y-10 inset-x-0">
            <FxImg
              src={px(10474291, 1200, 1500)}
              alt="Hands crafting a custom piece in the atelier"
              className="h-full w-full"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep/10" />
          <Reveal delay={0.2} className="absolute bottom-6 left-6">
            <div className="border border-ondeep/20 bg-deep/70 px-5 py-4 text-ondeep backdrop-blur-md">
              <p className="font-display text-lg italic">"Every commission begins as a conversation."</p>
              <p className="mt-1 text-[10px] tracking-[0.3em] uppercase text-ondeep/60">The Atelier Bench</p>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Reveal>
            <Eyebrow>Custom Commissions</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-medium sm:text-5xl lg:text-[3.6rem]">
              Your Vision. <br />
              <em className="text-accent">Beautifully</em> Made.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mute">
              Two hundred monogrammed favors for a vineyard wedding. A centerpiece built around your grandmother's
              brooch. Candles poured in her favorite scent. If you can describe it, we can make it — and make it
              unforgettable.
            </p>
          </Reveal>

          <div className="mt-10 space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.1 + i * 0.1}>
                <div className="group flex gap-5 border-t border-line py-6 transition-colors last:border-b">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border border-line text-accent transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                    <s.icon size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="text-[10px] font-medium tracking-[0.3em] text-gold">{s.n}</span>
                      <span className="font-display text-xl font-medium">{s.title}</span>
                    </p>
                    <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-mute">{s.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35} className="mt-10">
            <ButtonPrimary onClick={() => setCustomOpen(true)}>
              Start a Custom Order <ArrowRight size={14} />
            </ButtonPrimary>
            <p className="mt-4 text-[12px] tracking-wide text-mute">
              No deposit to begin · Sketches within 24 hours · Typical lead time 2–3 weeks
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
