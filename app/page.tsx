import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/cinematic-hero";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay } from "@/components/ui/visual-effects";
import type { Metadata } from "next";
import { getHomePage, getGlobalSettings, getGlobalFaqs } from "@/lib/sanity";

const TrustedCompanies = dynamic(() => import("@/components/trusted-companies").then(mod => mod.TrustedCompanies));
const AiServicesSection = dynamic(() => import("@/components/ai-services-section").then(mod => mod.AiServicesSection));
const PortfolioPreview = dynamic(() => import("@/components/portfolio/portfolio-preview").then(mod => mod.PortfolioPreview));
const FeaturedServices = dynamic(() => import("@/components/featured-services").then(mod => mod.FeaturedServices));
const IndustriesStrip = dynamic(() => import("@/components/industries-strip").then(mod => mod.IndustriesStrip));
const PremiumFaqSection = dynamic(() => import("@/components/premium-faq-section").then(mod => mod.PremiumFaqSection));
const PortfolioCta = dynamic(() => import("@/components/portfolio/portfolio-cta").then(mod => mod.PortfolioCta));
const EnterpriseFooter = dynamic(() => import("@/components/enterprise-footer").then(mod => mod.EnterpriseFooter));

export const metadata: Metadata = {
  title: "Uptrix Technologies | AI Powered Growth Systems Partner",
  description:
    "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description:
      "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
    type: "website",
    url: "https://uptrixtechnologies.com",
    images: [{ url: "/Uptrix.png", width: 1200, height: 630, alt: "Uptrix Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description:
      "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
    images: ["/Uptrix.png"],
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
      {/* ── Layered background system ───────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1150px circle at 18% 14%, rgba(0,102,255,0.23), transparent 56%), radial-gradient(880px circle at 86% 18%, rgba(74,143,255,0.13), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />
      {/* Animated dot grid */}
      <AnimatedGrid opacity={0.38} gridSize={72} />
      {/* Floating ambient orbs */}
      <FloatingOrbs />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* 1. Hero */}
        <CinematicHero data={homeData} />

        {/* AI wave divider */}
        <AIWaveOverlay className="relative -mt-4 h-24 opacity-60" />

        {/* 2. Stats Strip + Logo Strip */}
        <TrustedCompanies />

        {/* 3. We Build Growth Systems, Not Marketing Campaigns */}
        <AiServicesSection data={homeData} />

        {/* 4. Six Systems. One Complete Growth Engine. */}
        <FeaturedServices />

        {/* 5. Real Results From Real Work */}
        <PortfolioPreview />

        {/* 7. Industries */}
        <IndustriesStrip data={homeData} />

        {/* 8. FAQ */}
        <PremiumFaqSection faqs={faqs} settings={globalSettings} />

        {/* 9. Final CTA */}
        <PortfolioCta />

        {/* 10. Footer */}
        <EnterpriseFooter settings={globalSettings} />
      </main>
    </div>
  );
}
