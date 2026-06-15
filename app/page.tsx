import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/cinematic-hero";
import { PremiumNavbar } from "@/components/premium-navbar";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay } from "@/components/ui/visual-effects";
import type { Metadata } from "next";

const TrustedCompanies = dynamic(() => import("@/components/trusted-companies").then(mod => mod.TrustedCompanies));
const ProblemRouter = dynamic(() => import("@/components/problem-router").then(mod => mod.ProblemRouter));
const AiServicesSection = dynamic(() => import("@/components/ai-services-section").then(mod => mod.AiServicesSection));
const FeaturedServices = dynamic(() => import("@/components/featured-services").then(mod => mod.FeaturedServices));
const EnterpriseExperienceSection = dynamic(() => import("@/components/enterprise-experience-section").then(mod => mod.EnterpriseExperienceSection));
const PortfolioPreview = dynamic(() => import("@/components/portfolio/portfolio-preview").then(mod => mod.PortfolioPreview));
const IndustriesStrip = dynamic(() => import("@/components/industries-strip").then(mod => mod.IndustriesStrip));
const PremiumFaqSection = dynamic(() => import("@/components/premium-faq-section").then(mod => mod.PremiumFaqSection));
const PortfolioCta = dynamic(() => import("@/components/portfolio/portfolio-cta").then(mod => mod.PortfolioCta));
const EnterpriseFooter = dynamic(() => import("@/components/enterprise-footer").then(mod => mod.EnterpriseFooter));

export const metadata: Metadata = {
  title: "Uptrix Technologies | AI Powered Growth Systems Partner",
  description:
    "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  openGraph: {
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description:
      "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
    type: "website",
    url: "https://uptrixtechnologies.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description:
      "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  },
};

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
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
        <CinematicHero />

        {/* AI wave divider */}
        <AIWaveOverlay className="relative -mt-4 h-24 opacity-60" />

        <TrustedCompanies />
        <ProblemRouter />
        <AiServicesSection />
        <FeaturedServices />
        <EnterpriseExperienceSection />
        <PortfolioPreview />
        <IndustriesStrip />
        <PremiumFaqSection />
        <PortfolioCta />
        <EnterpriseFooter />
      </main>
    </div>
  );
}
