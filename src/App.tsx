import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StoreProvider, useStore } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import SearchOverlay from "./components/SearchOverlay";
import QuickView from "./components/QuickView";
import CustomOrderModal from "./components/CustomOrderModal";
import InfoModal from "./components/InfoModal";
import Toasts from "./components/Toasts";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

function Shell() {
  const { route, theme, cartOpen, wishlistOpen, searchOpen, customOpen, quickView, mobileNavOpen, infoOpen } = useStore();

  // apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // lock body scroll when any overlay is open
  useEffect(() => {
    const locked = cartOpen || wishlistOpen || searchOpen || customOpen || !!quickView || mobileNavOpen || !!infoOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, wishlistOpen, searchOpen, customOpen, quickView, mobileNavOpen, infoOpen]);

  const pageKey =
    route.name === "product" ? `product-${route.id}` : route.name === "shop" ? "shop" : "home";

  return (
    <div className="grain min-h-screen bg-bg text-ink">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pageKey}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {route.name === "home" && <Home />}
          {route.name === "shop" && <Shop />}
          {route.name === "product" && <ProductDetail id={route.id} />}
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* overlays */}
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <QuickView />
      <CustomOrderModal />
      <InfoModal />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
