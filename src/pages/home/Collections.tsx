import { ArrowRight } from "lucide-react";
import { CATEGORIES, featuredProducts, px } from "../../data/store";
import { useStore } from "../../context/StoreContext";
import { FxImg, Reveal, SectionHead } from "../../components/ui";
import ProductCard from "../../components/ProductCard";
import { cn } from "../../utils/cn";

/* ————— ticker ————— */
export function Ticker() {
  const items = ["Handmade to order", "Small-batch pours", "Free shipping over $75", "Wrapped like a gift, always", "Custom commissions open"];
  return (
    <div className="overflow-hidden border-b border-line bg-bg py-3.5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[10.5px] font-medium tracking-[0.3em] uppercase text-mute">
            {t}
            <span className="h-1 w-1 rotate-45 bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ————— featured categories ————— */
const layout = [
  "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3]",
];

export function Collections() {
  const { navigate } = useStore();
  return (
    <section id="collections" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow="The Collections"
        title={<>Every celebration, <em className="text-accent">considered</em>.</>}
        copy="Six collections, one obsession: details so lovely they become part of the memory itself."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:grid-rows-[repeat(2,minmax(0,1fr))] md:gap-5">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.06} className={cn("group", layout[i])}>
            <button
              onClick={() => navigate({ name: "shop", category: cat.id })}
              className="relative block h-full w-full cursor-pointer overflow-hidden text-left"
            >
              <FxImg
                src={px(cat.img, 1100, i === 0 ? 1300 : 800)}
                alt={cat.name}
                className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/75 via-deep/15 to-transparent transition-opacity duration-700 group-hover:from-deep/85" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ondeep sm:p-7">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-3 md:group-hover:translate-y-0">
                  <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-ondeep/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-[1.7rem] leading-tight font-medium sm:text-3xl">{cat.name}</h3>
                  <p className="mt-1.5 max-w-[26ch] text-[13px] leading-relaxed text-ondeep/70 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                    {cat.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-gold md:opacity-0 md:transition-all md:duration-500 md:group-hover:opacity-100">
                    Explore Collection
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ————— featured products ————— */
export function Featured() {
  const { navigate } = useStore();
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          align="left"
          eyebrow="This Season's Edit"
          title={<>Pieces people <em className="text-accent">write home about</em>.</>}
          className="mx-0"
        />
        <Reveal delay={0.1}>
          <button
            onClick={() => navigate({ name: "shop" })}
            className="group flex items-center gap-2 border border-ink/25 px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-ink hover:text-bg"
          >
            View everything
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3">
        {featuredProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
