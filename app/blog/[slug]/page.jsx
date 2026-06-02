import { notFound } from "next/navigation";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { BlogProgress } from "@/components/blog/blog-progress";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogLeftTOC, BlogLeftShare } from "@/components/blog/blog-left-toc";
import { BlogTakeawaysAccordion } from "@/components/blog/blog-takeaways-accordion";
import { BlogRightForm } from "@/components/blog/blog-right-form";
import { RelatedArticles } from "@/components/blog/related-articles";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixtechnologies.com";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Blog | Uptrix Technologies" };

  const canonical = `/blog/${post.slug}`;
  const coverUrl = post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`;
  return {
    title: `${post.title} | Uptrix Technologies`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}${canonical}`,
      images: [{ url: coverUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [coverUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, 3);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  // Article and Author Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover.startsWith("http") ? post.cover : `${SITE_URL}${post.cover}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "image": post.authorImage ? (post.authorImage.startsWith("http") ? post.authorImage : `${SITE_URL}${post.authorImage}`) : undefined,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Uptrix Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/Uptrix.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#111827] antialiased">
      {/* Schema Integration */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <BlogProgress />
      <PremiumNavbar theme="blog" />

      {/* Main container with max-width 1440px and centered alignment */}
      <main className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 pt-[130px] md:pt-[150px]">
        {/* CSS Grid for Desktop 3-column layout: TOC Left | Content Center | Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,760px)_320px] gap-12 xl:gap-[48px] justify-between items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (TOC & Share) */}
          <aside className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-[120px] lg:self-start lg:space-y-6">
            {/* Desktop TOC */}
            <div className="hidden lg:block">
              <BlogLeftTOC headings={post.headings || []} variant="desktop" />
            </div>

            {/* Tablet TOC: rendered above content (TOC first) */}
            <div className="hidden md:block lg:hidden w-full mb-2">
              <BlogLeftTOC headings={post.headings || []} variant="tablet" />
            </div>

            {/* Mobile TOC: collapsible at top */}
            <div className="block md:hidden w-full mb-2">
              <BlogLeftTOC headings={post.headings || []} variant="mobile" />
            </div>

            {/* Desktop Left Share */}
            <div className="hidden lg:block pt-5 border-t border-gray-150">
              <BlogLeftShare shareUrl={shareUrl} shareTitle={post.title} />
            </div>
          </aside>

          {/* COLUMN 2: CENTER CONTENT */}
          <article className="min-w-0 w-full">
            <BlogPostHero post={post} />
            
            {/* Key Takeaways Accordion: placed BEFORE article content */}
            <div className="mt-8 mb-10">
              <BlogTakeawaysAccordion takeaways={post.takeaways || []} />
            </div>

            <BlogContent content={post.content} />

            {/* Share Section below content for Mobile/Tablet */}
            <div className="lg:hidden mt-10 pt-6 border-t border-gray-100">
              <BlogLeftShare shareUrl={shareUrl} shareTitle={post.title} />
            </div>
          </article>

          {/* COLUMN 3: RIGHT SIDEBAR (Lead Form Card) */}
          <aside className="w-full lg:w-[320px] lg:shrink-0 lg:sticky lg:top-[120px] lg:self-start mt-12 lg:mt-0">
            <BlogRightForm post={post} />
          </aside>
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-gray-100 pt-16">
            <RelatedArticles posts={related} />
          </div>
        ) : null}
      </main>

      <EnterpriseFooter />
    </div>
  );
}
