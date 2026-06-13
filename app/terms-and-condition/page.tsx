import type { Metadata } from "next";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Uptrix Technologies",
  description: "Read the Terms & Conditions of Uptrix Technologies digital marketing and AI automation services.",
};

export default function TermsAndConditionPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
      {/* Background radial glows */}
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
        <section className="px-6 pt-[124px] pb-16 md:px-10 md:pt-[140px] md:pb-24">
          <div className="mx-auto max-w-4xl">
            <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
              Legal Information
            </p>
            <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-xs text-white/50">Last Updated: June 13, 2026</p>

            <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-white/70">
              <p>
                Welcome to Uptrix Technologies. These terms and conditions outline the rules and regulations for the use of Uptrix Technologies Website and Services.
              </p>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">1. Agreement to Terms</h2>
                <p>
                  By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Uptrix Technologies Website or Service if you do not agree to all of the terms and conditions stated on this page.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">2. Scope of Services</h2>
                <p>
                  Uptrix Technologies provides digital marketing, search engine optimization (AI SEO), media buying, paid advertising campaigns, conversion rate systems, and AI automation consulting. Detail specifications, delivery milestones, and KPIs are defined in individual Service Level Agreements (SLAs).
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">3. Intellectual Property</h2>
                <p>
                  Unless otherwise stated, Uptrix Technologies and/or its licensors own the intellectual property rights for all material on Uptrix Technologies. All intellectual property rights are reserved. You may view and/or print pages from website for your own personal use subject to restrictions set in these terms and conditions.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">4. Limitation of Liability</h2>
                <p>
                  In no event shall Uptrix Technologies, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this Website or our Services, whether such liability is under contract, tort, or otherwise.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">5. Governing Law</h2>
                <p>
                  These Terms will be governed by and construed in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <EnterpriseFooter />
      </main>
    </div>
  );
}
