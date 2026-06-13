"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight, Target, Compass, Award, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioItem, PORTFOLIO_ITEMS } from "@/data/portfolio-data";
import { PortfolioCta } from "@/components/portfolio/portfolio-cta";

const EASE = [0.22, 1, 0.36, 1] as const;

const categorySlugMap: Record<string, string> = {
  "ai-seo": "ai-seo",
  "google-ads": "google-ads",
  "meta-ads": "meta-ads",
  "social-media": "social",
};

interface CaseStudyClientProps {
  project: PortfolioItem;
}

export function CaseStudyPageClient({ project }: CaseStudyClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for carousel and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev + 1) % project.images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, isLightboxOpen]);

  // Lock body scroll when lightbox modal is active
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountRaf = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(mountRaf);
  }, []);

  // Scroll to top on mount and whenever project id changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [project.id]);

  // Safe image fallback references to prevent index out of bounds crashes
  const currentImage = (project.images && project.images[activeImageIndex]) || (project.images && project.images[0]) || { src: "/portfolio/ai-seo/5.png", alt: "Campaign Image" };


  // Compute navigation project references
  const currentIndex = PORTFOLIO_ITEMS.findIndex((item) => item.id === project.id);
  const prevProject = PORTFOLIO_ITEMS[(currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length];
  const nextProject = PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length];

  const prevRoute = `/portfolio/${categorySlugMap[prevProject.id]}/case-study-1`;
  const nextRoute = `/portfolio/${categorySlugMap[nextProject.id]}/case-study-1`;

  // Filter out the active project for related studies (show 2 other projects)
  const relatedProjects = PORTFOLIO_ITEMS.filter((p) => p.id !== project.id).slice(0, 2);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-[120px] pb-24 md:px-10 lg:pt-[150px]">
      
      {/* ── BREADCRUMBS ───────────────────────────────────────── */}
      <nav className="mb-10 text-xs text-white/50 tracking-wider font-medium select-none">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          </li>
          <li>/</li>
          <li className="uppercase">{categorySlugMap[project.id]}</li>
          <li>/</li>
          <li className="text-white truncate max-w-[200px] md:max-w-none">{project.client} Case Study</li>
        </ol>
      </nav>

      {/* ── CASE STUDY BADGE ──────────────────────────────────── */}
      <div className="flex justify-start mb-6">
        <span className="rounded-full bg-[#70A8FF]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#70A8FF] uppercase">
          {project.category} • Case Study
        </span>
      </div>

      {/* ── LARGE TITLE & SHORT DESCRIPTION ───────────────────── */}
      <div className="max-w-4xl mb-8">
        <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/76">
          {project.subtitle}
        </p>
      </div>

      {/* ── CLIENT INFO CARD ──────────────────────────────────── */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 mb-12 select-none">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-[#70A8FF] uppercase tracking-wider">Client</span>
          <span className="mt-1 text-sm font-semibold text-white">{project.client}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-[#70A8FF] uppercase tracking-wider">Timeline</span>
          <span className="mt-1 text-sm font-semibold text-white">90-Day Campaign Loop</span>
        </div>
        <div className="flex flex-col col-span-2 md:col-span-1">
          <span className="text-[10px] font-semibold text-[#70A8FF] uppercase tracking-wider">Core Category</span>
          <span className="mt-1 text-sm font-semibold text-white">{project.category}</span>
        </div>
      </div>

      {/* ── LARGE FEATURED IMAGE & CAROUSEL GALLERY ────────────── */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-black/45 flex flex-col mb-16 shadow-2xl">
        
        {/* Active viewport (Swipe & Click trigger Lightbox) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] w-full bg-[#081220] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setIsLightboxOpen(true)}
            className="relative w-full h-full flex items-center justify-center p-6 cursor-zoom-in group"
          >
            {/* Standard responsive object-contain to prevent image cropping */}
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain transition-transform duration-500 hover:scale-102"
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
            
            {/* Click to zoom instructions overlay */}
            <div className="absolute bottom-6 right-6 rounded-lg bg-black/60 px-3 py-1.5 text-[10px] font-semibold text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm pointer-events-none tracking-wider">
              Click to Open Fullscreen Lightbox
            </div>
          </motion.div>

          {/* Left & Right Control Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter Badge */}
          <div className="absolute top-6 right-6 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm tracking-wider">
            {activeImageIndex + 1} / {project.images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="border-t border-white/8 bg-[#0C192D] p-3 flex gap-2 overflow-x-auto select-none no-scrollbar">
          {project.images.map((img, idx) => {
            const imgSrc = img?.src || "/portfolio/ai-seo/5.png";
            const imgAlt = img?.alt || "Thumbnail Image";
            return (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? "border-[#70A8FF] scale-[1.04] opacity-100" : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={imgSrc} alt={imgAlt} fill className="object-cover" sizes="80px" />
              </button>
            );
          })}
        </div>

      </div>

      {/* ── METRICS SECTION ───────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-3 mb-16">
        {project.metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 text-center shadow-lg select-none"
          >
            <p className="font-heading text-4xl font-bold text-[#70A8FF] md:text-5xl">
              {metric.value}
            </p>
            <p className="mt-2 text-xs font-semibold tracking-widest text-white/60 uppercase">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── CASE STUDY SECTIONS & KEY TAKEAWAYS ────────────────── */}
      <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16 mb-20">
        
        {/* Left Side: Challenge, Strategy, Results */}
        <div className="space-y-12">
          
          {/* Challenge */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FF6356]">
              <Target size={18} />
              <h4 className="font-heading text-xl font-semibold tracking-wide uppercase text-white">
                The Challenge
              </h4>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/70">
              {project.challenge}
            </p>
          </div>

          {/* Strategy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#70A8FF]">
              <Compass size={18} />
              <h4 className="font-heading text-xl font-semibold tracking-wide uppercase text-white">
                The Strategy
              </h4>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/70">
              {project.strategy}
            </p>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FFD23F]">
              <Award size={18} />
              <h4 className="font-heading text-xl font-semibold tracking-wide uppercase text-white">
                Execution &amp; Results
              </h4>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/70">
              {project.execution} {project.results}
            </p>
          </div>

        </div>

        {/* Right Side: Key Takeaways Card */}
        <div className="self-start">
          <div className="rounded-2xl border border-white/12 bg-[linear-gradient(160deg,rgba(14,34,64,0.65),rgba(7,18,37,0.55))] p-6 shadow-xl backdrop-blur-md select-none relative">
            <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40 bg-[linear-gradient(120deg,rgba(0,102,255,0.18),rgba(255,255,255,0.03),rgba(0,102,255,0.16))]" />
            
            <div className="flex items-center gap-2 text-[#70A8FF] mb-6 border-b border-white/8 pb-4">
              <BookOpen size={16} />
              <h4 className="font-heading text-sm font-semibold tracking-wider uppercase">
                Key Takeaways
              </h4>
            </div>

            <ul className="space-y-5">
              {project.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#70A8FF] shadow-[0_0_8px_rgba(112,168,255,0.8)]" />
                  <p className="text-xs leading-relaxed text-white/80">{takeaway}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* ── ADDITIONAL GALLERY (GRID OF REMAINING IMAGES) ──────── */}
      <div className="mb-24">
        <h3 className="font-heading text-xl font-semibold text-white tracking-tight mb-8">
          Additional Campaign Artifacts
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {project.images.map((img, idx) => {
            const imgSrc = img?.src || "/portfolio/ai-seo/5.png";
            const imgAlt = img?.alt || "Campaign Artifact";
            return (
              <motion.div
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsLightboxOpen(true);
                }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/12 bg-[#081220] cursor-pointer shadow-lg"
              >
                <Image src={imgSrc} alt={imgAlt} fill className="object-contain p-2" sizes="(max-width: 768px) 100vw, 30vw" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-semibold text-white tracking-widest uppercase">Inspect Layout</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ── RELATED CASE STUDIES ──────────────────────────────── */}
      <div className="mb-24 border-t border-white/8 pt-16 select-none">
        <h3 className="font-heading text-2xl font-semibold text-white tracking-tight mb-8">
          Related Case Studies
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {relatedProjects.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${categorySlugMap[item.id]}/case-study-1`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.02] p-5 hover:border-[#70A8FF]/25 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-semibold tracking-wider text-[#70A8FF] uppercase">
                  {item.category}
                </span>
                <h4 className="mt-2 font-heading text-lg font-semibold text-white group-hover:text-[#70A8FF] transition-colors">
                  {item.title}
                </h4>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/6 pt-4 text-xs font-semibold text-[#70A8FF]">
                <span>Read Full Case Study</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CASE STUDY NAVIGATION ────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/8 pt-8 gap-4 select-none">
        <Link
          href={prevRoute}
          onClick={() => window.scrollTo(0, 0)}
          className="group inline-flex items-center gap-2 font-heading text-xs font-semibold text-white/60 hover:text-[#70A8FF] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Previous Case Study</span>
        </Link>

        <Link
          href="/portfolio"
          onClick={() => window.scrollTo(0, 0)}
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 font-heading text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          Back to Portfolio
        </Link>

        <Link
          href={nextRoute}
          onClick={() => window.scrollTo(0, 0)}
          className="group inline-flex items-center gap-2 font-heading text-xs font-semibold text-white/60 hover:text-[#70A8FF] transition-colors cursor-pointer"
        >
          <span>Next Case Study</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* ── PRE-FOOTER CTA SECTION ────────────────────────────── */}
      <div className="mt-24">
        <PortfolioCta />
      </div>

      {/* ── FULLSCREEN LIGHTBOX OVERLAY ───────────────────────── */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md select-none">
              <div className="absolute inset-0 cursor-pointer" onClick={() => setIsLightboxOpen(false)} />
              
              {/* Lightbox Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
                data-lenis-prevent
                className="relative z-10 w-full max-w-5xl aspect-[16/10] bg-[#070E1A] border border-white/12 rounded-3xl overflow-hidden flex flex-col"
              >
                {/* Header Close button */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/8 bg-black/20">
                  <span className="text-[10px] tracking-wider font-semibold text-white/50 uppercase">
                    Image {activeImageIndex + 1} of {project.images.length}
                  </span>
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="rounded-full bg-white/5 p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Viewport */}
                <div className="flex-1 relative flex items-center justify-center p-4">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    className="object-contain transition-transform duration-500 hover:scale-103 cursor-zoom-out"
                    onClick={() => setIsLightboxOpen(false)}
                  />

                  {/* Arrows */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white/80 hover:bg-black/60 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white/80 hover:bg-black/60 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
