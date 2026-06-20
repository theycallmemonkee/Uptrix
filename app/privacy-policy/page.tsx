import type { Metadata } from "next";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Uptrix Technologies",
  description: "Learn how Uptrix Technologies collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-xs text-white/50">Last Updated: June 13, 2026</p>

            <div className="mt-12 space-y-8 font-sans text-sm leading-relaxed text-white/70">
              <p>
                At Uptrix Technologies, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Uptrix Technologies and how we use it.
              </p>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">1. Information We Collect</h2>
                <p>
                  We collect several different types of information for various purposes to provide and improve our services to you, including:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personal Identification Information (Name, email address, phone number, company name).</li>
                  <li>Log Data & Cookies (IP address, browser type, referral URL, pages visited).</li>
                  <li>Inbound Marketing data and traffic analysis.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">2. How We Use Your Information</h2>
                <p>
                  Uptrix Technologies uses the collected data for various purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide and maintain our Service.</li>
                  <li>To notify you about changes to our Service.</li>
                  <li>To provide customer support and process inquiry submissions.</li>
                  <li>To monitor the usage of our Service.</li>
                  <li>To improve conversion rate optimization and AI workflows.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">3. Data Protection and Security</h2>
                <p>
                  The security of your data is important to us. We implement industry-standard encryption, SSL protocols, and access control policies to prevent unauthorized access, disclosure, modification, or destruction of your personal information.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-white">4. Contact Us</h2>
                <p>
                  If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at onboarding@uptrixtechnologies.com.
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
