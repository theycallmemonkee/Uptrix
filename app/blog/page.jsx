import Image from "next/image";
import Link from "next/link";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { PremiumNavbar } from "@/components/premium-navbar";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixtechnologies.com";

export const metadata = {
  title: "Blog | Uptrix Technologies",
  description: "AI growth insights, case studies, and tactical editorial playbooks from Uptrix.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Uptrix Technologies",
    description: "AI growth insights, case studies, and tactical editorial playbooks from Uptrix.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Uptrix Technologies",
    description: "AI growth insights, case studies, and tactical editorial playbooks from Uptrix.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1050px circle at 18% 14%, rgba(0,102,255,0.22), transparent 56%), radial-gradient(920px circle at 86% 18%, rgba(255,255,255,0.08), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />
      <PremiumNavbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-38 md:px-10">
        <section className="max-w-4xl">
          <p className="text-xs tracking-[0.24em] text-[#A8C9FF]/78 uppercase">UPTRIX Editorial</p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight md:text-6xl">
            Premium AI growth stories and deep-dive playbooks
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/70">
            Every article is written to help founders, marketing teams, and growth leaders build compounding systems.
          </p>
        </section>

        <section className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.62),rgba(6,14,28,0.72))] p-4 shadow-[0_22px_70px_rgba(2,9,22,0.55)] ring-1 ring-inset ring-white/8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8BB8FF]/45"
            >
              <div className="relative overflow-hidden rounded-[1.1rem]">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={1200}
                  height={720}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/72 via-transparent to-transparent" />
              </div>
              <div className="mt-5 flex items-center gap-2 text-[11px] text-white/60">
                <span className="rounded-full border border-[#8BB8FF]/30 bg-[#0E335F]/45 px-2 py-1 text-[#CFE3FF]">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight text-white transition-colors group-hover:text-[#DCEBFF]">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">{post.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9FC5FF] transition-all group-hover:gap-3 group-hover:text-white">
                Read article <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </section>
      </main>

      <EnterpriseFooter />
    </div>
  );
}
