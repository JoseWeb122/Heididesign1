import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { FREE_SHIP_THRESHOLD, PRODUCTS, money, px } from "../data/store";
import { useStore } from "../context/StoreContext";
import { FxImg } from "./ui";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeFromCart, subtotal, clearCart, navigate } = useStore();
  const [phase, setPhase] = useState<"cart" | "processing" | "done">("cart");

  useEffect(() => {
    if (!cartOpen) setTimeout(() => setPhase("cart"), 400);
  }, [cartOpen]);

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  const checkout = () => {
    setPhase("processing");
    setTimeout(() => {
      setPhase("done");
      clearCart();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[210] bg-deep/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[220] flex w-full max-w-md flex-col bg-bg text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* head */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <p className="font-display text-2xl font-medium">
                Your Bag{" "}
                <span className="text-sm font-sans text-mute tracking-wide">
                  {cart.length > 0 && `${cart.reduce((n, i) => n + i.qty, 0)} item${cart.length !== 1 ? "s" : ""}`}
                </span>
              </p>
              <button aria-label="Close bag" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center transition-opacity hover:opacity-50">
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>

            {phase === "done" ? (
              /* ——— success ——— */
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 14 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-ink text-bg"
                >
                  <Check size={26} strokeWidth={2} />
                </motion.span>
                <h3 className="mt-6 font-display text-3xl font-medium">Order Confirmed</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-mute">
                  Order MF-{Math.floor(1000 + Math.random() * 9000)} is being wrapped in tissue as we speak. A
                  confirmation will arrive by email shortly.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate({ name: "shop" });
                  }}
                  className="mt-8 flex items-center gap-2 bg-ink px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] text-bg uppercase transition-colors hover:bg-accent"
                >
                  Keep Exploring <ArrowRight size={13} />
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* ——— empty ——— */
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-line text-mute">
                  <ShoppingBag size={22} strokeWidth={1.3} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium">Your bag is empty</h3>
                <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-mute">
                  Fill it with things worth keeping — and celebrating.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate({ name: "shop" });
                  }}
                  className="mt-7 flex items-center gap-2 border border-ink/25 px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all hover:bg-ink hover:text-bg"
                >
                  Shop the Collection <ArrowRight size={13} />
                </button>
              </div>
            ) : (
              <>
                {/* shipping progress */}
                <div className="border-b border-line px-6 py-4">
                  <p className="flex items-center gap-2 text-[12px] tracking-wide text-mute">
                    <Truck size={14} strokeWidth={1.6} className="text-accent" />
                    {remaining > 0 ? (
                      <span>
                        <strong className="font-semibold text-ink">{money(remaining)}</strong> away from complimentary
                        shipping
                      </span>
                    ) : (
                      <span className="text-accent">Complimentary shipping unlocked</span>
                    )}
                  </p>
                  <div className="mt-2.5 h-[3px] w-full bg-line">
                    <motion.div
                      className="h-full bg-gold"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                {/* items */}
                <div className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => {
                      const p = PRODUCTS.find((x) => x.id === item.productId);
                      if (!p) return null;
                      return (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          className="flex gap-4 border-b border-line py-5"
                        >
                          <button
                            onClick={() => {
                              setCartOpen(false);
                              navigate({ name: "product", id: p.id });
                            }}
                            className="block h-24 w-20 shrink-0 overflow-hidden bg-sheer"
                          >
                            <FxImg src={px(p.images[0], 240, 300)} alt={p.name} className="h-full w-full" />
                          </button>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <button
                                onClick={() => {
                                  setCartOpen(false);
                                  navigate({ name: "product", id: p.id });
                                }}
                                className="text-left font-display text-lg leading-snug font-medium hover:text-accent"
                              >
                                {p.name}
                              </button>
                              <button
                                aria-label="Remove item"
                                onClick={() => removeFromCart(item.key)}
                                className="mt-1 text-mute transition-colors hover:text-ink"
                              >
                                <X size={15} />
                              </button>
                            </div>
                            {item.option && <p className="mt-0.5 text-xs text-mute">{item.option}</p>}
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center border border-line">
                                <button aria-label="Decrease" onClick={() => setQty(item.key, item.qty - 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-sheer">
                                  <Minus size={12} />
                                </button>
                                <span className="w-8 text-center text-sm tabular-nums">{item.qty}</span>
                                <button aria-label="Increase" onClick={() => setQty(item.key, item.qty + 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-sheer">
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="text-[15px] font-medium tabular-nums">{money(p.price * item.qty)}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* summary */}
                <div className="border-t border-line bg-surface px-6 py-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-mute">Subtotal</span>
                    <span className="font-medium tabular-nums">{money(subtotal)}</span>
                  </div>
                  <div className="mt-1.5 flex justify-between text-sm">
                    <span className="text-mute">Estimated shipping</span>
                    <span className="font-medium tabular-nums">{remaining > 0 ? "$8.00" : "Complimentary"}</span>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={phase === "processing"}
                    className="mt-4 flex h-13 w-full items-center justify-center gap-2 bg-ink text-[11px] font-medium tracking-[0.22em] text-bg uppercase transition-colors hover:bg-accent disabled:opacity-70"
                  >
                    {phase === "processing" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
                        Wrapping your order…
                      </>
                    ) : (
                      <>
                        Checkout · {money(subtotal + (remaining > 0 ? 8 : 0))} <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[11px] tracking-wide text-mute">
                    Handwrapped &amp; ships within 3–7 business days
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
