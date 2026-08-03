import dynamic from "next/dynamic";
import { CinematicHero } from "@/components/cinematic-hero";
import { TrustedCompanies } from "@/components/trusted-companies";
import { AiServicesSection } from "@/components/ai-services-section";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { FloatingOrbs, AnimatedGrid, AIWaveOverlay } from "@/components/ui/visual-effects";
import type { Metadata } from "next";
import { getHomePage, getGlobalSettings, getGlobalFaqs } from "@/lib/sanity";

const Uptrix5SSection      = dynamic(() => import("@/components/uptrix-5s-section").then(m => m.Uptrix5SSection));
const SevenSolutionsSection = dynamic(() => import("@/components/seven-solutions-section").then(m => m.SevenSolutionsSection));
const CaseStudiesSection   = dynamic(() => import("@/components/case-studies-section").then(m => m.CaseStudiesSection));
const CtaBandSection       = dynamic(() => import("@/components/cta-band-section").then(m => m.CtaBandSection));
const TestimonialsSection  = dynamic(() => import("@/components/testimonials-section").then(m => m.TestimonialsSection));
const ArticlesSection      = dynamic(() => import("@/components/articles-section").then(m => m.ArticlesSection));
const PremiumFaqSection    = dynamic(() => import("@/components/premium-faq-section").then(m => m.PremiumFaqSection));
const ContactSection       = dynamic(() => import("@/components/contact-section").then(m => m.ContactSection));
const EnterpriseFooter     = dynamic(() => import("@/components/enterprise-footer").then(m => m.EnterpriseFooter));

export const metadata: Metadata = {
  title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
  description:
    "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
    description:
      "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
    type: "website",
    url: "https://uptrixtechnologies.com",
    images: [{ url: "/Uptrix.png", width: 1200, height: 630, alt: "Uptrix Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrix Technologies | Growth Marketing Partner for Startups, Scaleups & SMEs",
    description:
      "Uptrix is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale. No juggling five vendors.",
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
      {/* Layered background */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1150px circle at 18% 14%, rgba(0,102,255,0.23), transparent 56%), radial-gradient(880px circle at 86% 18%, rgba(74,143,255,0.13), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />
      <AnimatedGrid opacity={0.38} gridSize={72} />
      <FloatingOrbs />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* 1. Hero */}
        <CinematicHero data={homeData} />

        <AIWaveOverlay className="relative -mt-4 h-24 opacity-60" />

        {/* 2. Logo Bar */}
        <TrustedCompanies />

        {/* 3. What We Do */}
        <AiServicesSection data={homeData} />

        {/* 4. Uptrix 5S Framework */}
        <Uptrix5SSection />

        {/* 5. Seven Solutions */}
        <SevenSolutionsSection />

        {/* 6. Case Studies */}
        <CaseStudiesSection />

        {/* 7. CTA Band */}
        <CtaBandSection />

        {/* 8. Testimonials */}
        <TestimonialsSection />

        {/* 9. Articles */}
        <ArticlesSection />

        {/* 10. FAQ */}
        <PremiumFaqSection faqs={faqs} settings={globalSettings} />

        {/* 11. Contact */}
        <ContactSection />

        {/* Footer */}
        <EnterpriseFooter settings={globalSettings} />
      </main>
    </div>
  );
}
