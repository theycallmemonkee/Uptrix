import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { FinalCta } from "@/components/services/final-cta";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceHero } from "@/components/services/service-hero";
import { TrustBar } from "@/components/services/trust-bar";
import { WhyChooseSection } from "@/components/services/why-choose-section";
import type { ServiceConfig } from "@/data/services";

type Props = {
  service: ServiceConfig;
};

export function ServicePageTemplate({ service }: Props) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1050px circle at 16% 12%, rgba(0,102,255,0.24), transparent 56%), radial-gradient(840px circle at 84% 16%, rgba(74,143,255,0.14), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <PremiumNavbar />

      <main className="relative z-10 flex flex-1 flex-col">
        <ServiceHero service={service} />
        <TrustBar />
        <WhyChooseSection service={service} />
        <ServiceFeatures features={service.featureCards} />
        <FinalCta title={service.finalCtaTitle} description={service.finalCtaDescription} />
        <EnterpriseFooter />
      </main>
    </div>
  );
}
