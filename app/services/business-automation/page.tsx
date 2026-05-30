import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "Business Automation Solutions | Uptrix Technologies",
  description: "Build intelligent workflows that automate CRM, lead qualification, support, reporting, and operational systems.",
};

export default function BusinessAutomationPage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG["business-automation"]} />;
}
