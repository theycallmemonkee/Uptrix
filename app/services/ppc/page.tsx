import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "PPC Services | Uptrix Technologies",
  description: "Performance media systems that maximize ROAS and reduce ad waste across top channels.",
};

export default function PpcServicePage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG.ppc} />;
}
