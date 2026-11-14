import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, Search, TrendingUp, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, money, px } from "../data/store";
import { useStore } from "../context/StoreContext";
import { FxImg } from "./ui";

const POPULAR = ["Chocolate candle", "Bridal favors", "Pearl", "Centerpiece", "Balloon garland", "Necklace"];

let recents: string[] = [];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [q, setQ] = useState("");
  const [recentList, setRecentList] = useState<string[]>(recents);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
      setQ("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.blurb.toLowerCase().includes(t) ||
        p.category.includes(t) ||
        p.occasions.some((o) => o.includes(t))
    ).slice(0, 8);
  }, [q]);

  const catMatches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(t));
  }, [q]);

  const commit = (term: string) => {
    const t = term.trim();
    if (!t) return;
    recents = [t, ...recents.filter((r) => r !== t)].slice(0, 4);
    setRecentList(recents);
    navigate({ name: "shop", query: t });
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[230] overflow-y-auto bg-bg/97 backdrop-blur-xl"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Search"
        >
          <div className="mx-auto max-w-4xl px-5 pt-24 pb-16 sm:px-8 sm:pt-32">
            <button
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="fixed top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-sheer"
            >
              <X size={19} strokeWidth={1.5} />
            </button>

            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-accent">Search the Atelier</p>

            <form
              className="mt-4 flex items-center gap-4 border-b-2 border-ink pb-4"
              onSubmit={(e) => {
                e.preventDefault();
                commit(q);
              }}
            >
              <Search size={26} strokeWidth={1.2} className="shrink-0 text-mute" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Favors, candles, something gold…"
                className="w-full bg-transparent font-display text-3xl font-medium outline-none placeholder:text-mute/50 sm:text-4xl"
              />
              {q && (
                <button type="submit" aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-bg transition-colors hover:bg-accent">
                  <ArrowRight size={17} />
                </button>
              )}
            </form>

            {/* idle state: popular + recent */}
            {!q && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-10 grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] uppercase text-mute">
                    <TrendingUp size={13} /> Popular right now
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p}
                        onClick={() => setQ(p)}
                        className="border border-line px-4 py-2 text-[12.5px] tracking-wide transition-all hover:border-ink hover:bg-ink hover:text-bg"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.24em] uppercase text-mute">
                    <Clock size={13} /> Your recent searches
                  </p>
                  {recentList.length === 0 ? (
                    <p className="mt-4 text-sm text-mute italic font-display text-base">Nothing yet — the atelier awaits.</p>
                  ) : (
                    <div className="mt-4 flex flex-col">
                      {recentList.map((r) => (
                        <button
                          key={r}
                          onClick={() => commit(r)}
                          className="group flex items-center justify-between border-b border-line py-3 text-left text-[15px] transition-colors hover:text-accent"
                        >
                          {r}
                          <ArrowUpRight size={15} className="opacity-0 transition-opacity group-hover:opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* results */}
            {q && (
              <div className="mt-10">
                {catMatches.length > 0 && (
                  <div className="mb-8 flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-[11px] font-medium tracking-[0.24em] uppercase text-mute">Collections</span>
                    {catMatches.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => navigate({ name: "shop", category: c.id })}
                        className="border border-line px-4 py-2 text-[12.5px] tracking-wide transition-all hover:border-ink hover:bg-ink hover:text-bg"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}

                {results.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="font-display text-2xl font-medium">Nothing found for “{q}”</p>
                    <p className="mt-2 text-sm text-mute">Try “candle”, “favor”, “bracelet” — or ask us to make it custom.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                    {results.map((p, i) => (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        onClick={() => navigate({ name: "product", id: p.id })}
                        className="group text-left"
                      >
                        <div className="aspect-[4/5] overflow-hidden bg-sheer">
                          <FxImg
                            src={px(p.images[0], 420, 525)}
                            alt={p.name}
                            className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-3 font-display text-[1.05rem] leading-tight font-medium group-hover:text-accent">{p.name}</p>
                        <p className="mt-0.5 text-[13px] font-medium text-mute">{money(p.price)}</p>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
