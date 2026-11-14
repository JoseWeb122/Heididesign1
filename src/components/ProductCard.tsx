import { motion } from "framer-motion";
import { Eye, Heart, Plus } from "lucide-react";
import { money, px, type Product } from "../data/store";
import { useStore } from "../context/StoreContext";
import { FxImg, Rating } from "./ui";
import { cn } from "../utils/cn";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { navigate, addToCart, setQuickView, wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* image stage */}
      <div className="relative overflow-hidden bg-sheer">
        <button
          aria-label={`View ${product.name}`}
          onClick={() => navigate({ name: "product", id: product.id })}
          className="block aspect-[4/5] w-full cursor-pointer"
        >
          <FxImg
            src={px(product.images[0], 760, 950)}
            alt={product.name}
            className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <FxImg
            src={px(product.images[1], 760, 950)}
            alt=""
            className="absolute inset-0 h-full w-full opacity-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:opacity-100"
          />
        </button>

        {/* badges */}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="bg-deep px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ondeep">New</span>
          )}
          {product.bestseller && (
            <span className="bg-surface/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink backdrop-blur">
              Bestseller
            </span>
          )}
          {product.customizable && (
            <span className="border border-line bg-surface/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur">
              Customizable
            </span>
          )}
        </div>

        {/* wishlist */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-all duration-300",
            wished
              ? "bg-ink text-bg"
              : "bg-surface/85 text-ink hover:bg-surface sm:opacity-0 sm:group-hover:opacity-100"
          )}
        >
          <Heart size={15} fill={wished ? "currentColor" : "none"} strokeWidth={1.8} />
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product.id)}
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-ink text-[11px] font-medium uppercase tracking-[0.18em] text-bg transition-colors hover:bg-accent"
          >
            <Plus size={14} /> Add to Bag
          </button>
          <button
            aria-label="Quick view"
            onClick={() => setQuickView(product)}
            className="grid h-11 w-11 place-items-center bg-surface/95 text-ink backdrop-blur transition-colors hover:bg-surface"
          >
            <Eye size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* meta */}
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <Rating value={product.rating} />
          <span className="text-[11px] tracking-wide text-mute">{product.reviews} reviews</span>
        </div>
        <button
          onClick={() => navigate({ name: "product", id: product.id })}
          className="mt-1.5 block text-left font-display text-[1.35rem] leading-tight font-medium transition-colors duration-300 hover:text-accent"
        >
          {product.name}
        </button>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-mute">{product.blurb}</p>
        <p className="mt-2 text-[15px] font-medium tracking-wide">{money(product.price)}</p>
      </div>
    </motion.article>
  );
}
