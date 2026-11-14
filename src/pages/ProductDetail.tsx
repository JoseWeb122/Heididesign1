import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Leaf, Minus, Package, PenLine, Plus, RotateCcw, ShoppingBag, Truck,
} from "lucide-react";
import { CATEGORIES, OCCASION_LABELS, PRODUCTS, money, px } from "../data/store";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Eyebrow, FxImg, Rating, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

function Accordion({ title, icon: Icon, children, open, onToggle }: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-4 text-left">
        <span className="flex items-center gap-3 text-[12px] font-medium tracking-[0.18em] uppercase">
          <Icon size={15} strokeWidth={1.5} className="text-accent" />
          {title}
        </span>
        <ChevronDown size={15} strokeWidth={1.5} className={cn("transition-transform duration-500", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[13.5px] leading-relaxed text-mute">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail({ id }: { id: string }) {
  const { addToCart, setCartOpen, wishlist, toggleWishlist, navigate, setCustomOpen } = useStore();
  const product = PRODUCTS.find((p) => p.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | undefined>(product?.options?.choices[0]);
  const [added, setAdded] = useState(false);
  const [openAcc, setOpenAcc] = useState(0);

  useEffect(() => {
    setImgIdx(0);
    setQty(1);
    setOption(product?.options?.choices[0]);
    setOpenAcc(0);
  }, [id, product]);

  const category = product ? CATEGORIES.find((c) => c.id === product.category) : undefined;

  const gallery = useMemo(() => {
    if (!product) return [];
    const base = [
      { id: product.images[0], label: "Studio" },
      { id: product.images[1], label: "Detail" },
    ];
    if (category) base.push({ id: category.img, label: "In context" });
    return base;
  }, [product, category]);

  const related = useMemo(() => {
    if (!product) return [];
    const same = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
    const rest = PRODUCTS.filter((p) => p.category !== product.category && p.id !== product.id);
    return [...same, ...rest].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-4xl font-medium">This piece has sold out… completely.</p>
        <button onClick={() => navigate({ name: "shop" })} className="mt-8 bg-ink px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] text-bg uppercase">
          Back to the Boutique
        </button>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);

  const handleAdd = () => {
    addToCart(product.id, qty, product.options ? option : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const buyNow = () => {
    addToCart(product.id, qty, product.options ? option : undefined, true);
    setCartOpen(true);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      {/* breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-mute">
        <button onClick={() => navigate({ name: "home" })} className="transition-colors hover:text-ink">Home</button>
        <span>/</span>
        <button onClick={() => navigate({ name: "shop" })} className="transition-colors hover:text-ink">Shop</button>
        <span>/</span>
        <button onClick={() => navigate({ name: "shop", category: product.category })} className="transition-colors hover:text-ink">
          {category?.name}
        </button>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </motion.div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* ——— gallery ——— */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-sheer">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIdx}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <FxImg src={px(gallery[imgIdx].id, 1100, 1375)} alt={`${product.name} — ${gallery[imgIdx].label}`} eager className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && <span className="bg-deep px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-ondeep uppercase">New</span>}
              {product.bestseller && <span className="bg-surface/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase backdrop-blur">Bestseller</span>}
            </div>
            <span className="absolute right-4 bottom-4 bg-deep/70 px-3 py-1.5 text-[10px] tracking-[0.22em] text-ondeep uppercase backdrop-blur">
              {gallery[imgIdx].label} · {imgIdx + 1}/{gallery.length}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                aria-label={`View ${g.label}`}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden bg-sheer transition-all",
                  imgIdx === i ? "ring-1 ring-ink ring-offset-2 ring-offset-bg" : "opacity-70 hover:opacity-100"
                )}
              >
                <FxImg src={px(g.id, 360, 270)} alt={g.label} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* ——— details ——— */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="lg:sticky lg:top-36 lg:self-start">
          <Eyebrow>{category?.name}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl leading-[1.03] font-medium sm:text-5xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} size={14} />
            <span className="text-[12.5px] text-mute">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
            <span className="text-line">|</span>
            <span className="text-[12.5px] tracking-wide text-accent">In stock · made to order</span>
          </div>

          <p className="mt-5 text-2xl font-medium tabular-nums">{money(product.price)}</p>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-mute">{product.description}</p>

          {/* options */}
          {product.options && (
            <div className="mt-7">
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-mute">
                {product.options.label} — <span className="text-ink">{option}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.options.choices.map((c) => (
                  <button
                    key={c}
                    onClick={() => setOption(c)}
                    className={cn(
                      "border px-4 py-2.5 text-[12.5px] tracking-wide transition-all",
                      option === c ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* qty + actions */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-line">
              <button aria-label="Decrease quantity" onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-13 w-12 place-items-center transition-colors hover:bg-sheer">
                <Minus size={14} />
              </button>
              <span className="w-9 text-center text-[15px] font-medium tabular-nums">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((n) => n + 1)} className="grid h-13 w-12 place-items-center transition-colors hover:bg-sheer">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={cn(
                "flex h-13 flex-1 items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300",
                added ? "bg-accent text-ondeep" : "bg-ink text-bg hover:bg-accent"
              )}
            >
              {added ? <><Check size={15} /> Added to your bag</> : <><ShoppingBag size={14} /> Add to Bag</>}
            </button>
            <button
              aria-label="Toggle wishlist"
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "grid h-13 w-13 shrink-0 place-items-center border transition-all",
                wished ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
              )}
            >
              <Heart size={17} fill={wished ? "currentColor" : "none"} strokeWidth={1.6} />
            </button>
          </div>
          <button
            onClick={buyNow}
            className="mt-3 flex h-13 w-full items-center justify-center gap-2 border border-ink text-[11px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-ink hover:text-bg"
          >
            Buy It Now <ArrowRight size={13} />
          </button>

          {/* shipping strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border border-line bg-surface px-5 py-4 text-[12px] tracking-wide text-mute">
            <span className="flex items-center gap-2"><Truck size={14} className="text-accent" /> Free over $75 · flat $8 under</span>
            <span className="flex items-center gap-2"><Package size={14} className="text-accent" /> Ships in 3–7 days</span>
            <span className="flex items-center gap-2"><RotateCcw size={14} className="text-accent" /> 30-day returns</span>
          </div>

          {/* accordions */}
          <div className="mt-6 border-t border-line">
            <Accordion title="Details & materials" icon={Leaf} open={openAcc === 0} onToggle={() => setOpenAcc(openAcc === 0 ? -1 : 0)}>
              <ul className="space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-gold" />
                    {d}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Personalization" icon={PenLine} open={openAcc === 1} onToggle={() => setOpenAcc(openAcc === 1 ? -1 : 1)}>
              {product.customizable ? (
                <>
                  This piece loves to be personalized — monograms, palettes, tags and inscriptions. Add it to your bag
                  with the options above, or{" "}
                  <button onClick={() => setCustomOpen(true)} className="font-medium text-accent underline underline-offset-4">
                    open a custom commission
                  </button>{" "}
                  for something beyond the menu.
                </>
              ) : (
                <>This piece arrives exactly as pictured, finished by hand. For bespoke variations, our atelier takes commissions year-round.</>
              )}
            </Accordion>
            <Accordion title="Shipping & returns" icon={Truck} open={openAcc === 2} onToggle={() => setOpenAcc(openAcc === 2 ? -1 : 2)}>
              Every order is wrapped in tissue and ribbon — no plastic, ever. Tracked shipping in 3–7 business days;
              rush production available for events. Unopened pieces return free within 30 days, personalized work
              excluded.
            </Accordion>
          </div>

          {/* occasions */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] tracking-[0.22em] uppercase text-mute">Lovely for:</span>
            {product.occasions.map((o) => (
              <button
                key={o}
                onClick={() => navigate({ name: "shop", occasion: o })}
                className="border border-line px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-all hover:border-ink hover:bg-ink hover:text-bg"
              >
                {OCCASION_LABELS[o]}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* related */}
      <div className="mt-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Keep Looking</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-medium">You May Also <em className="text-accent">Like</em></h2>
          </div>
          <button
            onClick={() => navigate({ name: "shop" })}
            className="group flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-accent"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to the boutique
          </button>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
