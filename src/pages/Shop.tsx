import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, OCCASION_LABELS, OCCASIONS, PRODUCTS } from "../data/store";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Eyebrow, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

type Sort = "featured" | "newest" | "best" | "price-asc" | "price-desc";
const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "best", label: "Best Selling" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

const PRICE_BANDS = [
  { id: "all", label: "All prices", test: (_: number) => true },
  { id: "u25", label: "Under $25", test: (p: number) => p < 25 },
  { id: "m2550", label: "$25 – $50", test: (p: number) => p >= 25 && p <= 50 },
  { id: "m5075", label: "$50 – $75", test: (p: number) => p > 50 && p <= 75 },
  { id: "o75", label: "Over $75", test: (p: number) => p > 75 },
];

export default function Shop() {
  const { route } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [band, setBand] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // sync from route params (category tiles, occasion tiles, search commits)
  useEffect(() => {
    if (route.name !== "shop") return;
    setCat(route.category || "all");
    setOccasion(route.occasion || null);
    setQ(route.query || "");
  }, [route]);

  const products = useMemo(() => {
    const t = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (occasion && !p.occasions.includes(occasion)) return false;
      if (!PRICE_BANDS.find((b) => b.id === band)!.test(p.price)) return false;
      if (t && !(p.name.toLowerCase().includes(t) || p.blurb.toLowerCase().includes(t) || p.category.includes(t)))
        return false;
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "best":
        list = [...list].sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      default:
        break;
    }
    return list;
  }, [q, cat, occasion, band, sort]);

  const reset = () => {
    setQ("");
    setCat("all");
    setOccasion(null);
    setBand("all");
    setSort("featured");
  };

  const activeFilters = (cat !== "all" ? 1 : 0) + (occasion ? 1 : 0) + (band !== "all" ? 1 : 0);

  const filterControls = (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute">Collection</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
          {[{ id: "all", name: "All Pieces" }, ...CATEGORIES.map((c) => ({ id: c.id, name: c.name }))].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "flex items-center justify-between gap-3 border px-3.5 py-2 text-[12.5px] tracking-wide transition-all lg:border-0 lg:px-0 lg:py-1.5 lg:text-left",
                cat === c.id
                  ? "border-ink bg-ink text-bg lg:border-0 lg:bg-transparent lg:text-ink lg:font-semibold"
                  : "border-line text-mute hover:border-ink lg:hover:text-ink"
              )}
            >
              {c.name}
              {cat === c.id && <Check size={12} className="hidden lg:inline" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute">Price</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
          {PRICE_BANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => setBand(b.id)}
              className={cn(
                "flex items-center justify-between gap-3 border px-3.5 py-2 text-[12.5px] tracking-wide transition-all lg:border-0 lg:px-0 lg:py-1.5 lg:text-left",
                band === b.id
                  ? "border-ink bg-ink text-bg lg:border-0 lg:bg-transparent lg:text-ink lg:font-semibold"
                  : "border-line text-mute hover:border-ink lg:hover:text-ink"
              )}
            >
              {b.label}
              {band === b.id && <Check size={12} className="hidden lg:inline" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-mute">Occasion</p>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
          <button
            onClick={() => setOccasion(null)}
            className={cn(
              "flex items-center gap-3 border px-3.5 py-2 text-[12.5px] tracking-wide transition-all lg:border-0 lg:px-0 lg:py-1.5",
              !occasion ? "border-ink bg-ink text-bg lg:border-0 lg:bg-transparent lg:text-ink lg:font-semibold" : "border-line text-mute hover:border-ink lg:hover:text-ink"
            )}
          >
            Every occasion
          </button>
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => setOccasion(occasion === o.id ? null : o.id)}
              className={cn(
                "flex items-center justify-between gap-3 border px-3.5 py-2 text-[12.5px] tracking-wide transition-all lg:border-0 lg:px-0 lg:py-1.5 lg:text-left",
                occasion === o.id
                  ? "border-ink bg-ink text-bg lg:border-0 lg:bg-transparent lg:text-ink lg:font-semibold"
                  : "border-line text-mute hover:border-ink lg:hover:text-ink"
              )}
            >
              {o.name}
              {occasion === o.id && <Check size={12} className="hidden lg:inline" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 sm:px-8 sm:pt-40">
      {/* header */}
      <Reveal>
        <Eyebrow>The Boutique</Eyebrow>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-5xl leading-[1.02] font-medium sm:text-6xl">
            Shop the <em className="text-accent">Collection</em>
          </h1>
          <p className="max-w-sm pb-2 text-[14px] leading-relaxed text-mute">
            {products.length} piece{products.length !== 1 ? "s" : ""}, each made by hand and packed like it's the gift
            itself.
          </p>
        </div>
      </Reveal>

      {/* toolbar */}
      <div className="sticky top-[104px] z-40 mt-10 border-y border-line bg-bg/92 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs">
            <Search size={15} strokeWidth={1.6} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-mute" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pieces…"
              className="h-10 w-full border border-line bg-transparent pr-8 pl-10 text-[13px] outline-none transition-colors focus:border-ink"
            />
            {q && (
              <button aria-label="Clear search" onClick={() => setQ("")} className="absolute top-1/2 right-2.5 -translate-y-1/2 text-mute hover:text-ink">
                <X size={14} />
              </button>
            )}
          </div>

          <button
            onClick={() => setFiltersOpen(true)}
            className="flex h-10 items-center gap-2 border border-line px-4 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors hover:border-ink lg:hidden"
          >
            <SlidersHorizontal size={14} /> Filters
            {activeFilters > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[9px] text-bg">{activeFilters}</span>}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <label className="hidden text-[11px] tracking-[0.16em] uppercase text-mute sm:block">Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field h-10 w-auto py-0 text-[12.5px]">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* occasion chip */}
        {occasion && (
          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-2 border border-gold/50 bg-gold/10 px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase">
              {OCCASION_LABELS[occasion]}
              <button aria-label="Clear occasion" onClick={() => setOccasion(null)}>
                <X size={12} />
              </button>
            </span>
            <button onClick={reset} className="text-[11px] tracking-[0.14em] uppercase text-mute underline-offset-4 hover:underline">
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[230px_1fr]">
        {/* sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-[190px]">{filterControls}</div>
        </aside>

        {/* grid */}
        <div>
          {products.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 text-center">
              <p className="font-display text-4xl font-medium">Nothing here… yet.</p>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-mute">
                No pieces match those filters. Loosen one or two — or commission exactly what you imagined.
              </p>
              <button onClick={reset} className="mt-8 bg-ink px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] text-bg uppercase transition-colors hover:bg-accent">
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* custom upsell strip */}
      <Reveal className="mt-24 border border-line bg-surface p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Can't find the one?</Eyebrow>
            <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">We'll make it. Truly.</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-mute">
              Custom favors, centerpieces, gift suites and more — sketched within 24 hours, made within weeks.
            </p>
          </div>
          <CommissionButton />
        </div>
      </Reveal>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div className="fixed inset-0 z-[210] bg-deep/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[220] max-h-[82vh] overflow-y-auto rounded-t-2xl bg-bg px-6 pt-4 pb-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              role="dialog"
              aria-label="Filters"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl font-medium">Refine</p>
                <button aria-label="Close filters" onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-6">{filterControls}</div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-8 flex h-12 w-full items-center justify-center gap-2 bg-ink text-[11px] font-medium tracking-[0.2em] text-bg uppercase"
              >
                Show {products.length} piece{products.length !== 1 ? "s" : ""} <ArrowUpRight size={13} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CommissionButton() {
  const { setCustomOpen } = useStore();
  return (
    <button
      onClick={() => setCustomOpen(true)}
      className="flex items-center gap-2 bg-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-bg uppercase transition-colors hover:bg-accent"
    >
      Start a Custom Order <ArrowUpRight size={14} />
    </button>
  );
}
