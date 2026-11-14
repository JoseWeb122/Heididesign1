import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, X } from "lucide-react";
import { PRODUCTS, money, px } from "../data/store";
import { useStore } from "../context/StoreContext";
import { FxImg, Rating } from "./ui";

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart, navigate, setCartOpen } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[210] bg-deep/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[220] flex w-full max-w-md flex-col bg-bg text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            role="dialog"
            aria-label="Wishlist"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="font-display text-2xl font-medium">
                Wishlist{" "}
                <span className="font-sans text-sm tracking-wide text-mute">
                  {items.length > 0 && `${items.length} saved`}
                </span>
              </p>
              <button aria-label="Close wishlist" onClick={() => setWishlistOpen(false)} className="grid h-10 w-10 place-items-center transition-opacity hover:opacity-50">
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-line text-mute">
                  <Heart size={22} strokeWidth={1.3} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium">Nothing saved yet</h3>
                <p className="mt-2 max-w-[250px] text-sm leading-relaxed text-mute">
                  Tap the heart on any piece to keep it here while you decide.
                </p>
                <button
                  onClick={() => {
                    setWishlistOpen(false);
                    navigate({ name: "shop" });
                  }}
                  className="mt-7 flex items-center gap-2 border border-ink/25 px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-ink hover:text-bg"
                >
                  Discover pieces <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6">
                {items.map((p) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 border-b border-line py-5">
                    <button
                      onClick={() => {
                        setWishlistOpen(false);
                        navigate({ name: "product", id: p.id });
                      }}
                      className="block h-28 w-[5.4rem] shrink-0 overflow-hidden bg-sheer"
                    >
                      <FxImg src={px(p.images[0], 260, 340)} alt={p.name} className="h-full w-full" />
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => {
                            setWishlistOpen(false);
                            navigate({ name: "product", id: p.id });
                          }}
                          className="text-left font-display text-lg leading-snug font-medium hover:text-accent"
                        >
                          {p.name}
                        </button>
                        <button aria-label="Remove" onClick={() => toggleWishlist(p.id)} className="mt-1 text-mute hover:text-ink">
                          <X size={15} />
                        </button>
                      </div>
                      <Rating value={p.rating} size={11} className="mt-1" />
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <p className="text-[15px] font-medium tabular-nums">{money(p.price)}</p>
                        <button
                          onClick={() => {
                            addToCart(p.id, 1, undefined, true);
                            toggleWishlist(p.id);
                            setWishlistOpen(false);
                            setCartOpen(true);
                          }}
                          className="flex items-center gap-2 bg-ink px-4 py-2.5 text-[10px] font-medium tracking-[0.16em] text-bg uppercase transition-colors hover:bg-accent"
                        >
                          <ShoppingBag size={12} /> Move to bag
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
