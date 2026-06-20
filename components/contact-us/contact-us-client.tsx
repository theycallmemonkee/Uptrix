"use client";

import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { MarqueeLogos } from "@/components/ui/client-logo-strip";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/visual-effects";
import { contactSubmissionSchema } from "@/lib/contact/schema";
import { AnimatePresence, motion } from "framer-motion";
import { InvisibleTurnstile } from "@/components/ui/turnstile";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  X,
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
import type { SanityContactPage, SanityGlobalSettings } from "@/lib/sanity";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_LINEAR = [0, 0, 1, 1] as const;

type FormState = { name: string; email: string; message: string; honey: string };
type ToastState = { type: "success" | "error"; message: string } | null;

export interface ContactUsClientProps {
  contactData?: SanityContactPage | null
  globalSettings?: SanityGlobalSettings | null
}

export function ContactUsClient({ contactData, globalSettings }: ContactUsClientProps = {}) {
  const badge = contactData?.badge ?? "Contact Uptrix";
  const headline = contactData?.headline ?? "Let's Talk Growth";
  const subBody = contactData?.body ?? "Share your goals and our team will respond with a tailored strategy within 24 hours.";
  const contactEmail = contactData?.email ?? globalSettings?.email ?? "connect@uptrixtechnologies.com";
  const contactPhone = contactData?.phone ?? globalSettings?.phone ?? "+91 87961 60561";
  const responseTime = contactData?.responseTime ?? "Within 24 business hours";
  const successModalTitle = contactData?.formSuccessTitle ?? "✓ Request Submitted Successfully";
  const successModalBody = contactData?.formSuccessBody ?? "Thank you! Our team has received your request.\nWe will get back to you within 24 hours.";
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const turnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", honey: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [toast, setToast] = useState<ToastState>(null);
  const [successPulse, setSuccessPulse] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const canSubmit = useMemo(
    () =>
      !isSubmitting &&
      submitStatus !== "success" &&
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.message.trim().length > 0,
    [form, isSubmitting, submitStatus],
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

  // ESC key handler for success modal
  useEffect(() => {
    if (!showSuccessModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseSuccessModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSuccessModal]);

  // Focus management for success modal
  useEffect(() => {
    if (showSuccessModal) {
      lastActiveElementRef.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    }
  }, [showSuccessModal]);

  // Auto-close success modal after 4.5 seconds
  useEffect(() => {
    if (!showSuccessModal) return;
    const timer = setTimeout(() => {
      handleCloseSuccessModal();
    }, 4500);
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmitStatus("idle");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(null);

    // Debug log formData
    console.log("formData", form);

    const parsed = contactSubmissionSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors = parsed.error.flatten().fieldErrors;
      setErrors({ name: nextErrors.name?.[0], email: nextErrors.email?.[0], message: nextErrors.message?.[0] });
      setToast({ type: "error", message: "We couldn't submit your request. Please try again." });
      setSubmitStatus("idle");
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("submitting");

    try {
      const apiUrl =
        typeof window !== "undefined" ? `${window.location.origin}/api/contact` : "/api/contact";

      console.info("[contact/form] Before fetch", {
        apiUrl,
        origin: typeof window !== "undefined" ? window.location.origin : "ssr",
        pathname: typeof window !== "undefined" ? window.location.pathname : "ssr",
        method: "POST",
        body: parsed.data,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, turnstileToken }),
      });

      let payload: {
        ok?: boolean;
        error?: string;
        code?: string;
        fieldErrors?: Record<string, string[]>;
        missingEnv?: string[];
        resend?: { name?: string; message?: string; statusCode?: number };
        warning?: string;
      } = {};

      const raw = await response.text();
      try {
        payload = raw ? (JSON.parse(raw) as typeof payload) : {};
        // Debug log apiResponse
        console.log("apiResponse", payload);
      } catch {
        console.error("[contact/form] Non-JSON API response", { status: response.status, raw });
        setToast({
          type: "error",
          message: "We couldn't submit your request. Please try again.",
        });
        setSubmitStatus("idle");
        turnstileRef.current?.reset();
        turnstileRef.current?.execute();
        return;
      }

      console.info("[contact/form] After fetch", {
        apiUrl,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        raw,
        payload,
      });

      if (!response.ok || payload.ok === false) {
        setErrors({
          name: payload.fieldErrors?.name?.[0],
          email: payload.fieldErrors?.email?.[0],
          message: payload.fieldErrors?.message?.[0],
        });
        setToast({
          type: "error",
          message: "We couldn't submit your request. Please try again.",
        });
        setSubmitStatus("idle");
        turnstileRef.current?.reset();
        turnstileRef.current?.execute();
        return;
      }

      setForm({ name: "", email: "", message: "", honey: "" });
      setSubmitStatus("success");
      setShowSuccessModal(true);
      setSuccessPulse(true);
      setTimeout(() => setSuccessPulse(false), 1800);
      turnstileRef.current?.reset();
      turnstileRef.current?.execute();
    } catch (submitError) {
      console.error("[contact/form] Submit failed", submitError);
      // Debug log serverError
      console.log("serverError", submitError);
      setToast({
        type: "error",
        message: "We couldn't submit your request. Please try again.",
      });
      setSubmitStatus("idle");
      turnstileRef.current?.reset();
      turnstileRef.current?.execute();
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
            initial={{ opacity: 0, y: 22, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-xs tracking-[0.2em] text-[#DCEBFF] uppercase backdrop-blur-sm">
              <Sparkles size={13} className="text-[#79ABFF]" />
              {badge}
            </div>
            <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.025em]">
              <motion.span
                className="inline-block bg-gradient-to-r from-[#E6F1FF] via-[#70A8FF] to-[#E6F1FF] bg-[length:200%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: EASE_LINEAR }}
              >
                {headline}
              </motion.span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[0.9375rem] text-white/65 leading-[1.8]">
              {subBody}
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — Contact info */}
            <motion.div
              className="flex flex-col gap-5"
              initial={{ opacity: 0, x: -24, scale: 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.1, ease: EASE }}
            >
              {[
                { icon: Mail,    label: "Email Us",     value: contactEmail, href: `mailto:${contactEmail}` },
                { icon: Phone,   label: "Call Us",      value: contactPhone, href: `tel:${contactPhone.replace(/\s+/g, "")}` },
                { icon: MessageSquare, label: "Response Time", value: responseTime, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#79ABFF]/28"
                  whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
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

            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.72, delay: 0.15, ease: EASE }}
              className={`relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.05] p-6 shadow-[0_30px_80px_rgba(1,8,20,0.56)] backdrop-blur-xl md:p-8 transition-all duration-500 ${successPulse ? "ring-2 ring-[#0066FF]/40 shadow-[0_0_60px_rgba(0,102,255,0.25)]" : ""}`}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                animate={{ opacity: [0.1, 0.28, 0.1] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: EASE }}
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

                <InvisibleTurnstile onVerify={setTurnstileToken} widgetRef={turnstileRef} />

                <motion.button
                  type="submit"
                  disabled={!canSubmit || submitStatus === "success"}
                  whileHover={canSubmit && submitStatus !== "success" ? { y: -2, scale: 1.01 } : undefined}
                  whileTap={canSubmit && submitStatus !== "success" ? { scale: 0.98 } : undefined}
                  className={`shine-sweep group inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-5 py-4 font-heading text-sm font-semibold transition-all duration-300 ${
                    canSubmit && submitStatus !== "success"
                      ? "border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] text-white shadow-[0_14px_34px_rgba(0,102,255,0.35)] hover:shadow-[0_18px_44px_rgba(0,102,255,0.48)]"
                      : "cursor-not-allowed border-white/12 bg-white/[0.06] text-white/42"
                  }`}
                >
                  {submitStatus === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      Submitted ✓
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

      <MarqueeLogos title="Trusted by ambitious brands globally" className="pt-10 pb-4" />
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

      {/* Success Viewport Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Soft backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccessModal}
              className="fixed inset-0 bg-[#020813]/85 backdrop-blur-md z-0"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-modal-title"
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/14 bg-[linear-gradient(155deg,#0a1c3b,#050d1f)] p-8 shadow-2xl backdrop-blur-2xl z-10 text-center"
            >
              {/* Close Button top-right */}
              <button
                onClick={handleCloseSuccessModal}
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer"
                aria-label="Close success message"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
                  <CheckCircle2 size={26} />
                </div>
                
                <h3 id="success-modal-title" className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                  {successModalTitle}
                </h3>

                <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-6">
                  {successModalBody.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < successModalBody.split("\n").length - 1 && <br />}</span>
                  ))}
                </p>

                <button
                  ref={closeButtonRef}
                  onClick={handleCloseSuccessModal}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] text-white px-5 py-3 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
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
