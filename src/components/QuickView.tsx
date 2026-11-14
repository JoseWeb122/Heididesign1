import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Minus, Plus, X } from "lucide-react";
import { money, px } from "../data/store";
import { useStore } from "../context/StoreContext";
import { FxImg, Rating } from "./ui";
import { cn } from "../utils/cn";

export default function QuickView() {
  const { quickView, setQuickView, addToCart, wishlist, toggleWishlist, navigate, setCartOpen } = useStore();
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | undefined>();

  useEffect(() => {
    setQty(1);
    setOption(quickView?.options?.choices[0]);
  }, [quickView]);

  const wished = quickView ? wishlist.includes(quickView.id) : false;

  return (
    <AnimatePresence>
      {quickView && (
        <motion.div
          className="fixed inset-0 z-[240] grid place-items-center overflow-y-auto bg-deep/60 p-4 backdrop-blur-[3px] sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-4xl overflow-hidden bg-bg shadow-2xl md:grid-cols-2"
            role="dialog"
            aria-label={`Quick view of ${quickView.name}`}
          >
            <button
              aria-label="Close quick view"
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-surface/90 backdrop-blur transition-transform hover:scale-105"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <div className="relative aspect-[4/5] bg-sheer md:aspect-auto md:min-h-[540px]">
              <FxImg src={px(quickView.images[0], 900, 1125)} alt={quickView.name} className="absolute inset-0 h-full w-full" />
              {quickView.bestseller && (
                <span className="absolute top-3 left-3 bg-deep px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-ondeep uppercase">
                  Bestseller
                </span>
              )}
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <Rating value={quickView.rating} />
              <h3 className="mt-3 font-display text-[1.9rem] leading-tight font-medium">{quickView.name}</h3>
              <p className="mt-2 text-lg font-medium tabular-nums">{money(quickView.price)}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-mute">{quickView.blurb}</p>

              {quickView.options && (
                <div className="mt-6">
                  <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-mute">
                    {quickView.options.label} — <span className="text-ink">{option}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quickView.options.choices.map((c) => (
                      <button
                        key={c}
                        onClick={() => setOption(c)}
                        className={cn(
                          "border px-3.5 py-2 text-[12px] tracking-wide transition-all",
                          option === c ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-7 flex gap-3">
                <div className="flex items-center border border-line">
                  <button aria-label="Decrease quantity" onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-12 w-11 place-items-center transition-colors hover:bg-sheer">
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((n) => n + 1)} className="grid h-12 w-11 place-items-center transition-colors hover:bg-sheer">
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(quickView.id, qty, quickView.options ? option : undefined, true);
                    setQuickView(null);
                    setCartOpen(true);
                  }}
                  className="flex h-12 flex-1 items-center justify-center gap-2 bg-ink text-[11px] font-medium tracking-[0.2em] text-bg uppercase transition-colors hover:bg-accent"
                >
                  Add to Bag — {money(quickView.price * qty)}
                </button>
                <button
                  aria-label="Toggle wishlist"
                  onClick={() => toggleWishlist(quickView.id)}
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center border transition-all",
                    wished ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
                  )}
                >
                  <Heart size={16} fill={wished ? "currentColor" : "none"} />
                </button>
              </div>

              <button
                onClick={() => navigate({ name: "product", id: quickView.id })}
                className="group mt-5 inline-flex items-center gap-2 self-start text-[12px] font-medium tracking-[0.18em] uppercase text-accent"
              >
                View full details
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
