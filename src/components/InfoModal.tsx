import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, Mail, MapPin, Package, Phone, RotateCcw, Truck, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { Eyebrow } from "./ui";
import { cn } from "../utils/cn";

const FAQS = [
  {
    q: "How far in advance should I order for my event?",
    a: "Stock pieces ship in 3–7 business days. Custom commissions need 2–3 weeks from approved sketch to doorstep — we recommend reaching out 5–6 weeks before the day itself so nothing feels rushed.",
  },
  {
    q: "Can I match pieces to my exact color palette?",
    a: "Absolutely — it's our favorite brief. Share hex codes, fabric swatches or a mood board and we'll hand-dye ribbons, curate beads and choose papers to match before we make a single piece.",
  },
  {
    q: "Do you offer bulk or event pricing?",
    a: "Yes. Orders of 50+ favors receive tiered studio pricing, and full-event suites (favors + centerpieces + candles) are quoted as one considered package. Start a custom request for a tailored quote.",
  },
  {
    q: "Are the chocolates in the favors allergen-safe?",
    a: "Our Belgian chocolate hearts contain milk and soy and are made in a facility handling nuts. Vegan and allergen-free alternatives are available for any favor — just note it in your request.",
  },
  {
    q: "What if something arrives damaged before my event?",
    a: "Photograph it and write to us within 48 hours — we remake and rush-ship replacements at our cost. Your day matters more than our margin.",
  },
];

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-line bg-surface px-5 py-4">
      <p className="text-[12px] font-semibold tracking-[0.14em] uppercase">{title}</p>
      <div className="mt-2 text-[13.5px] leading-relaxed text-mute">{children}</div>
    </div>
  );
}

export default function InfoModal() {
  const { infoOpen, setInfoOpen, setCustomOpen } = useStore();
  const [openFaq, setOpenFaq] = useState(0);

  const titles: Record<string, { eyebrow: string; title: string }> = {
    shipping: { eyebrow: "Customer Care", title: "Shipping & Delivery" },
    returns: { eyebrow: "Customer Care", title: "Returns & Exchanges" },
    faq: { eyebrow: "Customer Care", title: "Frequently Asked" },
    contact: { eyebrow: "The Atelier", title: "Contact the Studio" },
  };

  return (
    <AnimatePresence>
      {infoOpen && (
        <motion.div
          className="fixed inset-0 z-[240] grid place-items-center overflow-y-auto bg-deep/70 p-4 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setInfoOpen(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-xl bg-bg p-7 shadow-2xl sm:p-10"
            role="dialog"
            aria-label={titles[infoOpen].title}
          >
            <button aria-label="Close" onClick={() => setInfoOpen(null)} className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-sheer">
              <X size={18} strokeWidth={1.5} />
            </button>

            <Eyebrow>{titles[infoOpen].eyebrow}</Eyebrow>
            <h3 className="mt-3 font-display text-4xl font-medium">{titles[infoOpen].title}</h3>

            {infoOpen === "shipping" && (
              <div className="mt-6 space-y-3">
                <Panel title="Complimentary over $75">
                  <span className="flex items-start gap-3"><Truck size={16} className="mt-0.5 shrink-0 text-accent" /> Every orders over $75 ships free, tracked and insured. Under $75, a flat $8 keeps it simple.</span>
                </Panel>
                <Panel title="Timing">
                  <span className="flex items-start gap-3"><Package size={16} className="mt-0.5 shrink-0 text-accent" /> Stock pieces leave the atelier in 3–7 business days. Custom work follows the timeline on your approved sketch — typically 2–3 weeks. Event in a hurry? Ask about rush production.</span>
                </Panel>
                <Panel title="Wrapping">
                  Everything is packed in tissue, ribbon and rigid boxes — no plastic, no exceptions. International shipping to 40+ countries, duties calculated at checkout.
                </Panel>
              </div>
            )}

            {infoOpen === "returns" && (
              <div className="mt-6 space-y-3">
                <Panel title="30 days, no interrogation">
                  <span className="flex items-start gap-3"><RotateCcw size={16} className="mt-0.5 shrink-0 text-accent" /> Unopened, unused pieces return free within 30 days of delivery. Refunds land within 5 business days of arrival back at the studio.</span>
                </Panel>
                <Panel title="Personalized work">
                  Monogrammed, engraved or custom-colored pieces are made for you alone and can't be returned — but if we got a detail wrong, we remake it right, immediately and at our expense.
                </Panel>
                <Panel title="How to start a return">
                  Write to returns@maisonfete.com with your order number. We'll send a prepaid label the same day.
                </Panel>
              </div>
            )}

            {infoOpen === "faq" && (
              <div className="mt-6">
                {FAQS.map((f, i) => (
                  <div key={i} className="border-b border-line last:border-b-0">
                    <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-4 text-left">
                      <span className="font-display text-[1.15rem] leading-snug font-medium">{f.q}</span>
                      <ChevronDown size={15} strokeWidth={1.5} className={cn("shrink-0 transition-transform duration-500", openFaq === i && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-[13.5px] leading-relaxed text-mute">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {infoOpen === "contact" && (
              <div className="mt-6 space-y-3">
                <Panel title="Write to us">
                  <span className="flex items-start gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-accent" /> hello@maisonfete.com — a human (usually Elodie) replies within one business day.</span>
                </Panel>
                <Panel title="Call the studio">
                  <span className="flex items-start gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-accent" /> (518) 555-0142 · Tue–Sat, 10am–5pm Eastern.</span>
                </Panel>
                <Panel title="Visit">
                  <span className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /> The Atelier · 14 Linden Row, Hudson NY — by appointment, so the kettle's on.</span>
                </Panel>
                <button
                  onClick={() => {
                    setInfoOpen(null);
                    setCustomOpen(true);
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-2 bg-ink py-4 text-[11px] font-medium tracking-[0.22em] text-bg uppercase transition-colors hover:bg-accent"
                >
                  <Clock size={14} /> Start a Custom Request Instead
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
