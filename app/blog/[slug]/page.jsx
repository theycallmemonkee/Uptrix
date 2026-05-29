import { notFound } from "next/navigation";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { BlogProgress } from "@/components/blog/blog-progress";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogContent } from "@/components/blog/blog-content";
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
  return {
    title: `${post.title} | Uptrix Technologies`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}${canonical}`,
      images: [{ url: post.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug, 3);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
      <BlogProgress />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(980px circle at 16% 12%, rgba(0,102,255,0.24), transparent 56%), radial-gradient(760px circle at 84% 10%, rgba(154,197,255,0.14), transparent 60%), linear-gradient(180deg,#0B1F3A 0%,#081830 52%,#060F1E 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <PremiumNavbar />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-20 pt-[96px] sm:px-6 lg:px-8 lg:pt-[112px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start lg:gap-10 xl:gap-12">
          <article className="min-w-0 w-full">
            <BlogPostHero post={post} />
            <BlogContent content={post.content} />
          </article>

          <BlogSidebar
            headings={post.headings || []}
            shareUrl={shareUrl}
            shareTitle={post.title}
          />
        </div>

        {related.length > 0 ? (
          <div className="mt-16 border-t border-white/10 pt-14 lg:mt-20">
            <RelatedArticles posts={related} />
          </div>
        ) : null}
      </main>

      <EnterpriseFooter />
    </div>
  );
}
