/**
 * Application-level Sanity utilities.
 *
 * All fetch functions return null when Sanity is not configured (env vars
 * missing) or when a network/GROQ error occurs, so every caller must supply
 * hardcoded fallback values. This ensures the site works even before Sanity
 * content is populated.
 */

import { isSanityConfigured } from '@/sanity/env'
import type {
  SanityGlobalSettings,
  SanityHomePage,
  SanityAboutPage,
  SanityContactPage,
  SanityFaqItem,
  SanityTestimonial,
  SanityService,
  SanitySolution,
  SanityPortfolioItem,
} from '@/lib/sanity/types'
import {
  GLOBAL_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  FAQS_GLOBAL_QUERY,
  FAQS_BY_PAGE_QUERY,
  FEATURED_TESTIMONIALS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  ALL_SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  ALL_SOLUTIONS_QUERY,
  SOLUTION_BY_SLUG_QUERY,
  ALL_PORTFOLIO_QUERY,
  PORTFOLIO_ITEM_BY_SLUG_QUERY,
  FEATURED_PORTFOLIO_QUERY,
} from '@/lib/sanity/queries'

// Re-export types for convenience
export type {
  SanityGlobalSettings,
  SanityHomePage,
  SanityAboutPage,
  SanityContactPage,
  SanityFaqItem,
  SanityTestimonial,
  SanityService,
  SanitySolution,
  SanityPortfolioItem,
} from '@/lib/sanity/types'

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    const { client } = await import('@/sanity/lib/client')
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Sanity] fetch error:', err)
    }
    return null
  }
}

// ─── Image URL builder ────────────────────────────────────────────────────────

export { urlFor } from '@/sanity/lib/image'

// ─── Singletons ───────────────────────────────────────────────────────────────

export async function getGlobalSettings(): Promise<SanityGlobalSettings | null> {
  return sanityFetch<SanityGlobalSettings>(GLOBAL_SETTINGS_QUERY)
}

export async function getHomePage(): Promise<SanityHomePage | null> {
  return sanityFetch<SanityHomePage>(HOME_PAGE_QUERY)
}

export async function getAboutPage(): Promise<SanityAboutPage | null> {
  return sanityFetch<SanityAboutPage>(ABOUT_PAGE_QUERY)
}

export async function getContactPage(): Promise<SanityContactPage | null> {
  return sanityFetch<SanityContactPage>(CONTACT_PAGE_QUERY)
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getGlobalFaqs(): Promise<SanityFaqItem[] | null> {
  return sanityFetch<SanityFaqItem[]>(FAQS_GLOBAL_QUERY)
}

export async function getFaqsByPage(page: string): Promise<SanityFaqItem[] | null> {
  return sanityFetch<SanityFaqItem[]>(FAQS_BY_PAGE_QUERY, { page })
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[] | null> {
  return sanityFetch<SanityTestimonial[]>(FEATURED_TESTIMONIALS_QUERY)
}

export async function getAllTestimonials(): Promise<SanityTestimonial[] | null> {
  return sanityFetch<SanityTestimonial[]>(ALL_TESTIMONIALS_QUERY)
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<SanityService[] | null> {
  return sanityFetch<SanityService[]>(ALL_SERVICES_QUERY)
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  return sanityFetch<SanityService>(SERVICE_BY_SLUG_QUERY, { slug })
}

// ─── Solutions ────────────────────────────────────────────────────────────────

export async function getAllSolutions(): Promise<SanitySolution[] | null> {
  return sanityFetch<SanitySolution[]>(ALL_SOLUTIONS_QUERY)
}

export async function getSolutionBySlug(slug: string): Promise<SanitySolution | null> {
  return sanityFetch<SanitySolution>(SOLUTION_BY_SLUG_QUERY, { slug })
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export async function getAllPortfolioItems(): Promise<SanityPortfolioItem[] | null> {
  return sanityFetch<SanityPortfolioItem[]>(ALL_PORTFOLIO_QUERY)
}

export async function getPortfolioItemBySlug(slug: string): Promise<SanityPortfolioItem | null> {
  return sanityFetch<SanityPortfolioItem>(PORTFOLIO_ITEM_BY_SLUG_QUERY, { slug })
}

export async function getFeaturedPortfolioItems(): Promise<SanityPortfolioItem[] | null> {
  return sanityFetch<SanityPortfolioItem[]>(FEATURED_PORTFOLIO_QUERY)
}
