"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { User, Mail, Building, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InvisibleTurnstile } from "@/components/ui/turnstile";

type Props = {
  post: {
    title: string;
    cover: string;
  };
};

export function BlogRightForm({ post }: Props) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", requirements: "" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<{ reset: () => void; execute: () => void } | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payloadBody = {
      name: formData.name,
      email: formData.email,
      message: `Company: ${formData.company}\n\nRequirements: ${formData.requirements}`,
      honey: "", // Anti-spam honeypot
      turnstileToken,
    };

    // Debug log formData
    console.log("formData", payloadBody);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      const resData = await response.json();
      
      // Debug log apiResponse
      console.log("apiResponse", resData);

      if (!response.ok) {
        throw new Error(resData.error || "Submission failed. Please try again.");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", company: "", requirements: "" });
      turnstileRef.current?.reset();
      turnstileRef.current?.execute();
    } catch (err: unknown) {
      // Debug log serverError
      console.log("serverError", err);
      setError(err instanceof Error ? err.message : "Failed to submit form. Please check your inputs.");
      turnstileRef.current?.reset();
      turnstileRef.current?.execute();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden w-full">
      {/* Featured Cover Image on top of form */}
      <div className="relative aspect-video w-full border-b border-gray-150">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="320px"
        />
      </div>

      <div className="p-6">
        <h3 className="font-heading text-lg font-bold text-[#111827] leading-snug">
          Need help implementing this?
        </h3>
        <p className="mt-2 text-xs text-[#6B7280] leading-relaxed">
          Talk to Uptrix experts about AI automation, growth systems and enterprise execution.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* Full Name */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-[#9CA3AF]">
              <User size={14} />
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-[#111827]"
            />
          </div>

          {/* Work Email */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-[#9CA3AF]">
              <Mail size={14} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Work Email"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-[#111827]"
            />
          </div>

          {/* Company Name */}
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 text-[#9CA3AF]">
              <Building size={14} />
            </span>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-[#111827]"
            />
          </div>

          {/* Requirements */}
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-[#9CA3AF]">
              <MessageSquare size={14} />
            </span>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="Requirements (briefly explain)..."
              required
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] pl-10 pr-4 py-2 text-sm outline-none transition-all duration-200 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 text-[#111827] resize-none"
            />
          </div>

          <InvisibleTurnstile onVerify={setTurnstileToken} widgetRef={turnstileRef} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0066FF] hover:bg-[#1552B6] active:scale-[0.98] text-white font-semibold text-sm py-3 transition-all duration-200 cursor-pointer shadow-sm disabled:bg-[#0066FF]/70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Book Strategy Call"
            )}
          </button>
        </form>

        {/* Status Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl bg-green-50 border border-green-150 p-3 text-xs text-green-800"
            >
              Strategy call requested! Our specialists will contact you shortly.
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl bg-red-50 border border-red-150 p-3 text-xs text-red-800"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
