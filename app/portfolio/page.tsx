import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioLogoStrip } from "@/components/portfolio/portfolio-logo-strip";
import { PortfolioShowcase } from "@/components/portfolio/portfolio-showcase";
import { PortfolioCta } from "@/components/portfolio/portfolio-cta";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { GraphicDesignShowcase } from "@/components/portfolio/graphic-design-showcase";
import { ReelShowcase } from "@/components/portfolio/reel-showcase";
import { PremiumFaqSection } from "@/components/premium-faq-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio — Uptrix Technologies",
  description:
    "Explore how Uptrix Technologies drives enterprise growth through technical AI SEO, high-efficiency Google Ads, scalable Meta creative campaigns, and automated marketing pipelines.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Case Studies & Portfolio — Uptrix Technologies",
    description: "Explore how Uptrix Technologies drives enterprise growth through technical AI SEO, high-efficiency Google Ads, scalable Meta creative campaigns, and automated marketing pipelines.",
    url: "https://uptrixtechnologies.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-white">
      <CursorGlow />
      <PremiumNavbar />

      {/* 1. Hero */}
      <PortfolioHero />

      {/* Logo strip — social proof between hero and work */}
      <PortfolioLogoStrip />

      {/* 2. Categories + 3. Case Studies */}
      <PortfolioShowcase />

      {/* 4. Graphic Design Showcase */}
      <GraphicDesignShowcase />

      {/* 5. Instagram Reel Edits */}
      <ReelShowcase />

      {/* 6. Final CTA */}
      <PortfolioCta />

      {/* 7. FAQ */}
      <PremiumFaqSection className="pt-[120px] pb-[80px]" />

      {/* 8. Footer */}
      <EnterpriseFooter />
    </div>
  );
}
