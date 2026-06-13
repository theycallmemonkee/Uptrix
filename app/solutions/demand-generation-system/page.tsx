import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { MoreLeadsClient } from "@/components/more-leads/more-leads-client";

export const metadata: Metadata = {
  title: "Not Getting Leads? Lead Generation Agency That Delivers",
  description:
    "Tired of an empty pipeline? We build demand generation systems that bring consistent leads every month through SEO, paid ads and AI search.",
  alternates: {
    canonical: "/solutions/demand-generation-system",
  },
  openGraph: {
    title: "Not Getting Leads? Lead Generation Agency That Delivers",
    description:
      "Tired of an empty pipeline? We build demand generation systems that bring consistent leads every month through SEO, paid ads and AI search.",
    type: "website",
    url: "https://uptrixtechnologies.com/solutions/demand-generation-system",
  },
  twitter: {
    card: "summary_large_image",
    title: "Not Getting Leads? Lead Generation Agency That Delivers",
    description:
      "Tired of an empty pipeline? We build demand generation systems that bring consistent leads every month through SEO, paid ads and AI search.",
  },
};

export default function DemandGenerationSystemPage() {
  const allPosts = getAllPosts();
  const leadGenPosts = allPosts
    .filter((post) => post.category === "Lead Generation")
    .slice(0, 4);

  const siteUrl = "https://uptrixtechnologies.com";

  // 1. Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Demand Generation System",
    "description":
      "Tired of an empty pipeline? We build demand generation systems that bring consistent leads every month through SEO, paid ads and AI search.",
    "provider": {
      "@type": "Organization",
      "name": "Uptrix Technologies",
      "url": siteUrl,
      "logo": `${siteUrl}/Uptrix.png`,
    },
    "areaServed": "Worldwide",
    "serviceType": "Lead Generation Agency",
  };

  // 2. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does lead generation cost per month?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your market and lead targets, but here is the honest structure: our fee plus your ad budget, agreed against a target cost per lead before we start. On the Growth Roadmap call we tell you the realistic number for your business — and whether your budget is enough to hit it. If it is not, we say so.",
        },
      },
      {
        "@type": "Question",
        "name": "How long until lead generation shows results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Paid modules typically produce leads within 30 to 45 days of launch. Organic modules — SEO, AI search, content — compound over 60 to 90 days and keep growing after that. We set the exact expectations for your situation before anything is built.",
        },
      },
      {
        "@type": "Question",
        "name": "Is a lead generation agency better than building an in house team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most growing businesses, neither alone. An in house marketer is a generalist. The system needs specialists across SEO, paid, content and automation working together — which is exactly what you rent from us at a fraction of the cost of hiring four people. Many of our clients have in house marketers we work alongside.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the difference between lead generation and demand generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lead generation captures people who are ready to buy now. Demand generation builds the system that creates that readiness — visibility, trust and education — so buyers already know you when they are ready. The Demand Generation System does both, which is why it compounds instead of plateauing.",
        },
      },
      {
        "@type": "Question",
        "name": "Will this work for my industry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your buyers search online or use social media — yes. We have built systems for B2B, SaaS, D2C, ecommerce, professional services, local services and regulated industries across the US, UK, Gulf, Australia and worldwide.",
        },
      },
      {
        "@type": "Question",
        "name": "What do I need to have in place before starting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A clear idea of who your ideal customer is, a website or landing page we can send traffic to, and the ability to respond when leads come in. Everything else, we build.",
        },
      },
      {
        "@type": "Question",
        "name": "How is Uptrix Technologies different from other agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We do not sell channels. We sell one system with one accountable number — your cost per lead. No juggling vendors, no reports full of impressions, no guessing what is working. One engine, fully tracked, built to compound.",
        },
      },
      {
        "@type": "Question",
        "name": "What happens if it is not working?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will know before we do anything about it — weekly data reviews are visible to you. If a module underperforms we fix or replace it. Full transparency is the deal. We keep clients by results, not by contracts.",
        },
      },
    ],
  };

  // 3. HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Our Lead Generation Process Works",
    "description": "Our structured process for building and launching a compounding demand generation system.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Growth Roadmap Call",
        "text": "60 minutes. We diagnose your business, your buyer, your current channels and exactly where leads are leaking. You leave with clarity even if we never work together.",
        "url": `${siteUrl}/solutions/demand-generation-system#step-1`,
      },
      {
        "@type": "HowToStep",
        "name": "System Architecture",
        "text": "We map your complete system — which modules, in what order, at what budget, against what cost per lead target. You see the whole plan before anything is built.",
        "url": `${siteUrl}/solutions/demand-generation-system#step-2`,
      },
      {
        "@type": "HowToStep",
        "name": "Build and Launch",
        "text": "Every module built, connected and tracked from day one. Search visibility, paid campaigns, content engine, capture funnel — one system going live, not four projects.",
        "url": `${siteUrl}/solutions/demand-generation-system#step-3`,
      },
      {
        "@type": "HowToStep",
        "name": "Optimise and Scale",
        "text": "Weekly optimisation on live data. Monthly reporting on the numbers that matter — cost per lead, enquiries, pipeline. Never impressions. Never excuses.",
        "url": `${siteUrl}/solutions/demand-generation-system#step-4`,
      },
    ],
  };

  // 4. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uptrix Technologies",
    "url": siteUrl,
    "logo": `${siteUrl}/Uptrix.png`,
    "sameAs": [
      "https://www.linkedin.com/company/uptrix-technologies",
    ],
  };

  // 5. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Demand Generation System",
        "item": `${siteUrl}/solutions/demand-generation-system`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MoreLeadsClient posts={leadGenPosts} />
    </>
  );
}
