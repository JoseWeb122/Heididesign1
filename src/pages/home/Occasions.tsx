import { ArrowUpRight } from "lucide-react";
import { OCCASIONS, px } from "../../data/store";
import { useStore } from "../../context/StoreContext";
import { FxImg, Reveal, SectionHead } from "../../components/ui";

export default function Occasions() {
  const { navigate } = useStore();

  return (
    <section id="occasions" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Shop by Occasion"
          title={<>Whatever you're <em className="text-accent">gathering</em> for.</>}
          copy="From first birthdays to fiftieth anniversaries — find pieces curated for the day you have in mind."
        />
      </div>

      <Reveal delay={0.15} className="mt-12">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible xl:px-[max(2rem,calc((100vw-1440px)/2+2rem))]">
          {OCCASIONS.map((o, i) => (
            <button
              key={o.id}
              onClick={() => navigate({ name: "shop", occasion: o.id })}
              className="group relative block w-[68vw] shrink-0 snap-start overflow-hidden text-left sm:w-[42vw] lg:w-auto"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <FxImg
                  src={px(o.img, 700, 933)}
                  alt={o.name}
                  className="h-full w-full transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/10 to-transparent transition-opacity duration-500 group-hover:from-deep/90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ondeep">
                <div>
                  <p className="text-[9.5px] font-medium tracking-[0.3em] uppercase text-ondeep/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-[1.45rem] leading-tight font-medium">{o.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ondeep/65 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0">
                    {o.note}
                  </p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ondeep/30 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-deep">
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      <p className="mt-5 px-5 text-[11px] tracking-[0.2em] uppercase text-mute sm:px-8 lg:hidden">Swipe to explore →</p>
    </section>
  );
}
