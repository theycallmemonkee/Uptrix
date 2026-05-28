import { AiServicesSection } from "@/components/ai-services-section";
import { CinematicHero } from "@/components/cinematic-hero";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { EnterpriseExperienceSection } from "@/components/enterprise-experience-section";
import { FeaturedServices } from "@/components/featured-services";
import { PremiumNavbar } from "@/components/premium-navbar";
import { PremiumFaqSection } from "@/components/premium-faq-section";
import { TrustedCompanies } from "@/components/trusted-companies";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay } from "@/components/ui/visual-effects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uptrix Technologies — AI-Powered Digital Marketing Agency",
  description:
    "India's leading AI-powered digital marketing agency. We build precision SEO, PPC automation, social media, and branding systems for enterprise-scale growth.",
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
        <AiServicesSection />
        <FeaturedServices />
        <EnterpriseExperienceSection />
        <PremiumFaqSection />
        <EnterpriseFooter />
      </main>
    </div>
  );
}
