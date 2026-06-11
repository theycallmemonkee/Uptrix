import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SOLUTIONS } from "@/data/solutions-data";
import { SolutionPageTemplate } from "@/components/solutions/solution-page-template";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return SOLUTIONS.map((sol) => ({
    slug: sol.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  
  if (!solution) {
    return {
      title: "Solutions | Uptrix Technologies",
      description: "Explore enterprise-grade growth solutions built by Uptrix Technologies.",
    };
  }

  return {
    title: `${solution.title} | Uptrix Technologies`,
    description: `${solution.description} Engineered by Uptrix Technologies to optimize operations and scale customer acquisition.`,
    openGraph: {
      title: `${solution.title} | Uptrix Technologies`,
      description: solution.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.title} | Uptrix Technologies`,
      description: solution.description,
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  return <SolutionPageTemplate solution={solution} />;
}
