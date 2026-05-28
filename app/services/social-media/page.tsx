import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "Social Media Services | Uptrix Technologies",
  description: "Premium social media strategies that compound brand attention into measurable business growth.",
};

export default function SocialMediaServicePage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG["social-media"]} />;
}
