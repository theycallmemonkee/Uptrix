// ─── Shared ───────────────────────────────────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface SanityLinkItem {
  label: string
  href: string
}

export interface SanityMetricItem {
  label: string
  value: string
}

// ─── Global Settings ──────────────────────────────────────────────────────────

export interface SanityGlobalSettings {
  _id: string
  siteTitle?: string
  siteDescription?: string
  logo?: SanityImageAsset
  logoAlt?: string
  phone?: string
  email?: string
  footerTagline?: string
  footerCtaHeadline?: string
  footerCtaButtonLabel?: string
  copyrightText?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  footerNavLinks?: SanityLinkItem[]
  footerSystems?: SanityLinkItem[]
}

// ─── Home Page ────────────────────────────────────────────────────────────────



export interface SanityHomePage {
  _id: string
  // Hero
  heroEyebrow?: string
  heroHeadline?: string
  heroHeadlinePart1?: string
  heroHeadlineHighlight?: string
  heroBody?: string
  heroCta1Label?: string
  heroCta1Href?: string
  heroCta2Label?: string
  heroCta2Href?: string
  heroMetricBadge?: string
  heroSocialProofText?: string
  // Why section
  aiSectionEyebrow?: string
  aiSectionHeadline?: string
  aiSectionBody?: string
  aiSectionCtaLabel?: string
  aiSectionCtaHref?: string

  // Industries
  industriesEyebrow?: string
  industriesHeadline?: string
  industriesBody?: string
  industries?: string[]
  // SEO
  seoTitle?: string
  seoDescription?: string
}

// ─── About Page ───────────────────────────────────────────────────────────────

export interface SanityAboutPage {
  _id: string
  heroHeadline?: string
  heroBody?: string
  stats?: Array<{ value: string; label: string }>
  values?: Array<{ iconName: string; title: string; description: string }>
  timeline?: Array<{ year: string; title: string; description: string }>
  enterpriseStats?: Array<{ value: string; label: string }>
  portfolioShowcase?: Array<{ title: string; description: string }>
  seoTitle?: string
  seoDescription?: string
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

export interface SanityContactPage {
  _id: string
  badge?: string
  headline?: string
  body?: string
  email?: string
  phone?: string
  responseTime?: string
  formSuccessTitle?: string
  formSuccessBody?: string
  seoTitle?: string
  seoDescription?: string
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

export interface SanityFaqItem {
  _id: string
  question: string
  answer: string
  page?: string
  order?: number
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface SanityTestimonial {
  _id: string
  author: string
  role?: string
  company?: string
  quote: string
  avatar?: SanityImageAsset
  rating?: number
  featured?: boolean
  service?: string
  order?: number
}

// ─── Service ──────────────────────────────────────────────────────────────────

export interface SanityServiceFeatureCard {
  title: string
  description: string
  image?: SanityImageAsset
  imageUrl?: string
}

export interface SanityServiceCaseStudy {
  title?: string
  subtitle?: string
  overview?: string
  client?: string
  quote?: string
  image?: SanityImageAsset
  imageUrl?: string
  metrics?: SanityMetricItem[]
}

export interface SanityService {
  _id: string
  slug: { current: string }
  name: string
  shortLabel?: string
  cardCategory?: string
  dropdownDescription?: string
  headline?: string
  highlightedKeyword?: string
  heroDescription?: string
  ctaLabel?: string
  heroMetrics?: SanityMetricItem[]
  whyTitle?: string
  whyDescription?: string
  whyBullets?: string[]
  featureCards?: SanityServiceFeatureCard[]
  cardTitle?: string
  cardDescription?: string
  cardImage?: SanityImageAsset
  cardImageUrl?: string
  finalCtaTitle?: string
  finalCtaDescription?: string
  problems?: Array<{ title: string; description: string }>
  solutions?: Array<{ title: string; description: string }>
  processSteps?: Array<{ step: string; title: string; description: string }>
  benefits?: Array<{ title: string; description: string }>
  caseStudy?: SanityServiceCaseStudy
  faqItems?: Array<{ question: string; answer: string }>
  seoTitle?: string
  seoDescription?: string
}

// ─── Solution ─────────────────────────────────────────────────────────────────

export interface SanitySolution {
  _id: string
  slug: { current: string }
  name: string
  tagline?: string
  headline?: string
  heroDescription?: string
  ctaLabel?: string
  problemStatement?: string
  systemComponents?: Array<{ title: string; description: string }>
  results?: SanityMetricItem[]
  faqItems?: Array<{ question: string; answer: string }>
  seoTitle?: string
  seoDescription?: string
}

// ─── Portfolio Item ───────────────────────────────────────────────────────────

export interface SanityPortfolioItem {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category?: string
  challenge?: string
  approach?: string[]
  results?: SanityMetricItem[]
  takeaways?: string[]
  coverImage?: SanityImageAsset
  images?: SanityImageAsset[]
  featured?: boolean
  order?: number
  clientQuote?: string
  seoTitle?: string
  seoDescription?: string
}
