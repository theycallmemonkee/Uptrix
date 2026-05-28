import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { BlogProgress } from "@/app/blog/_components/blog-progress";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
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

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-30 md:px-10">
        <section className="relative overflow-hidden rounded-[2.1rem] border border-white/12 shadow-[0_28px_90px_rgba(2,9,22,0.65)] ring-1 ring-inset ring-white/8">
          <div className="relative h-[24rem] md:h-[34rem]">
            <Image src={post.cover} alt={post.title} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,25,0.2),rgba(4,12,25,0.86)_64%,rgba(4,12,25,0.96))]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/72">
              <Link href="/blog" className="text-white/85 transition-colors hover:text-white">
                Blog
              </Link>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-white/35" />
              <span>{post.readingTime}</span>
            </div>
            <span className="inline-flex rounded-full border border-[#A8C9FF]/34 bg-[#0C2C57]/44 px-3 py-1 text-xs tracking-[0.14em] text-[#DCEBFF] uppercase">
              {post.category}
            </span>
            <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-white/70 md:text-base">By {post.author}</p>
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <BlogSidebar headings={post.headings || []} shareUrl={shareUrl} shareTitle={post.title} />
          <article className="min-w-0 rounded-[1.8rem] border border-white/12 bg-white/[0.03] p-6 shadow-[0_26px_88px_rgba(2,9,22,0.58)] ring-1 ring-inset ring-white/8 backdrop-blur-xl md:p-10">
            <div
              className="prose prose-invert prose-p:text-white/78 prose-p:leading-8 prose-headings:font-heading prose-headings:tracking-tight prose-h2:mt-12 prose-h2:scroll-mt-28 prose-h2:text-3xl prose-h3:mt-8 prose-h3:scroll-mt-28 prose-h3:text-2xl prose-li:text-white/78 prose-strong:text-white max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-7xl">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Related posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.03] p-4 ring-1 ring-inset ring-white/8 transition-all duration-300 hover:-translate-y-1 hover:border-[#8BB8FF]/45"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      width={900}
                      height={540}
                      className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 1024px) 26vw, (min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                  <p className="mt-4 text-xs text-white/60">
                    {item.date} • {item.readingTime}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <EnterpriseFooter />
    </div>
  );
}
