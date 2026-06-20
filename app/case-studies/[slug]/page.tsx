import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PremiumNavbar } from "@/components/shared/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { CaseStudyTemplate } from "@/components/case-studies/case-study-template";
import { ALL_CASE_STUDIES, getCaseStudyBySlug } from "@/data/case-studies-data";

// ── Static params — one route per case study ─────────────────────────────────
export function generateStaticParams() {
  return ALL_CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uptrixtechnologies.com";

  if (!study) {
    return {
      title: "Case Study — Uptrix Technologies",
      description: "Explore premium marketing results, AI-driven architectures, and scalable growth case studies from Uptrix Technologies.",
    };
  }

  const canonicalUrl = `${siteUrl}/case-studies/${slug}`;

  return {
    title: `${study.client} Case Study — ${study.category} | Uptrix Technologies`,
    description: study.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${study.client} Case Study — ${study.category}`,
      description: study.description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: `${siteUrl}${study.heroImage}`,
          width: 1200,
          height: 630,
          alt: `${study.client} case study showcase`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client} Case Study — ${study.category}`,
      description: study.description,
      images: [`${siteUrl}${study.heroImage}`],
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#020617] text-white">
      <PremiumNavbar />
      <CaseStudyTemplate study={study} />
      <EnterpriseFooter />
    </div>
  );
}
