import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/cinematic-hero";
import { TrustedCompanies } from "@/components/trusted-companies";
import { AiServicesSection } from "@/components/ai-services-section";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
// BackgroundEffects is a "use client" wrapper — owns the ssr:false dynamic imports
// (Turbopack requires ssr:false to live inside a Client Component)
import { BackgroundEffects } from "@/components/ui/background-effects";
// AIWaveOverlay: direct import is fine; visual-effects.tsx is already "use client"
import { AIWaveOverlay } from "@/components/ui/visual-effects";
import type { Metadata } from "next";
import { getHomePage, getGlobalSettings, getGlobalFaqs } from "@/lib/sanity";

// ── Below-fold content — code-split into separate JS chunks ──────────────────
const Uptrix5SSection      = dynamic(() => import("@/components/uptrix-5s-section").then((m) => m.Uptrix5SSection));
const SevenSolutionsSection = dynamic(() => import("@/components/seven-solutions-section").then((m) => m.SevenSolutionsSection));
const CaseStudiesSection   = dynamic(() => import("@/components/case-studies-section").then((m) => m.CaseStudiesSection));
const CtaBandSection       = dynamic(() => import("@/components/cta-band-section").then((m) => m.CtaBandSection));
const TestimonialsSection  = dynamic(() => import("@/components/testimonials-section").then((m) => m.TestimonialsSection));
const ArticlesSection      = dynamic(() => import("@/components/articles-section").then((m) => m.ArticlesSection));
const PremiumFaqSection    = dynamic(() => import("@/components/premium-faq-section").then((m) => m.PremiumFaqSection));
const ContactSection       = dynamic(() => import("@/components/contact-section").then((m) => m.ContactSection));
const EnterpriseFooter     = dynamic(() => import("@/components/enterprise-footer").then((m) => m.EnterpriseFooter));

export const metadata: Metadata = {
  title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
  description:
    "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
  alternates: { canonical: "https://uptrixtechnologies.com" },
  openGraph: {
    title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
    description:
      "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
    type: "website",
    url: "https://uptrixtechnologies.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Uptrix Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
    description:
      "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
    images: ["/og-image.png"],
  },
};

export default async function Home() {
  const [homeData, globalSettings, faqs] = await Promise.all([
    getHomePage(),
    getGlobalSettings(),
    getGlobalFaqs(),
  ]);

  return (
    <div className="relative isolate min-h-screen bg-[#0B1F3A] text-white" style={{ overflowX: "clip" }}>
      {/* Static gradient background — server-rendered, zero JS cost */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        aria-hidden
        style={{
          background:
            "radial-gradient(1150px circle at 18% 14%, rgba(0,102,255,0.23), transparent 56%), radial-gradient(880px circle at 86% 18%, rgba(74,143,255,0.13), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />

      {/* Decorative animated layers — client-only, non-blocking */}
      <BackgroundEffects gridOpacity={0.38} gridSize={72} />

      <PremiumNavbar />

      <main id="main-content" className="relative z-10 flex flex-1 flex-col">
        {/* 1. Hero */}
        <CinematicHero data={homeData} />

        {/* Wave separator — static import, "use client" boundary in source file */}
        <AIWaveOverlay className="relative -mt-4 h-24 opacity-60" />

        {/* 2. Logo Bar */}
        <TrustedCompanies />

        {/* 3. What We Do */}
        <AiServicesSection data={homeData} />

        {/* 4–11. Below fold */}
        <Uptrix5SSection />
        <SevenSolutionsSection />
        <CaseStudiesSection />
        <CtaBandSection />
        <TestimonialsSection />
        <ArticlesSection />
        <PremiumFaqSection faqs={faqs} settings={globalSettings} />
        <ContactSection />
        <EnterpriseFooter settings={globalSettings} />
      </main>
    </div>
  );
}
