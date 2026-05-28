import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "Branding Services | Uptrix Technologies",
  description: "Strategic branding systems that improve trust, recall, and long-term growth momentum.",
};

export default function BrandingServicePage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG.branding} />;
}
