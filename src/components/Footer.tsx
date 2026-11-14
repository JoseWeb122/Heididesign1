import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES } from "../data/store";

/* minimal bespoke social marks */
const SocialIcon = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const InstagramMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);
const PinterestMark = () => (
  <SocialIcon d="M12 2.5a9.5 9.5 0 0 0-3.5 18.35c-.1-.8-.2-2 .04-2.9l1.2-4.95s-.3-.6-.3-1.5c0-1.4.8-2.45 1.85-2.45.87 0 1.3.65 1.3 1.44 0 .87-.56 2.18-.84 3.4-.24 1 .5 1.82 1.5 1.82 1.8 0 3.18-1.9 3.18-4.63 0-2.42-1.74-4.12-4.23-4.12a4.4 4.4 0 0 0-4.58 4.4c0 .87.34 1.8.75 2.32.08.1.1.19.07.29l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.78 0 3.44-2.17 6.21-5.19 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.23.87-.84 1.96-1.25 2.62A9.5 9.5 0 1 0 12 2.5Z" />
);
const FacebookMark = () => (
  <SocialIcon d="M14.5 21.5v-7.2h2.42l.36-2.8H14.5V9.7c0-.81.23-1.36 1.39-1.36h1.49V5.85c-.26-.03-1.14-.11-2.16-.11-2.14 0-3.6 1.3-3.6 3.7v2.06H9.19v2.8h2.43v7.2" />
);
const YouTubeMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5.5" width="20" height="13" rx="4" />
    <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </svg>
);

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <div className="border-b hairline py-14">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-ondeep/50">The Fête List</p>
          <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
            Occasions, delivered <em className="text-gold">beautifully</em>.
          </h3>
        </div>
        {state === "done" ? (
          <p className="flex items-center gap-3 text-[15px] text-ondeep/80">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border hairline text-gold">
              <Check size={15} strokeWidth={2} />
            </span>
            You're on the list. Watch your inbox for something lovely.
          </p>
        ) : (
          <form onSubmit={submit} className="w-full">
            <div className="flex border hairline">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                placeholder="Your email address"
                className="h-13 w-full bg-transparent px-5 text-sm text-ondeep outline-none placeholder:text-ondeep/40"
              />
              <button
                type="submit"
                className="flex h-13 shrink-0 items-center gap-2 bg-ondeep px-6 text-[11px] font-medium tracking-[0.2em] uppercase text-deep transition-colors hover:bg-gold"
              >
                Join <ArrowRight size={14} />
              </button>
            </div>
            {state === "error" && <p className="mt-2 text-xs text-[#d08f6e]">Please enter a valid email address.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const { navigate, setCustomOpen, setInfoOpen } = useStore();

  const cols: { title: string; items: { label: string; onClick: () => void }[] }[] = [
    {
      title: "Shop",
      items: CATEGORIES.map((c) => ({
        label: c.name,
        onClick: () => navigate({ name: "shop", category: c.id }),
      })),
    },
    {
      title: "Customer Care",
      items: [
        { label: "Contact the Studio", onClick: () => setInfoOpen("contact") },
        { label: "Shipping & Delivery", onClick: () => setInfoOpen("shipping") },
        { label: "Returns & Exchanges", onClick: () => setInfoOpen("returns") },
        { label: "FAQ", onClick: () => setInfoOpen("faq") },
      ],
    },
    {
      title: "The Atelier",
      items: [
        {
          label: "Our Story",
          onClick: () => {
            navigate({ name: "home" });
            setTimeout(() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }), 120);
          },
        },
        { label: "Custom Orders", onClick: () => setCustomOpen(true) },
        {
          label: "Events & Styled Shoots",
          onClick: () => {
            navigate({ name: "home" });
            setTimeout(() => document.getElementById("occasions")?.scrollIntoView({ behavior: "smooth" }), 120);
          },
        },
      ],
    },
  ];

  return (
    <footer id="contact" className="bg-deep text-ondeep">
      <FooterNewsletter />

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* brand */}
        <div>
          <p className="font-display text-3xl font-semibold tracking-[0.12em]">MAISON FÊTE</p>
          <p className="mt-1 text-[9px] font-medium tracking-[0.5em] uppercase text-ondeep/50">The Celebration Atelier</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ondeep/60">
            Handcrafted favors, centerpieces, jewelry and candles — made slowly, in small batches, for the moments
            you'll remember.
          </p>
          <div className="mt-7 flex items-center gap-5 text-sm text-ondeep/60">
            <a href="mailto:hello@maisonfete.com" className="flex items-center gap-2 transition-colors hover:text-ondeep">
              <Mail size={15} strokeWidth={1.6} /> hello@maisonfete.com
            </a>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-ondeep/60">
            <MapPin size={15} strokeWidth={1.6} /> The Atelier · 14 Linden Row, Hudson NY
          </p>
          <div className="mt-7 flex gap-3">
            {[InstagramMark, PinterestMark, FacebookMark, YouTubeMark].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center border hairline transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-ondeep/50">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.onClick}
                    className="link-luxe text-[14px] text-ondeep/75 transition-colors hover:text-ondeep"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[11px] tracking-[0.16em] uppercase text-ondeep/40 sm:px-8">
          <p>© {new Date().getFullYear()} Maison Fête Atelier. Every detail, by hand.</p>
          <p>Crafted with patience · Shipped with care</p>
        </div>
      </div>
    </footer>
  );
}
