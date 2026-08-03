"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState, FormEvent, useMemo } from "react";
import { contactSubmissionSchema } from "@/lib/contact/schema";
import { InvisibleTurnstile } from "@/components/ui/turnstile";

const EASE = [0.22, 1, 0.36, 1] as const;

const BUDGET_OPTIONS = [
  "Under £2,000/mo",
  "£2,000 to £5,000/mo",
  "£5,000 to £10,000/mo",
  "£10,000+/mo",
];

const NEXT_STEPS = [
  "We review your submission and research your market before we reply.",
  "You get a response within one business day, not a generic pitch.",
  "If there is a fit, we book a 30-minute call to map out the first 30 days.",
];

type FormState = {
  name: string;
  email: string;
  website: string;
  budget: string;
  message: string;
  honey: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.25 });
  const turnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    website: "",
    budget: "",
    message: "",
    honey: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const canSubmit = useMemo(
    () =>
      submitStatus !== "submitting" &&
      submitStatus !== "success" &&
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.message.trim().length > 0,
    [form, submitStatus],
  );

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    const parsed = contactSubmissionSchema.safeParse({
      name: form.name,
      email: form.email,
      website: form.website,
      budget: form.budget,
      message: form.message,
      honey: form.honey,
      source_page: "home",
      turnstileToken,
    });

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        turnstileRef.current?.reset();
      }
    } catch {
      setSubmitStatus("error");
      turnstileRef.current?.reset();
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 font-heading text-sm text-white placeholder:text-white/30 transition-all duration-200 outline-none focus:border-[#79ABFF]/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-[#79ABFF]/20";

  return (
    <section
      id="contact"
      className="relative z-10 w-full overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.1),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headingRef} className="mx-auto max-w-xl text-center">
          <motion.p
            className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Let&rsquo;s talk growth
          </motion.p>

          <motion.h2
            className="mt-4 font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            <span className="text-white">TELL US WHERE</span>
            <br />
            <span className="text-[#79ABFF]">GROWTH IS STUCK</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-[1.75] text-white/58"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Fill in the form and we will come back within one business day with an honest read on where growth is stuck and how we would approach it.
          </motion.p>
        </div>

        {/* Two-col: next steps + form */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 xl:gap-20">
          {/* Next steps */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="font-heading text-xs font-semibold tracking-[0.18em] text-[#9BC2FF] uppercase">
              What happens next
            </p>

            <ol className="mt-6 space-y-5">
              {NEXT_STEPS.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#79ABFF]/30 bg-[#79ABFF]/10 font-heading text-xs font-bold text-[#79ABFF]">
                    {i + 1}
                  </span>
                  <p className="text-[0.875rem] leading-[1.75] text-white/65">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[0.8125rem] leading-[1.7] text-white/50">
                No commitment. No pitch. Just clarity on where growth is stuck.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {["No long contracts", "Honest first read", "Response in 1 business day"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[11px] text-white/45">
                    <CheckCircle2 size={13} className="text-[#70A8FF]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center">
                <CheckCircle2 size={40} className="text-emerald-400" />
                <h3 className="mt-4 font-heading text-xl font-semibold text-white">Submission received</h3>
                <p className="mt-2 max-w-xs text-sm text-white/55">
                  We will come back within one business day with an honest read on where your growth is stuck.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="honey"
                  value={form.honey}
                  onChange={set("honey")}
                  className="hidden"
                  aria-hidden
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block font-heading text-xs font-semibold text-white/60 uppercase tracking-[0.1em]"
                    >
                      Name <span className="text-[#79ABFF]" aria-label="required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set("name")}
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1 text-[11px] text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Business email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block font-heading text-xs font-semibold text-white/60 uppercase tracking-[0.1em]"
                    >
                      Business email <span className="text-[#79ABFF]" aria-label="required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={set("email")}
                      required
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1 text-[11px] text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label
                      htmlFor="contact-website"
                      className="mb-1.5 block font-heading text-xs font-semibold text-white/60 uppercase tracking-[0.1em]"
                    >
                      Website
                    </label>
                    <input
                      id="contact-website"
                      type="url"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={form.website}
                      onChange={set("website")}
                      autoComplete="url"
                      className={inputClass}
                    />
                  </div>

                  {/* Budget range */}
                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="mb-1.5 block font-heading text-xs font-semibold text-white/60 uppercase tracking-[0.1em]"
                    >
                      Monthly budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={set("budget")}
                      aria-label="Monthly budget range"
                      className={`${inputClass} cursor-pointer appearance-none`}
                    >
                      <option value="" className="bg-[#0B1F3A]">Select a range</option>
                      {BUDGET_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0B1F3A]">{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Challenge */}
                <div className="mt-4">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-heading text-xs font-semibold text-white/60 uppercase tracking-[0.1em]"
                  >
                    Your biggest challenge right now <span className="text-[#79ABFF]" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us where growth is stuck. The more specific, the more useful our first reply will be."
                    value={form.message}
                    onChange={set("message")}
                    required
                    aria-required="true"
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1 text-[11px] text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Turnstile */}
                <InvisibleTurnstile
                  onVerify={setTurnstileToken}
                  widgetRef={turnstileRef}
                />

                {/* Submit */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="shine-sweep group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4D8EFF] bg-gradient-to-r from-[#0066FF] to-[#1552B6] px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,102,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(0,102,255,0.42)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Book a Growth Consultation
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  {submitStatus === "error" && (
                    <p className="mt-3 text-center text-[11px] text-red-400">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
