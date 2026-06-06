import { PremiumNavbar } from "@/components/premium-navbar";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { TrustedCompanies } from "@/components/trusted-companies";
import { PortfolioShowcase } from "@/components/portfolio/portfolio-showcase";
import { PortfolioCta } from "@/components/portfolio/portfolio-cta";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio — Uptrix Technologies",
  description:
    "Explore how Uptrix Technologies drives enterprise growth through technical AI SEO, high-efficiency Google Ads, scalable Meta creative campaigns, and automated marketing pipelines.",
};

export default function PortfolioPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      <PremiumNavbar />
      <PortfolioHero />
      <TrustedCompanies />
      <PortfolioShowcase />
      <PortfolioCta />
      <EnterpriseFooter />
    </div>
  );
}
