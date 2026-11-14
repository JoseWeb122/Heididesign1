import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { PRODUCTS, type Product } from "../data/store";

export type Route =
  | { name: "home" }
  | { name: "shop"; category?: string; occasion?: string; query?: string }
  | { name: "product"; id: string };

export interface CartItem {
  key: string;
  productId: string;
  option?: string;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  message?: string;
  icon?: "cart" | "heart" | "check";
  action?: { label: string; onClick: () => void };
}

interface StoreState {
  theme: "atelier" | "noir";
  toggleTheme: () => void;
  route: Route;
  navigate: (r: Route) => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number, option?: string, silent?: boolean) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
  customOpen: boolean;
  setCustomOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  infoOpen: "shipping" | "returns" | "faq" | "contact" | null;
  setInfoOpen: (v: "shipping" | "returns" | "faq" | "contact" | null) => void;
}

const Ctx = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"atelier" | "noir">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("mf-theme") as "atelier" | "noir") || "atelier";
    }
    return "atelier";
  });
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [infoOpen, setInfoOpen] = useState<"shipping" | "returns" | "faq" | "contact" | null>(null);
  const toastId = useRef(0);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "atelier" ? "noir" : "atelier";
      localStorage.setItem("mf-theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  const navigate = useCallback((r: Route) => {
    setRoute(r);
    setMobileNavOpen(false);
    setSearchOpen(false);
    setQuickView(null);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = ++toastId.current;
      setToasts((ts) => [...ts.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast]
  );

  const addToCart = useCallback(
    (productId: string, qty = 1, option?: string, silent = false) => {
      const key = `${productId}::${option || ""}`;
      setCart((c) => {
        const found = c.find((i) => i.key === key);
        if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...c, { key, productId, option, qty }];
      });
      if (!silent) {
        const p = PRODUCTS.find((x) => x.id === productId);
        pushToast({
          title: "Added to your bag",
          message: p ? `${p.name}${option ? ` — ${option}` : ""}` : undefined,
          icon: "cart",
          action: { label: "View bag", onClick: () => setCartOpen(true) },
        });
      }
    },
    [pushToast]
  );

  const removeFromCart = useCallback((key: string) => {
    setCart((c) => c.filter((i) => i.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((w) => {
        const has = w.includes(productId);
        const p = PRODUCTS.find((x) => x.id === productId);
        pushToast({
          title: has ? "Removed from wishlist" : "Saved to wishlist",
          message: p?.name,
          icon: "heart",
        });
        return has ? w.filter((i) => i !== productId) : [...w, productId];
      });
    },
    [pushToast]
  );

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0;
    let sub = 0;
    for (const item of cart) {
      const p = PRODUCTS.find((x) => x.id === item.productId);
      count += item.qty;
      if (p) sub += p.price * item.qty;
    }
    return { cartCount: count, subtotal: sub };
  }, [cart]);

  const value: StoreState = {
    theme,
    toggleTheme,
    route,
    navigate,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    cartCount,
    subtotal,
    wishlist,
    toggleWishlist,
    toasts,
    pushToast,
    dismissToast,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    searchOpen,
    setSearchOpen,
    mobileNavOpen,
    setMobileNavOpen,
    customOpen,
    setCustomOpen,
    quickView,
    setQuickView,
    infoOpen,
    setInfoOpen,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used within StoreProvider");
  return s;
}
