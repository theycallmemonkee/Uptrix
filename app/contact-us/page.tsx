"use client";

import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { MarqueeLogos } from "@/components/ui/client-logo-strip";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/visual-effects";
import { contactSubmissionSchema } from "@/lib/contact/schema";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  XCircle,
} from "lucide-react";
import {
  FormEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormState = { name: string; email: string; message: string; honey: string };
type ToastState = { type: "success" | "error"; message: string } | null;

export default function ContactUsPage() {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", honey: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [toast, setToast] = useState<ToastState>(null);
  const [successPulse, setSuccessPulse] = useState(false);

  const canSubmit = useMemo(
    () =>
      !isSubmitting &&
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.message.trim().length > 0,
    [form, isSubmitting],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    firstInputRef.current?.focus({ preventScroll: true });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(null);

    const parsed = contactSubmissionSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors = parsed.error.flatten().fieldErrors;
      setErrors({ name: nextErrors.name?.[0], email: nextErrors.email?.[0], message: nextErrors.message?.[0] });
      setToast({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (!response.ok) {
        setErrors({
          name: payload.fieldErrors?.name?.[0],
          email: payload.fieldErrors?.email?.[0],
          message: payload.fieldErrors?.message?.[0],
        });
        setToast({ type: "error", message: payload.error ?? "Failed to send. Please try again." });
        return;
      }

      setForm({ name: "", email: "", message: "", honey: "" });
      setToast({ type: "success", message: "Message sent! We'll get back to you shortly." });
      setSuccessPulse(true);
      setTimeout(() => setSuccessPulse(false), 1800);
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      <PremiumNavbar />

      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-40 bg-[linear-gradient(180deg,#0A1B35_0%,#061124_50%,#030915_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(1200px_circle_at_10%_12%,rgba(0,102,255,0.22),transparent_58%),radial-gradient(900px_circle_at_86%_16%,rgba(133,183,255,0.14),transparent_62%)]" />
      <AnimatedGrid opacity={0.24} gridSize={72} />
      <FloatingOrbs
        orbs={[
          { cx: "15%", cy: "30%", size: 400, color: "rgba(0,102,255,0.14)", duration: 9 },
          { cx: "85%", cy: "60%", size: 320, color: "rgba(100,160,255,0.12)", duration: 12, delay: 2 },
        ]}
      />

      <main className="relative z-10 px-6 pb-16 pt-36 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-xs tracking-[0.2em] text-[#DCEBFF] uppercase backdrop-blur-sm">
              <Sparkles size={13} className="text-[#79ABFF]" />
              Contact Uptrix
            </div>
            <h1 className="font-heading text-5xl font-semibold tracking-tight md:text-6xl">
              Let&apos;s Talk{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-[#E6F1FF] via-[#70A8FF] to-[#E6F1FF] bg-[length:200%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Growth
              </motion.span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/68 leading-7">
              Share your goals and our team will respond with a tailored strategy within 24 hours.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left — Contact info */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.1, ease: EASE }}
            >
              {[
                { icon: Mail,    label: "Email Us",     value: "connect@uptrixtechnologies.com", href: "mailto:connect@uptrixtechnologies.com" },
                { icon: Phone,   label: "Call Us",      value: "+91 87961 60561",                href: "tel:+918796160561" },
                { icon: MessageSquare, label: "Response Time", value: "Within 24 business hours", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#79ABFF]/28 hover:-translate-y-1"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.16),transparent_55%)]" />
                  <div className="relative flex items-center gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#79ABFF]/28 bg-[#0C2C57]/42 text-[#79ABFF]">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-[0.18em] text-[#A8C9FF]/70 uppercase">{label}</p>
                      {href ? (
                        <a href={href} className="mt-1 block text-sm font-medium text-white transition-colors hover:text-[#A8C9FF]">
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-white">{value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Decorative AI badge */}
              <motion.div
                className="relative mt-2 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-xl"
                animate={{ boxShadow: ["0 0 0 0 rgba(0,102,255,0)", "0 0 40px 8px rgba(0,102,255,0.12)", "0 0 0 0 rgba(0,102,255,0)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40"
                  animate={{ opacity: [0.22, 0.5, 0.22] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "linear-gradient(120deg, rgba(0,102,255,0.22), rgba(255,255,255,0.04), rgba(0,102,255,0.18))" }}
                />
                <p className="relative text-sm font-medium text-[#A8C9FF]/80 uppercase tracking-[0.16em] mb-2">AI-Powered Response</p>
                <p className="relative text-xs leading-6 text-white/62">
                  Every inquiry is analyzed by our AI strategy engine to craft a personalized growth plan before our team calls you.
                </p>
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.15, ease: EASE }}
              className={`relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.05] p-6 shadow-[0_30px_80px_rgba(1,8,20,0.56)] backdrop-blur-xl md:p-8 transition-all duration-500 ${successPulse ? "ring-2 ring-[#0066FF]/40 shadow-[0_0_60px_rgba(0,102,255,0.25)]" : ""}`}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                animate={{ opacity: [0.1, 0.28, 0.1] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(500px circle at 20% 10%, rgba(0,102,255,0.18), transparent 60%)" }}
              />

              <form className="relative space-y-5" onSubmit={handleSubmit} noValidate>
                <GlowFormField
                  label="Full Name"
                  name="name"
                  value={form.name}
                  error={errors.name}
                  disabled={isSubmitting}
                  inputRef={firstInputRef}
                  icon={<User size={15} />}
                  placeholder="Your full name"
                  onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                />
                <GlowFormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  disabled={isSubmitting}
                  icon={<Mail size={15} />}
                  placeholder="your@email.com"
                  onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                />
                <GlowFormField
                  label="Tell Us About Your Project"
                  name="message"
                  value={form.message}
                  error={errors.message}
                  disabled={isSubmitting}
                  icon={<MessageSquare size={15} />}
                  placeholder="Describe your goals, challenges, and timeline..."
                  multiline
                  onChange={(v) => setForm((p) => ({ ...p, message: v }))}
                />

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    id="honey"
                    name="honey"
                    value={form.honey}
                    onChange={(e) => setForm((p) => ({ ...p, honey: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={!canSubmit}
                  whileHover={canSubmit ? { y: -2, scale: 1.01 } : undefined}
                  whileTap={canSubmit ? { scale: 0.98 } : undefined}
                  className={`shine-sweep group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 py-4 font-heading text-sm font-semibold transition-all duration-300 ${
                    canSubmit
                      ? "border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] text-white shadow-[0_14px_34px_rgba(0,102,255,0.35)] hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)]"
                      : "cursor-not-allowed border-white/12 bg-white/[0.06] text-white/42"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <MarqueeLogos title="Trusted by ambitious brands globally" className="pt-4" />
      <EnterpriseFooter />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`fixed bottom-6 right-6 z-[9999] max-w-sm rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-2xl ${
              toast.type === "success"
                ? "border-emerald-400/35 bg-emerald-500/12 text-emerald-100"
                : "border-rose-400/35 bg-rose-500/12 text-rose-100"
            }`}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              {toast.type === "success" ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
              {toast.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Premium animated form field ─────────────────────────────────────── */
function GlowFormField({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  type = "text",
  multiline = false,
  inputRef,
  icon,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  disabled?: boolean;
  type?: "text" | "email";
  multiline?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const borderColor = error
    ? "rgba(251,113,133,0.7)"
    : focused
    ? "rgba(112,168,255,0.7)"
    : "rgba(255,255,255,0.12)";

  const glowShadow = focused && !error
    ? "0 0 0 3px rgba(0,102,255,0.12), 0 0 20px rgba(0,102,255,0.08)"
    : "none";

  const sharedStyle = `w-full rounded-xl border bg-[#071B36]/60 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm placeholder:text-white/32 transition-none`;

  return (
    <div>
      {/* Floating label */}
      <motion.label
        htmlFor={name}
        animate={{
          y: focused || hasValue ? -1 : 0,
          fontSize: focused || hasValue ? "11px" : "13px",
          color: focused ? "rgba(168,201,255,0.9)" : "rgba(255,255,255,0.72)",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2 flex items-center gap-2 font-medium"
      >
        {icon && <span className="text-[#79ABFF]/70">{icon}</span>}
        {label}
      </motion.label>

      <motion.div
        className="relative"
        animate={{ boxShadow: glowShadow }}
        transition={{ duration: 0.25 }}
        style={{ borderRadius: "0.75rem" }}
      >
        {multiline ? (
          <textarea
            id={name}
            name={name}
            rows={5}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            style={{ border: `1px solid ${borderColor}`, transition: "border-color 0.25s ease" }}
            className={`${sharedStyle} resize-none`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            ref={inputRef}
            style={{ border: `1px solid ${borderColor}`, transition: "border-color 0.25s ease" }}
            className={sharedStyle}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-1.5 text-xs text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
