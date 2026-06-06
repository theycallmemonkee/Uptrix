export interface WebsiteProject {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  liveUrl: string;
  screenshot: string;
  badgeValue: string;
  badgeLabel: string;
  caseStudyUrl?: string;
}

export const WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: "jazzo",
    name: "Jazzo Store",
    category: "E-Commerce",
    industry: "Premium Accessories & Apparel",
    description: "High-end designer streetwear store. Implements custom product display matrices, dynamic category filtering, fast CDN image pipelines, and responsive mobile-first layouts.",
    liveUrl: "https://www.jazzo.store/",
    screenshot: "/portfolio/websites/jazzo.jpg",
    badgeValue: "0.4s Load",
    badgeLabel: "Edge Latency"
  },
  {
    id: "bigblare",
    name: "Big Blare Innovations",
    category: "Corporate Site",
    industry: "Digital Consultancy & Agency",
    description: "Sleek agency hub featuring dynamic page-reveal transitions, custom glassmorphic interfaces, interactive service grids, and optimized client intake workflows.",
    liveUrl: "https://bigblareinnovations.com/",
    screenshot: "/portfolio/websites/bigblare.jpg",
    badgeValue: "Next.js 15",
    badgeLabel: "Modern Stack"
  },
  {
    id: "vastra",
    name: "Vastra Store",
    category: "E-Commerce",
    industry: "Ethnic Wear Boutique",
    description: "Premium fashion store utilizing high-speed catalogs, dynamic banner carousels, customizable size grids, and personalized product recommendations.",
    liveUrl: "https://vastra-store.com/",
    screenshot: "/portfolio/websites/vastra.jpg",
    badgeValue: "Shopify Headless",
    badgeLabel: "Architecture"
  },
  {
    id: "vodaiq",
    name: "Vodaiq",
    category: "SaaS Platform",
    industry: "Data Intelligence & Analytics",
    description: "A data-analytics SaaS landing page featuring custom dark-mode dashboards, interactive pricing matrices, SVG chart animations, and automated sales funnels.",
    liveUrl: "https://www.vodaiq.com/",
    screenshot: "/portfolio/websites/vodaiq.jpg",
    badgeValue: "Tailwind v4",
    badgeLabel: "Engineered"
  },
  {
    id: "klevrax",
    name: "Klevrax",
    category: "Creative Portfolio",
    industry: "Design & Creative Studio",
    description: "Award-winning studio landing page with immersive scroll-triggered layouts, custom WebGL graphics, unique hover highlights, and fluid navigation grids.",
    liveUrl: "https://www.klevrax.com/",
    screenshot: "/portfolio/websites/klevrax.jpg",
    badgeValue: "WebGL Motion",
    badgeLabel: "High Performance"
  },
  {
    id: "uptrix",
    name: "Uptrix Technologies",
    category: "Agency Website",
    industry: "AI-Powered Enterprise Marketing",
    description: "Indian enterprise marketing agency landing page. Built with Next.js, tailwind structures, custom Framer Motion timelines, and automated business intake paths.",
    liveUrl: "https://uptrixtechnologies.com/",
    screenshot: "/portfolio/websites/uptrix.jpg",
    badgeValue: "Enterprise Scale",
    badgeLabel: "Security"
  },
  {
    id: "ecofitz",
    name: "Ecofitz",
    category: "E-Commerce",
    industry: "Sustainable Goods & Lifestyle",
    description: "Eco-friendly consumer products store highlighting sustainable storytelling, green HSL styling details, robust search capabilities, and minimal load latency.",
    liveUrl: "https://ecofitz.com/",
    screenshot: "/portfolio/websites/ecofitz.jpg",
    badgeValue: "99/100 Speed",
    badgeLabel: "Lighthouse"
  },
  {
    id: "lebodee",
    name: "Lebodee",
    category: "E-Commerce",
    industry: "Apparel & Lifestyle",
    description: "Modern lifestyle and luxury apparel storefront with high-definition media displays, modular catalog cards, and optimized cart-to-order pipelines.",
    liveUrl: "https://www.lebodee.com/",
    screenshot: "/portfolio/websites/lebodee.jpg",
    badgeValue: "Frictionless Checkout",
    badgeLabel: "Cart UX"
  },
  {
    id: "t-adda",
    name: "T-Adda",
    category: "Web Application",
    industry: "Custom Print-On-Demand",
    description: "Print-on-demand merch store. Features real-time design customizers, automated backend fulfillment integrations, and bulk ordering calculation logic.",
    liveUrl: "https://t-adda.in/",
    screenshot: "/portfolio/websites/t-adda.jpg",
    badgeValue: "Canvas Engine",
    badgeLabel: "Interactive Editor"
  }
];
