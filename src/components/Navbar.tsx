import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Contrast, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES } from "../data/store";
import { cn } from "../utils/cn";

export default function Navbar() {
  const {
    navigate, route, cartCount, wishlist, theme, toggleTheme,
    setCartOpen, setWishlistOpen, setSearchOpen, setCustomOpen, setMobileNavOpen, mobileNavOpen, pushToast, setInfoOpen,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overDarkHero = route.name === "home" && !scrolled;
  const solid = !overDarkHero;

  const goSection = (id: string) => {
    navigate({ name: "home" });
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const links: { label: string; onClick: () => void; active?: boolean }[] = [
    { label: "Shop", onClick: () => navigate({ name: "shop" }), active: route.name === "shop" },
    { label: "Collections", onClick: () => goSection("collections") },
    { label: "Custom Orders", onClick: () => setCustomOpen(true) },
    { label: "Our Story", onClick: () => goSection("story") },
    { label: "Contact", onClick: () => setInfoOpen("contact") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-100">
        {/* announcement bar */}
        <div className="bg-deep text-ondeep">
          <p className="px-4 py-2 text-center text-[10px] font-medium tracking-[0.28em] uppercase">
            Handcrafted in small batches · Complimentary shipping over $75
          </p>
        </div>

        <div
          className={cn(
            "transition-all duration-500",
            solid ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent",
          )}
        >
          <nav
            className={cn(
              "mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 transition-colors duration-500 sm:px-8",
              overDarkHero ? "text-white" : "text-ink",
            )}
          >
            {/* left links */}
            <div className="hidden flex-1 items-center gap-7 lg:flex">
              {links.slice(0, 3).map((l) => (
                <button
                  key={l.label}
                  onClick={l.onClick}
                  className={cn(
                    "link-luxe text-[11.5px] font-medium tracking-[0.2em] uppercase",
                    l.active && "active",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* burger */}
            <button
              aria-label="Open menu"
              onClick={() => setMobileNavOpen(true)}
              className="grid h-10 w-10 place-items-center lg:hidden"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            {/* wordmark */}
            <button
              onClick={() => navigate({ name: "home" })}
              className="group flex flex-col items-center leading-none"
              aria-label="Maison Fête home"
            >
              <span className="font-display text-[1.55rem] font-semibold tracking-[0.14em] sm:text-[1.7rem]">
                MAISON&nbsp;FÊTE
              </span>
              <span className="mt-1 text-[8.5px] font-medium tracking-[0.5em] uppercase opacity-60">
                The Celebration Atelier
              </span>
            </button>

            {/* right */}
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <div className="mr-2 hidden items-center gap-7 lg:flex">
                {links.slice(3).map((l) => (
                  <button key={l.label} onClick={l.onClick} className="link-luxe text-[11.5px] font-medium tracking-[0.2em] uppercase">
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                aria-label="Toggle Noir / Atelier theme"
                title={theme === "atelier" ? "Switch to Noir theme" : "Switch to Atelier theme"}
                onClick={toggleTheme}
                className="hidden h-10 w-10 place-items-center transition-opacity hover:opacity-60 sm:grid"
              >
                <Contrast size={17} strokeWidth={1.5} />
              </button>

              <button aria-label="Search" onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center transition-opacity hover:opacity-60">
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button
                aria-label="Account"
                onClick={() =>
                  pushToast({
                    title: "Client accounts",
                    message: "Invitations open with our spring collection — join the list below.",
                    icon: "check",
                  })
                }
                className="hidden h-10 w-10 place-items-center transition-opacity hover:opacity-60 sm:grid"
              >
                <User size={18} strokeWidth={1.5} />
              </button>

              <button aria-label="Wishlist" onClick={() => setWishlistOpen(true)} className="relative grid h-10 w-10 place-items-center transition-opacity hover:opacity-60">
                <Heart size={18} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-semibold text-deep">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button aria-label="Bag" onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center transition-opacity hover:opacity-60">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0 grid h-4 w-4 place-items-center rounded-full bg-accent text-[9px] font-semibold text-ondeep">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ————— mobile nav ————— */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-deep text-ondeep"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col px-7 pt-5 pb-10">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-semibold tracking-[0.14em]">MAISON FÊTE</span>
                <button aria-label="Close menu" onClick={() => setMobileNavOpen(false)} className="grid h-11 w-11 place-items-center">
                  <X size={22} strokeWidth={1.4} />
                </button>
              </div>

              <div className="mt-10 flex flex-col">
                {links.map((l, i) => (
                  <motion.button
                    key={l.label}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={l.onClick}
                    className="group flex items-center justify-between border-b hairline py-5 text-left"
                  >
                    <span className="font-display text-[2rem] font-medium">{l.label}</span>
                    <ArrowRight size={20} strokeWidth={1.4} className="opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-ondeep/50">The Collections</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigate({ name: "shop", category: c.id })}
                      className="border hairline px-3.5 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-ondeep hover:text-deep"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto flex items-center justify-between"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-ondeep/50">
                  {theme === "atelier" ? "Atelier edition" : "Noir edition"}
                </p>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 border hairline px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase"
                >
                  <Contrast size={14} /> {theme === "atelier" ? "Go Noir" : "Go Atelier"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
