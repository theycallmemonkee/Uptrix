import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/cinematic-hero";
import { TrustedCompanies } from "@/components/trusted-companies";
import { AiServicesSection } from "@/components/ai-services-section";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import type { Metadata } from "next";
import { getHomePage, getGlobalSettings, getGlobalFaqs } from "@/lib/sanity";

// ── Decorative background effects — purely visual, no LCP impact
// ssr:false keeps them out of the server HTML entirely (smaller initial payload)
const FloatingOrbs = dynamic(
  () => import("@/components/ui/visual-effects").then((m) => m.FloatingOrbs),
  { ssr: false }
);
const AnimatedGrid = dynamic(
  () => import("@/components/ui/visual-effects").then((m) => m.AnimatedGrid),
  { ssr: false }
);
const AIWaveOverlay = dynamic(
  () => import("@/components/ui/visual-effects").then((m) => m.AIWaveOverlay),
  { ssr: false }
);

// ── Below-fold content — code-split into separate JS chunks
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

      {/* Decorative animated layers — lazy-loaded, non-blocking */}
      <AnimatedGrid opacity={0.38} gridSize={72} />
      <FloatingOrbs />

      <PremiumNavbar />

      <main id="main-content" className="relative z-10 flex flex-1 flex-col">
        {/* 1. Hero — static import: above-fold, must hydrate first */}
        <CinematicHero data={homeData} />

        <AIWaveOverlay className="relative -mt-4 h-24 opacity-60" />

        {/* 2. Logo Bar — static import: above-fold trust signal */}
        <TrustedCompanies />

        {/* 3. What We Do — static import: first scroll section */}
        <AiServicesSection data={homeData} />

        {/* 4–11. Below fold — dynamic imports */}
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
