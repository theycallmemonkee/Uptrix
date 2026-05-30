import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { SERVICES_BY_SLUG } from "@/data/services";

export const metadata: Metadata = {
  title: "AI UGC Video Ads | Uptrix Technologies",
  description: "Scale creative production with AI-powered UGC video ads, voice cloning, and performance-tested social video systems.",
};

export default function AIUGCVideoAdsPage() {
  return <ServicePageTemplate service={SERVICES_BY_SLUG["ai-ugc-video-ads"]} />;
}
