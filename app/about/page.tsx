import type { Metadata } from "next";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { ImmersiveAboutPage } from "@/components/about/immersive-about-page";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";
import { getAboutPage, getGlobalSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Uptrix Technologies — India's most advanced AI marketing infrastructure company. 15+ years building growth systems for ambitious brands.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Uptrix Technologies",
    description: "Learn about Uptrix Technologies — India's most advanced AI marketing infrastructure company. 15+ years building growth systems for ambitious brands.",
    url: "https://uptrixtechnologies.com/about",
  },
};

export default async function AboutPage() {
  const [aboutData, globalSettings] = await Promise.all([
    getAboutPage(),
    getGlobalSettings(),
  ]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      <PremiumNavbar />
      <ImmersiveAboutPage data={aboutData} />
      <ClientLogoStrip title="Trusted by growth-focused teams worldwide" />
      <EnterpriseFooter settings={globalSettings} />
    </div>
  );
}
