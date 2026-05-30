import type { Metadata } from "next";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { ServicesClient } from "@/components/services/ServicesClient";

export const metadata: Metadata = {
  title: "Services | Uptrix Technologies",
  description:
    "Explore Uptrix premium services in AI UGC video ads, business automation, SEO, social media, PPC, and branding for enterprise growth.",
};

export default function ServicesPage() {
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
        <section className="px-6 pt-[100px] pb-16 md:px-10 md:pt-[120px] md:pb-20 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
                Premium Service Portfolio
              </p>
              <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Build market-leading growth with AI creative ads and automation systems.
              </h1>
              <p className="mt-6 text-base leading-7 text-white/72 md:text-lg">
                Explore six enterprise-ready services designed to scale your pipeline, creative output, and operational efficiency with the Uptrix growth engine.
              </p>
            </div>
          </div>
        </section>

        <ServicesClient />
        <EnterpriseFooter />
      </main>
    </div>
  );
}
