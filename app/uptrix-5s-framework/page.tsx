import type { Metadata } from "next";
import { Uptrix5SFrameworkPage } from "@/components/uptrix-5s-framework/uptrix-5s-framework-page";

export const metadata: Metadata = {
  title: "What Is Uptrix 5S™? The Growth Marketing Framework",
  description:
    "Uptrix 5S is a five stage growth marketing framework: Scan, Strategy, Sequence, Ship, Scale. See what each stage does and who it is for.",
  alternates: { canonical: "/uptrix-5s-framework" },
  openGraph: {
    title: "What Is Uptrix 5S™? The Growth Marketing Framework",
    description:
      "Uptrix 5S is a five stage growth marketing framework: Scan, Strategy, Sequence, Ship, Scale. See what each stage does and who it is for.",
    url: "https://uptrixtechnologies.com/uptrix-5s-framework",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uptrix Technologies — AI Powered Growth Marketing Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Uptrix 5S™? The Growth Marketing Framework",
    description:
      "A five stage growth marketing framework: Scan, Strategy, Sequence, Ship, Scale.",
    images: ["/og-image.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://uptrixtechnologies.com/uptrix-5s-framework#webpage",
  url: "https://uptrixtechnologies.com/uptrix-5s-framework",
  name: "What Is Uptrix 5S™? The Growth Marketing Framework",
  description:
    "Uptrix 5S is a five stage growth marketing framework: Scan, Strategy, Sequence, Ship, Scale. See what each stage does and who it is for.",
  isPartOf: { "@id": "https://uptrixtechnologies.com/#website" },
  publisher: { "@id": "https://uptrixtechnologies.com/#organization" },
  about: {
    "@type": "Thing",
    name: "Uptrix 5S",
    description:
      "A five stage growth marketing framework by Uptrix Technologies: Scan, Strategy, Sequence, Ship, Scale.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://uptrixtechnologies.com/uptrix-5s-framework#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://uptrixtechnologies.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Uptrix 5S Framework",
      item: "https://uptrixtechnologies.com/uptrix-5s-framework",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://uptrixtechnologies.com/uptrix-5s-framework#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Uptrix 5S?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uptrix 5S is a five stage growth marketing framework: Scan, Strategy, Sequence, Ship and Scale. It runs the stages of growth in a set order, so strategy comes before spend and nothing is built until we know what it connects to.",
      },
    },
    {
      "@type": "Question",
      name: "Is Uptrix 5S a software or a tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. It is a framework run by the Uptrix team, not something you log into. Your growth is handled stage by stage by a fractional CMO and growth experts, with AI supporting behind the scenes.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Uptrix 5S for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Startups, scaleups and SMEs. The five stages stay the same for every business. What changes is where you start, based on where your business is today.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Uptrix5SFrameworkPage />
    </>
  );
}
