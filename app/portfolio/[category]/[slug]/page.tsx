import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { CaseStudyPageClient } from "@/components/portfolio/case-study-client";
import { PORTFOLIO_ITEMS } from "@/data/portfolio-data";

const categoryToItemIdMap: Record<string, string> = {
  "ai-seo": "ai-seo",
  "google-ads": "google-ads",
  "meta-ads": "meta-ads",
  "social": "social-media",
};

export function generateStaticParams() {
  return [
    { category: "ai-seo", slug: "case-study-1" },
    { category: "google-ads", slug: "case-study-1" },
    { category: "meta-ads", slug: "case-study-1" },
    { category: "social", slug: "case-study-1" },
  ];
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const itemId = categoryToItemIdMap[category];
  const project = PORTFOLIO_ITEMS.find((item) => item.id === itemId);

  if (!project || slug !== "case-study-1") {
    return {
      title: "Case Study — Uptrix Technologies",
      description: "Explore premium marketing performance, AI-driven architectures, and scalable analytics case studies.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixtechnologies.com";
  const canonicalUrl = `${siteUrl}/portfolio/${category}/${slug}`;

  return {
    title: `${project.client} Case Study — ${project.category} Portfolio`,
    description: project.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.client} Case Study — ${project.category} Portfolio`,
      description: project.subtitle,
      url: canonicalUrl,
      images: [
        {
          url: `${siteUrl}${project.featuredImage}`,
          width: 1200,
          height: 630,
          alt: `${project.client} Case Study Overview`,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { category, slug } = await params;
  const itemId = categoryToItemIdMap[category];

  if (!itemId || slug !== "case-study-1") {
    notFound();
  }

  const project = PORTFOLIO_ITEMS.find((item) => item.id === itemId);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#061124] text-white">
      <PremiumNavbar />
      <CaseStudyPageClient project={project} key={project.id} />
      <EnterpriseFooter />
    </div>
  );
}
