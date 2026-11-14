import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ImagePlus, Loader2, Sparkles, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { cn } from "../utils/cn";

const EVENT_TYPES = ["Wedding", "Birthday", "Baby Shower", "Bridal Shower", "Anniversary", "Corporate Event", "Holiday Gathering", "Just Because"];
const NEEDS = ["Custom party favors", "Centerpieces & tablescapes", "Personalized gift boxes", "Jewelry & keepsakes", "Candles with custom labels", "Full celebration styling", "Something else entirely"];

interface FormState {
  name: string;
  email: string;
  eventType: string;
  eventDate: string;
  need: string;
  quantity: string;
  colors: string;
  details: string;
}

const blank: FormState = { name: "", email: "", eventType: "", eventDate: "", need: "", quantity: "", colors: "", details: "" };

export default function CustomOrderModal() {
  const { customOpen, setCustomOpen } = useStore();
  const [form, setForm] = useState<FormState>(blank);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!customOpen) {
      setTimeout(() => {
        setForm(blank);
        setErrors({});
        setFileName(null);
        setPreview(null);
        setPhase("form");
      }, 400);
    }
  }, [customOpen]);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "Please share your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "A valid email helps us reply";
    if (!form.eventType) e.eventType = "Select an event type";
    if (!form.need) e.need = "Tell us what you need made";
    if (form.quantity && (isNaN(+form.quantity) || +form.quantity < 1)) e.quantity = "Enter a number";
    if (form.details.trim().length < 10) e.details = "A sentence or two helps us dream";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setPhase("sending");
    setTimeout(() => setPhase("done"), 1600);
  };

  const onFile = (f: File | undefined) => {
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <AnimatePresence>
      {customOpen && (
        <motion.div
          className="fixed inset-0 z-[240] grid place-items-center overflow-y-auto bg-deep/70 p-4 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCustomOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-2xl bg-bg text-ink shadow-2xl"
            role="dialog"
            aria-label="Start a custom order"
          >
            <button
              aria-label="Close"
              onClick={() => setCustomOpen(false)}
              className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-sheer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {phase === "done" ? (
              <div className="flex flex-col items-center px-8 py-20 text-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 13 }}
                  className="grid place-items-center rounded-full bg-ink text-bg"
                  style={{ width: 72, height: 72 }}
                >
                  <Check size={30} strokeWidth={2} />
                </motion.span>
                <h3 className="mt-7 font-display text-4xl font-medium">Consider it begun.</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
                  Your request <span className="font-medium text-ink">CF-{Math.floor(1000 + Math.random() * 9000)}</span> is
                  in the atelier queue. A designer will reply to <span className="font-medium text-ink">{form.email}</span>{" "}
                  within one business day with sketches, pricing and a timeline.
                </p>
                <button
                  onClick={() => setCustomOpen(false)}
                  className="mt-9 bg-ink px-8 py-4 text-[11px] font-medium tracking-[0.22em] text-bg uppercase transition-colors hover:bg-accent"
                >
                  Back to the Boutique
                </button>
              </div>
            ) : (
              <div className="max-h-[88vh] overflow-y-auto">
                <div className="border-b border-line px-7 pt-9 pb-6 sm:px-10">
                  <p className="flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-accent">
                    <Sparkles size={13} /> Custom Commissions
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-[1.05] font-medium">Your vision. Beautifully made.</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mute">
                    Tell us about the day you're dreaming up. We reply with sketches and pricing within one business day —
                    no deposit required to begin.
                  </p>
                </div>

                <form onSubmit={submit} className="grid gap-5 px-7 py-8 sm:grid-cols-2 sm:px-10" noValidate>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Your name *</label>
                    <input className={cn("field", errors.name && "error")} placeholder="Amelia Laurent" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    {errors.name && <p className="mt-1 text-xs text-[#b4552d]">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Email *</label>
                    <input className={cn("field", errors.email && "error")} placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    {errors.email && <p className="mt-1 text-xs text-[#b4552d]">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Event type *</label>
                    <select className={cn("field", errors.eventType && "error")} value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
                      <option value="">Select…</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errors.eventType && <p className="mt-1 text-xs text-[#b4552d]">{errors.eventType}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Event date</label>
                    <input type="date" className="field" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">What can we make for you? *</label>
                    <select className={cn("field", errors.need && "error")} value={form.need} onChange={(e) => set("need", e.target.value)}>
                      <option value="">Select…</option>
                      {NEEDS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errors.need && <p className="mt-1 text-xs text-[#b4552d]">{errors.need}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Approx. quantity</label>
                    <input className={cn("field", errors.quantity && "error")} placeholder="e.g. 40" inputMode="numeric" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} />
                    {errors.quantity && <p className="mt-1 text-xs text-[#b4552d]">{errors.quantity}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Color preferences</label>
                    <input className="field" placeholder="Ivory, sage, brushed gold…" value={form.colors} onChange={(e) => set("colors", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-medium tracking-[0.18em] uppercase text-mute">Tell us about it *</label>
                    <textarea
                      rows={4}
                      className={cn("field resize-none", errors.details && "error")}
                      placeholder="The occasion, the mood, the guest of honor — anything that helps us dream with you."
                      value={form.details}
                      onChange={(e) => set("details", e.target.value)}
                    />
                    {errors.details && <p className="mt-1 text-xs text-[#b4552d]">{errors.details}</p>}
                  </div>

                  {/* upload */}
                  <div className="sm:col-span-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onFile(e.target.files?.[0])}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center gap-4 border border-dashed border-line px-5 py-4 text-left transition-colors hover:border-ink"
                    >
                      {preview ? (
                        <img src={preview} alt="Inspiration" className="h-14 w-14 object-cover" />
                      ) : (
                        <span className="grid h-14 w-14 place-items-center bg-sheer text-mute">
                          <ImagePlus size={20} strokeWidth={1.4} />
                        </span>
                      )}
                      <span>
                        <span className="block text-[13px] font-medium">
                          {fileName ? fileName : "Upload inspiration (optional)"}
                        </span>
                        <span className="block text-xs text-mute">
                          {fileName ? "Tap to replace — we love a good mood board" : "A photo, a palette, a Pinterest find — anything helps"}
                        </span>
                      </span>
                    </button>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={phase === "sending"}
                      className="flex h-13 w-full items-center justify-center gap-2.5 bg-ink text-[11px] font-medium tracking-[0.22em] text-bg uppercase transition-colors hover:bg-accent disabled:opacity-70"
                    >
                      {phase === "sending" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" /> Sending to the atelier…
                        </>
                      ) : (
                        <>
                          Submit Request <ArrowRight size={13} />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] tracking-wide text-mute">
                      No payment now — we design first, invoice only once you love it.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
