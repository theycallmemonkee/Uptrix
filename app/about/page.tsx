import type { Metadata } from "next";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { ImmersiveAboutPage } from "@/components/about/immersive-about-page";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { getAboutPage, getGlobalSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Uptrix Technologies is a growth marketing company founded in 2024, built on 15+ years of combined team expertise across SEO, paid media and growth.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Uptrix Technologies",
    description:
      "Uptrix Technologies is a growth marketing company founded in 2024, built on 15+ years of combined team expertise across SEO, paid media and growth.",
    url: "https://uptrixtechnologies.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Uptrix Technologies",
    description:
      "Uptrix Technologies is a growth marketing company founded in 2024, built on 15+ years of combined team expertise across SEO, paid media and growth.",
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
      <EnterpriseFooter settings={globalSettings} />
    </div>
  );
}
