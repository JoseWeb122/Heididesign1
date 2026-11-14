import { useState } from "react";
import { ArrowRight, AtSign, BadgeCheck } from "lucide-react";
import { GALLERY, px } from "../../data/store";
import { FxImg, Reveal, SectionHead } from "../../components/ui";

/* ————— social gallery ————— */
export function Gallery() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow="@maisonfete"
        title={<>Celebrations, <em className="text-accent">in the wild</em>.</>}
        copy="Tables, mantels and moments styled with our pieces — shared with love by the Fête community."
      />

      <div className="mt-14 columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
        {GALLERY.map((g, i) => (
          <Reveal key={g.img} delay={(i % 4) * 0.06} className="group relative block break-inside-avoid overflow-hidden">
            <FxImg
              src={px(g.img, 640, [800, 1000, 640, 900][i % 4])}
              alt={g.caption}
              className="w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-deep/0 p-4 opacity-0 transition-all duration-500 group-hover:bg-deep/45 group-hover:opacity-100">
              <span className="grid h-9 w-9 place-items-center self-end rounded-full bg-surface/90 text-ink backdrop-blur">
                <AtSign size={15} strokeWidth={1.6} />
              </span>
              <p className="translate-y-2 text-[12.5px] font-medium text-ondeep transition-transform duration-500 group-hover:translate-y-0">
                {g.caption}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ————— VIP newsletter ————— */
export function VipNewsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "sending" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    setTimeout(() => setState("done"), 1100);
  };

  return (
    <section className="relative overflow-hidden bg-deep text-ondeep">
      {/* soft glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-96 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.4em] uppercase text-gold">The Fête List</p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-6xl">
            Be First to See <em className="text-gold">What's New.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ondeep/65">
            Get new collection announcements, celebration inspiration, special offers, and custom-order updates — a
            short, lovely letter, twice a month at most.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {state === "done" ? (
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 border border-ondeep/20 bg-ondeep/5 px-6 py-5 backdrop-blur">
              <BadgeCheck size={19} className="text-gold" />
              <p className="text-sm text-ondeep/85">
                Welcome to the list — something beautiful is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-10 max-w-md">
              <div className="flex border border-ondeep/25 bg-ondeep/5 backdrop-blur transition-colors focus-within:border-gold/70">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setState("idle");
                  }}
                  placeholder="Your loveliest inbox"
                  aria-label="Email address"
                  className="h-14 w-full bg-transparent px-5 text-sm text-ondeep outline-none placeholder:text-ondeep/40"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="flex h-14 shrink-0 items-center gap-2 bg-ondeep px-6 text-[11px] font-medium tracking-[0.2em] uppercase text-deep transition-colors hover:bg-gold disabled:opacity-70"
                >
                  {state === "sending" ? "Joining…" : "Join the List"} <ArrowRight size={13} />
                </button>
              </div>
              {state === "error" && (
                <p className="mt-3 text-xs tracking-wide text-[#d08f6e]">That email needs one more glance.</p>
              )}
              <p className="mt-4 text-[11px] tracking-wide text-ondeep/45">
                No noise, no pressure — unsubscribe with one tap, always.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
