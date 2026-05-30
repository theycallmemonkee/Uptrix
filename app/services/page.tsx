import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PremiumNavbar } from "@/components/premium-navbar";
import { EnterpriseFooter } from "@/components/enterprise-footer";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Uptrix Technologies",
  description:
    "Explore Uptrix premium services in AI UGC video ads, business automation, SEO, social media, PPC, and branding for enterprise growth.",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#0B1F3A] text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(1050px circle at 16% 12%, rgba(0,102,255,0.24), transparent 56%), radial-gradient(840px circle at 84% 16%, rgba(74,143,255,0.14), transparent 60%), linear-gradient(180deg, #0B1F3A 0%, #091A33 55%, #071226 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <PremiumNavbar />
      <main className="relative z-10 flex flex-1 flex-col">
        <section className="px-6 pt-[100px] pb-16 md:px-10 md:pt-[120px] md:pb-20 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-heading text-xs font-medium tracking-[0.22em] text-[#9BC2FF] uppercase">
                Premium Service Portfolio
              </p>
              <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Build market-leading growth with AI creative ads and automation systems.
              </h1>
              <p className="mt-6 text-base leading-7 text-white/72 md:text-lg">
                Explore six enterprise-ready services designed to scale your pipeline, creative output, and operational efficiency with the Uptrix growth engine.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-10 md:pb-28">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.slug}
                className="group relative overflow-hidden rounded-[1.85rem] border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.76),rgba(7,18,37,0.72))] shadow-[0_22px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#85B5FF]/30 hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.05, ease: EASE }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem]">
                  <Image src={service.cardImage} alt={`${service.cardTitle} preview`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,36,0.08),rgba(4,17,36,0.7))]" />
                </div>
                <div className="p-6">
                  <span className="inline-flex rounded-full border border-[#84B2FF]/20 bg-[#6C96D6]/12 px-3 py-1 text-[11px] font-medium tracking-[0.22em] text-[#DCEBFF]">
                    {service.cardCategory}
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-white">{service.cardTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">{service.cardDescription}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:border-[#7FB0FF]/40 hover:bg-[#0A2F56]/70"
                    >
                      Learn More
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <EnterpriseFooter />
      </main>
    </div>
  );
}
