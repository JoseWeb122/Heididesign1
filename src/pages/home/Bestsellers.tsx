import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bestSellers } from "../../data/store";
import ProductCard from "../../components/ProductCard";
import { Eyebrow, Reveal } from "../../components/ui";
import { cn } from "../../utils/cn";

export default function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: dir * w * 1.5, behavior: "smooth" });
  };

  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Most Gifted</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium sm:text-5xl">
            The <em className="text-accent">Bestsellers</em>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mute">
            The pieces our clients reorder, repurchase and recommend — sometimes before their event is even over.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="hidden gap-2 sm:flex">
          <button
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className={cn(
              "grid h-12 w-12 place-items-center border border-line transition-all",
              canPrev ? "hover:bg-ink hover:text-bg" : "opacity-30"
            )}
          >
            <ArrowLeft size={16} strokeWidth={1.6} />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className={cn(
              "grid h-12 w-12 place-items-center border border-line transition-all",
              canNext ? "hover:bg-ink hover:text-bg" : "opacity-30"
            )}
          >
            <ArrowRight size={16} strokeWidth={1.6} />
          </button>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8 xl:px-[max(2rem,calc((100vw-1440px)/2+2rem))]"
      >
        {bestSellers.map((p, i) => (
          <div key={p.id} data-card className="w-[74vw] shrink-0 snap-start sm:w-[46vw] md:w-[31%] lg:w-[23.2%]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
