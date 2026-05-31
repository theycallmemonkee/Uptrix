import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "AI SEO Services | Uptrix Technologies",
  description: "Premium AI SEO systems for enterprise-grade rankings, leads, and long-term growth.",
};

export default function SeoServicePage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG.seo} />;
}
