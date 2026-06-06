import { PremiumNavbar } from "@/components/premium-navbar";
import { WebsiteShowcase } from "@/components/portfolio/website-showcase";
import { PortfolioCta } from "@/components/portfolio/portfolio-cta";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { FloatingOrbs, AnimatedGrid } from "@/components/ui/visual-effects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Portfolio — Uptrix Technologies",
  description:
    "Explore our premium website development portfolio. We engineer enterprise-grade storefronts, SaaS landing pages, and creative portals that grow businesses.",
};

export default function WebsitesPortfolioPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      {/* Background System */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1150px circle at 18% 14%, rgba(0,102,255,0.22), transparent 56%), radial-gradient(880px circle at 86% 18%, rgba(74,143,255,0.12), transparent 60%), linear-gradient(180deg, #061124 0%, #081730 55%, #050E1F 100%)",
        }}
      />
      <AnimatedGrid opacity={0.25} gridSize={64} />
      <FloatingOrbs />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col pt-32 md:pt-40">
        {/* Premium Intro / Hero Section */}
        <section className="px-6 py-12 text-center md:px-10">
          <div className="mx-auto max-w-4xl">
            {/* Category Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8DB8FF]/30 bg-[#78A8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-[#DCEBFF] uppercase">
              Website Showcase
            </div>

            {/* Core Hero Copy */}
            <h1 className="font-heading text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              WEBSITES THAT DON'T <br />
              <span className="bg-gradient-to-r from-[#70A8FF] via-[#0066FF] to-[#8DB8FF] bg-clip-text text-transparent">
                JUST LOOK GOOD.
              </span>
              <br />
              THEY GROW BUSINESSES.
            </h1>

            {/* Supporting Copy */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Explore our record of high-performance engineering. We translate complex product narratives 
              into high-converting digital interfaces, enterprise-grade e-commerce pipelines, and fast 
              SaaS architectures designed to command attention and scale organic growth.
            </p>
          </div>
        </section>

        {/* Website Showcase Component */}
        <WebsiteShowcase />

        {/* Call to Action */}
        <PortfolioCta />

        {/* Enterprise Footer */}
        <EnterpriseFooter />
      </main>
    </div>
  );
}
