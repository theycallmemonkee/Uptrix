"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, Eye, X, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import { WEBSITE_PROJECTS, WebsiteProject } from "@/data/website-data";
import capturedManifest from "@/data/websites-captured.json";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WebsiteShowcase() {
  const [selectedProject, setSelectedProject] = useState<WebsiteProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountRaf = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(mountRaf);
  }, []);

  const activeProjects = useMemo(() => {
    if (capturedManifest && capturedManifest.length > 0) {
      const capturedIds = new Set(capturedManifest.map(m => m.id));
      return WEBSITE_PROJECTS.filter(p => capturedIds.has(p.id));
    }
    return WEBSITE_PROJECTS;
  }, []);

  // Lock body scroll and focus modal when open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      // Automatically focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#061124]">
      {/* Dynamic light highlight background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_70%_20%,rgba(0,102,255,0.06),transparent_70%),radial-gradient(800px_circle_at_20%_80%,rgba(0,102,255,0.04),transparent_65%)]" />

      {/* Grid lines mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* Responsive Website Grid Layout */}
        <div className="grid gap-6 md:grid-cols-2 min-[1200px]:grid-cols-3 lg:gap-8">
          {activeProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Preview Modal (using Portals to prevent parent relative position bugs) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                ref={modalRef}
                tabIndex={-1}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/16 bg-[#09152B] shadow-2xl outline-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2 text-white/80 transition-colors hover:bg-black/80 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Modal layout */}
                <div className="grid md:grid-cols-[2fr_1fr] h-full max-h-[90vh]">
                  {/* Left Side: Scrollable image */}
                  <div className="relative aspect-[16/10] md:aspect-auto md:h-[90vh] w-full overflow-y-auto bg-[#070E1A] scrollbar-thin scrollbar-thumb-white/10">
                    <div className="relative w-full h-[1500px]">
                      <Image
                        src={selectedProject.screenshot}
                        alt={selectedProject.name}
                        fill
                        className="object-contain object-top p-2"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                      />
                    </div>
                  </div>

                  {/* Right Side: Details */}
                  <div className="flex flex-col justify-between p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
                    <div>
                      <span className="inline-flex rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#70A8FF] uppercase">
                        {selectedProject.industry}
                      </span>

                      <h2 className="mt-4 font-heading text-3xl font-bold text-white">
                        {selectedProject.name}
                      </h2>

                      <p className="mt-2 text-xs font-medium text-white/40 uppercase tracking-widest">
                        Live URL: <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#70A8FF] hover:underline font-mono lowercase">{selectedProject.liveUrl}</a>
                      </p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Project Overview</h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                            {selectedProject.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Floating Performance</h4>
                          <p className="mt-1.5 text-sm font-semibold text-[#70A8FF] flex items-center gap-1.5">
                            <TrendingUp size={14} />
                            {selectedProject.badgeValue} — {selectedProject.badgeLabel}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Scope & Technologies</h4>
                          <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/70">
                            <li className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[#70A8FF]" />
                              Responsive UX
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[#70A8FF]" />
                              Tailwind CSS
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[#70A8FF]" />
                              Performance Tuning
                            </li>
                            <li className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[#70A8FF]" />
                              SEO Optimized
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 shine-sweep inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#70A8FF]/40 hover:bg-[#0066FF] hover:shadow-[0_8px_20px_rgba(0,102,255,0.25)]"
                      >
                        <ExternalLink size={14} />
                        Live Website
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// Separate reusable Card component
function ProjectCard({
  project,
  idx,
  onSelect,
}: {
  project: WebsiteProject;
  idx: number;
  onSelect: () => void;
}) {
  const domain = project.liveUrl.replace("https://", "").replace("www.", "").replace("/", "");
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.1, ease: EASE }}
      className="group relative flex flex-col rounded-3xl border border-white/12 bg-[#0B1528]/40 p-5 shadow-[0_20px_50px_rgba(2,9,22,0.4)] backdrop-blur-md transition-all duration-400 hover:border-[#0066FF]/30 h-full"
    >
      {/* Subtle soft blue glow behind card */}
      <div 
        className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(350px circle at 50% 50%, rgba(0,102,255,0.14), transparent 60%)",
        }}
      />

      {/* macOS-style Premium Browser Mockup Frame */}
      <div 
        onClick={onSelect}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070E1A] shadow-2xl cursor-pointer"
      >
        {/* Browser Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E1E38]/90 px-4 py-3 select-none">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56] opacity-85" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-85" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F] opacity-85" />
          </div>
          {/* Address Bar */}
          <div className="rounded-md bg-white/[0.05] border border-white/[0.04] px-6 py-1 text-[11px] tracking-wide text-white/50 font-mono text-center max-w-[220px] truncate">
            {domain}
          </div>
          <div className="w-12" />
        </div>

        {/* Screenshot Container */}
        <div className="relative h-[calc(100%-41px)] w-full overflow-hidden bg-[#070E1A]">
          <Image
            src={project.screenshot}
            alt={`${project.name} Desktop Preview`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={idx < 2}
          />

          {/* Premium Floating Glass Stats Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3, scale: 1.05 }}
            className="absolute z-20 bottom-4 right-4 flex flex-col items-center justify-center rounded-xl border border-white/12 bg-[#0A1D36]/80 px-3.5 py-2 shadow-lg ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 group-hover:border-[#70A8FF]/20"
          >
            <span className="font-heading text-[12px] font-bold text-white tracking-tight flex items-center gap-1">
              <TrendingUp size={11} className="text-[#70A8FF]" />
              {project.badgeValue}
            </span>
            <span className="mt-0.5 text-[8px] font-bold tracking-wider text-white/50 uppercase">{project.badgeLabel}</span>
          </motion.div>

          {/* Dark Glass Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#071224]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0066FF] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,102,255,0.4)] transition-transform duration-300 translate-y-3 group-hover:translate-y-0">
              <Eye size={14} />
              Inspect Design
            </div>
          </div>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            {/* Industry Badge */}
            <span className="inline-flex items-center gap-1 rounded-md bg-[#0066FF]/10 border border-[#0066FF]/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#70A8FF] uppercase">
              <Sparkles size={10} />
              {project.industry}
            </span>
            {/* Category Label */}
            <span className="text-[11px] font-medium tracking-wider text-white/40 uppercase">
              {project.category}
            </span>
          </div>

          <h3 className="mt-3 font-heading text-2xl font-bold text-white transition-colors group-hover:text-[#70A8FF]">
            {project.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {project.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3.5 border-t border-white/6 pt-5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 shine-sweep inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#70A8FF]/40 hover:bg-[#0066FF] hover:shadow-[0_8px_20px_rgba(0,102,255,0.25)]"
          >
            <ExternalLink size={14} />
            Live Website
          </a>

          <button
            type="button"
            disabled
            className="flex-1 relative group/btn cursor-not-allowed inline-flex items-center justify-center gap-2 rounded-xl border border-white/6 bg-white/[0.01] py-3 text-xs font-semibold uppercase tracking-wider text-white/40 backdrop-blur-sm"
          >
            <BookOpen size={14} />
            Case Study
            {/* Tooltip */}
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-black/90 border border-white/10 px-2 py-1 text-[10px] font-medium text-white/80 opacity-0 transition-opacity group-hover/btn:opacity-100">
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
