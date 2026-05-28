import { EnterpriseFooter } from "@/components/enterprise-footer";
import { ImmersiveAboutPage } from "@/components/about/immersive-about-page";
import { PremiumNavbar } from "@/components/premium-navbar";
import { ClientLogoStrip } from "@/components/ui/client-logo-strip";

export default function AboutPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      <PremiumNavbar />
      <ImmersiveAboutPage />
      <ClientLogoStrip title="Trusted by growth-focused teams worldwide" />
      <EnterpriseFooter />
    </div>
  );
}
