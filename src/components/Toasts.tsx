import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingBag, X } from "lucide-react";
import { useStore } from "../context/StoreContext";

const icons = {
  cart: ShoppingBag,
  heart: Heart,
  check: Check,
};

export default function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[260] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.icon || "check"];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="pointer-events-auto flex items-center gap-3.5 border border-line bg-surface px-4 py-3.5 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-bg">
                <Icon size={14} strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold tracking-wide">{t.title}</p>
                {t.message && <p className="truncate text-xs text-mute">{t.message}</p>}
              </div>
              {t.action && (
                <button
                  onClick={() => {
                    t.action!.onClick();
                    dismissToast(t.id);
                  }}
                  className="shrink-0 text-[11px] font-medium tracking-[0.14em] uppercase text-accent underline-offset-4 hover:underline"
                >
                  {t.action.label}
                </button>
              )}
              <button aria-label="Dismiss" onClick={() => dismissToast(t.id)} className="shrink-0 text-mute hover:text-ink">
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
