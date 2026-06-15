import { groq } from 'next-sanity'

// ─── Singletons ───────────────────────────────────────────────────────────────

export const GLOBAL_SETTINGS_QUERY = groq`
  *[_type == "globalSettings" && _id == "singleton-global-settings"][0] {
    _id,
    siteTitle,
    siteDescription,
    logo,
    logoAlt,
    phone,
    email,
    footerTagline,
    footerCtaHeadline,
    footerCtaButtonLabel,
    copyrightText,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    twitterUrl,
    footerNavLinks[] { label, href },
    footerSystems[] { label, href }
  }
`

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && _id == "singleton-home-page"][0] {
    _id,
    heroEyebrow,
    heroHeadline,
    heroHeadlinePart1,
    heroHeadlineHighlight,
    heroBody,
    heroCta1Label,
    heroCta1Href,
    heroCta2Label,
    heroCta2Href,
    heroMetricBadge,
    heroSocialProofText,
    aiSectionEyebrow,
    aiSectionHeadline,
    aiSectionBody,
    aiSectionCtaLabel,
    aiSectionCtaHref,
    industriesEyebrow,
    industriesHeadline,
    industriesBody,
    industries,
    seoTitle,
    seoDescription
  }
`

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "singleton-about-page"][0] {
    _id,
    heroHeadline,
    heroBody,
    stats[] { value, label },
    values[] { iconName, title, description },
    timeline[] { year, title, description },
    enterpriseStats[] { value, label },
    portfolioShowcase[] { title, description },
    seoTitle,
    seoDescription
  }
`

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage" && _id == "singleton-contact-page"][0] {
    _id,
    badge,
    headline,
    body,
    email,
    phone,
    responseTime,
    formSuccessTitle,
    formSuccessBody,
    seoTitle,
    seoDescription
  }
`

// ─── FAQ Items ────────────────────────────────────────────────────────────────

export const FAQS_GLOBAL_QUERY = groq`
  *[_type == "faqItem" && page == "global"] | order(order asc) {
    _id,
    question,
    answer,
    page,
    order
  }
`

export const FAQS_BY_PAGE_QUERY = groq`
  *[_type == "faqItem" && page == $page] | order(order asc) {
    _id,
    question,
    answer,
    page,
    order
  }
`

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const FEATURED_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    author,
    role,
    company,
    quote,
    avatar,
    rating,
    featured,
    service,
    order
  }
`

export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(featured desc, order asc) {
    _id,
    author,
    role,
    company,
    quote,
    avatar,
    rating,
    featured,
    service,
    order
  }
`

// ─── Services ─────────────────────────────────────────────────────────────────

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(name asc) {
    _id,
    "slug": slug.current,
    name,
    shortLabel,
    cardCategory,
    dropdownDescription,
    headline,
    highlightedKeyword,
    heroDescription,
    ctaLabel,
    heroMetrics[] { label, value },
    whyTitle,
    whyDescription,
    whyBullets,
    featureCards[] { title, description, image, imageUrl },
    cardTitle,
    cardDescription,
    cardImage,
    cardImageUrl,
    finalCtaTitle,
    finalCtaDescription,
    seoTitle,
    seoDescription
  }
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    shortLabel,
    cardCategory,
    dropdownDescription,
    headline,
    highlightedKeyword,
    heroDescription,
    ctaLabel,
    heroMetrics[] { label, value },
    whyTitle,
    whyDescription,
    whyBullets,
    featureCards[] { title, description, image, imageUrl },
    cardTitle,
    cardDescription,
    cardImage,
    cardImageUrl,
    finalCtaTitle,
    finalCtaDescription,
    problems[] { title, description },
    solutions[] { title, description },
    processSteps[] { step, title, description },
    benefits[] { title, description },
    caseStudy {
      title, subtitle, overview, client, quote, image, imageUrl,
      metrics[] { label, value }
    },
    faqItems[] { question, answer },
    seoTitle,
    seoDescription
  }
`

// ─── Solutions ────────────────────────────────────────────────────────────────

export const ALL_SOLUTIONS_QUERY = groq`
  *[_type == "solution"] | order(name asc) {
    _id,
    "slug": slug.current,
    name,
    tagline,
    headline,
    heroDescription,
    ctaLabel,
    seoTitle,
    seoDescription
  }
`

export const SOLUTION_BY_SLUG_QUERY = groq`
  *[_type == "solution" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    tagline,
    headline,
    heroDescription,
    ctaLabel,
    problemStatement,
    systemComponents[] { title, description },
    results[] { label, value },
    faqItems[] { question, answer },
    seoTitle,
    seoDescription
  }
`

// ─── Portfolio ────────────────────────────────────────────────────────────────

export const ALL_PORTFOLIO_QUERY = groq`
  *[_type == "portfolioItem"] | order(featured desc, order asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    challenge,
    results[] { label, value },
    coverImage,
    featured,
    order
  }
`

export const PORTFOLIO_ITEM_BY_SLUG_QUERY = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    challenge,
    approach,
    results[] { label, value },
    takeaways,
    coverImage,
    images,
    featured,
    clientQuote,
    seoTitle,
    seoDescription
  }
`

export const FEATURED_PORTFOLIO_QUERY = groq`
  *[_type == "portfolioItem" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    client,
    category,
    coverImage,
    results[] { label, value }
  }
`
