

export type SolutionProblem = {
  title: string;
  description: string;
};

export type SolutionBenefit = {
  title: string;
  description: string;
};

export type SolutionProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type SolutionFeatureCard = {
  title: string;
  description: string;
  image: string;
};

export type SolutionCaseStudy = {
  title: string;
  subtitle: string;
  overview: string;
  image: string;
  client: string;
  quote: string;
  metrics: { label: string; value: string }[];
};

export type SolutionRoiStat = {
  label: string;
  value: string;
};

export type SolutionTestimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type SolutionFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export interface SolutionConfig {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  bestFor: string;
  features: string[];
  cta: string;
  iconName: string;
  iconColor: string;
  
  // Page detailed config
  headline: string;
  heroDescription: string;
  problems: SolutionProblem[];
  systemSolutions: SolutionBenefit[];
  processSteps: SolutionProcessStep[];
  featureCards: SolutionFeatureCard[];
  caseStudy: SolutionCaseStudy;
  roiStats: SolutionRoiStat[];
  testimonials: SolutionTestimonial[];
  faqItems: SolutionFaqItem[];
}

export const SOLUTIONS: SolutionConfig[] = [
  {
    slug: "demand-generation-system",
    title: "Demand Generation System",
    subtitle: "Not Enough Leads?",
    badge: "Pipeline Acceleration",
    description: "We build organic and paid customer acquisition systems combining search engine dominance, content amplification, and intent-driven traffic capturing to scale qualified pipeline.",
    bestFor: "B2B and SaaS brands ready to scale pipeline predictability and reduce dependency on outbound sales.",
    features: ["SEO", "Paid Ads", "Social Content", "AI Search"],
    cta: "See Full Solution",
    iconName: "TrendingUp",
    iconColor: "rgba(0, 102, 255, 0.2)",
    headline: "Transform Silent Traffic Into Staggering Growth Pipelines",
    heroDescription: "Our Demand Generation System unifies AI SEO, intent-driven paid social, search media, and community loops to build a predictable system of high-intent buyers seeking your product.",
    problems: [
      {
        title: "Cold outbound is hitting a wall",
        description: "Email open rates and response rates are at an all-time low. Without inbound, scaling becomes an expensive headcount game."
      },
      {
        title: "High traffic, low sales interest",
        description: "Your website gets visitors, but they exit without sharing email or showing commercial interest. The traffic lacks commercial intent."
      }
    ],
    systemSolutions: [
      {
        title: "Intent-First Keyword Funneling",
        description: "We target customers searching for immediate answers, capturing them before they compare competitors."
      },
      {
        title: "Multi-Channel Demand Capturing",
        description: "We align search ads, paid social channels, and technical SEO elements to guarantee consistent brand frequency."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Demand Audit",
        description: "We audit your search presence, current funnel conversion rates, and competitor ad creatives."
      },
      {
        step: "02",
        title: "Funnel Engineering",
        description: "We design landing pages, retargeting pools, and custom lead magnets aligned with search intent."
      },
      {
        step: "03",
        title: "Launch Sprints",
        description: "We push Google search campaigns, optimized SEO content, and paid social assets simultaneously."
      },
      {
        step: "04",
        title: "Scale & Optimize",
        description: "We scale high-performing pipelines, adjust bids dynamically, and continuously optimize user pathways."
      }
    ],
    featureCards: [
      {
        title: "Intent-Driven Paid Search",
        description: "Capture buyers actively seeking solutions with zero waste and full conversion visibility.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Authority SEO Clustering",
        description: "Dominate search engine page layouts for high-value transactional terms.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "High-Frequency Paid Social",
        description: "Inject your brand value proposition into prospects' feeds across Meta and LinkedIn.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "How we scaled a B2B SaaS pipeline by 240%",
      subtitle: "Uptrix deployed an omnichannel demand framework connecting high-intent Google Search ads with topical authority clusters.",
      overview: "The client was relying heavily on cold email outreach. Within 90 days of deploying our demand system, inbound SQLs replaced cold outreach as their #1 pipeline generator.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      client: "B2B SaaS Provider",
      quote: "Our marketing pipeline completely flipped. We are now generating higher-quality leads at a fraction of our previous acquisition cost.",
      metrics: [
        { label: "Pipeline Growth", value: "240%" },
        { label: "Inbound SQLs", value: "3.4x" },
        { label: "CPA Reduction", value: "32%" }
      ]
    },
    roiStats: [
      { label: "Average ROI Observed", value: "310%" },
      { label: "Pipeline Growth in 90 Days", value: "2.4x" }
    ],
    testimonials: [
      {
        quote: "Uptrix Technologies turned our website into an active revenue driver. Their demand system delivers high-quality pipeline month over month.",
        author: "Sarah Jenkins",
        role: "VP of Growth",
        company: "VeloCRM"
      }
    ],
    faqItems: [
      {
        id: "dg-1",
        question: "How long before we see qualified leads?",
        answer: "Paid channels usually generate active leads within the first 14-21 days of launching. Organic search authority (SEO) compounding starts scaling around month 3-4."
      },
      {
        id: "dg-2",
        question: "Do you build the landing pages and creatives?",
        answer: "Yes, our team handles all design, copywriting, Next.js implementation, and creative variables to keep execution speeds high."
      }
    ]
  },
  {
    slug: "paid-growth-engine",
    title: "Paid Growth Engine",
    subtitle: "Ads Not Performing?",
    badge: "Performance Media",
    description: "An enterprise-grade paid media operation engineered for ROAS. We optimize budget allocation, audience segment targeting, and creative testing loops across Meta, Google, and LinkedIn.",
    bestFor: "E-commerce, D2C, and B2B SaaS brands with minimum $15k/mo ad spend looking to scale campaigns efficiently.",
    features: ["Meta", "Google", "LinkedIn", "Creative"],
    cta: "See Full Solution",
    iconName: "Target",
    iconColor: "rgba(100, 150, 255, 0.2)",
    headline: "Scale Performance Media Without Ad Fatigue Or ROAS Decline",
    heroDescription: "We engineer paid media campaigns with creative velocity and rigorous cohort analysis to drive predictable customer acquisition cost (CAC) reductions.",
    problems: [
      {
        title: "ROAS is decaying as budgets scale",
        description: "Winning ad creatives quickly hit audience fatigue, driving CPMs higher and making acquisition unprofitable."
      },
      {
        title: "Siloed, uncoordinated campaigns",
        description: "Your Meta and Google ads run independently, causing wasted touchpoints and double-attribution reporting issues."
      }
    ],
    systemSolutions: [
      {
        title: "Creative-First Velocity Testing",
        description: "We deploy weekly testing iterations across hooks, angles, and formats to ensure ad freshness."
      },
      {
        title: "Cross-Platform Cohort Optimization",
        description: "We map your paid channels into a single full-funnel ecosystem so retargeting and acquisition work together."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Creative Audit",
        description: "We evaluate your historical ad account metrics, creative performance, and cohort decay rates."
      },
      {
        step: "02",
        title: "Storyboard Pipeline",
        description: "Our design team produces 15-20 custom hooks, angles, and visual storyboards."
      },
      {
        step: "03",
        title: "Budget Restructure",
        description: "We consolidate ad sets and set up clear testing environments and sandbox campaigns."
      },
      {
        step: "04",
        title: "ROAS Scaling",
        description: "We move winning variables to main accounts, scale budget by 20% increments, and refresh creatives."
      }
    ],
    featureCards: [
      {
        title: "Advanced Meta Media Buying",
        description: "Leverage Broad targeting alongside creative hooks to access untapped customer segments.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Google Search & Shopping PMax",
        description: "Position your brand at the exact moment of transactional buyer search intent.",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "High-Velocity Ad Creative Studio",
        description: "Generate static design sheets, animations, and video ads built for conversion.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "How an enterprise brand scaled from $40k to $180k/mo spend",
      subtitle: "Uptrix built a structured creative testing matrix that allowed scaling ad spend by 4.5x while keeping CAC stable.",
      overview: "The client was stuck at a performance ceiling. Our creative velocity system allowed us to feed Meta's delivery algorithms with high-converting assets daily.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      client: "UrbanWear Apparel",
      quote: "Uptrix Technologies cracked our creative bottleneck. Their paid media team acts as an extension of our internal team, scaling our revenues to record highs.",
      metrics: [
        { label: "Monthly Revenue Increase", value: "280%" },
        { label: "CAC Reduction", value: "22%" },
        { label: "Tested Creatives", value: "180+" }
      ]
    },
    roiStats: [
      { label: "Average ROAS Lift", value: "45%" },
      { label: "Monthly Spend Scaled", value: "4.5x" }
    ],
    testimonials: [
      {
        quote: "Our ad accounts were burning cash. Uptrix Technologies restructured the entire paid media operation. Within 60 days, we were highly profitable.",
        author: "Michael Chang",
        role: "Chief Marketing Officer",
        company: "Lumina Co."
      }
    ],
    faqItems: [
      {
        id: "pe-1",
        question: "Do you require a minimum ad spend?",
        answer: "We typically work with brands spending $10,000+ monthly across paid channels to ensure we have enough data to test and scale efficiently."
      },
      {
        id: "pe-2",
        question: "How do you handle creative production?",
        answer: "Our design team produces all ad formats, copy, and video hooks. We run weekly creative sprints so your accounts never suffer from ad fatigue."
      }
    ]
  },
  {
    slug: "conversion-website-system",
    title: "Conversion Website System",
    subtitle: "Website Not Converting?",
    badge: "UX/UI Design & CRO",
    description: "A high-performance conversion website that turns static traffic into pipeline. Engineered with premium design, custom Next.js development, and conversion copywriting.",
    bestFor: "High-growth brands whose current websites feel outdated, slow, or have a conversion rate under 2.5%.",
    features: ["Design", "Development", "CRO", "Copywriting"],
    cta: "See Full Solution",
    iconName: "Globe",
    iconColor: "rgba(80, 130, 255, 0.2)",
    headline: "Turn Passive Visitors Into Active Pipeline With Headless Next.js Solutions",
    heroDescription: "We design and develop premium, high-speed websites that capture attention, load in milliseconds, and use structured copywriting to drive visitors to take action.",
    problems: [
      {
        title: "Slow, bloated website speed",
        description: "Your site takes seconds to load, causing visitors to bounce before they see your value proposition. Google ranks you lower due to poor web vitals."
      },
      {
        title: "Low visitor-to-lead conversion rate",
        description: "You drive traffic but the layout is complex, confusing, or lacks structured pathways, leaving potential sales on the table."
      }
    ],
    systemSolutions: [
      {
        title: "Blazing Fast Next.js Tech Stack",
        description: "We build custom headless sites with optimized images, dynamic scripts, and clean components for sub-second page loads."
      },
      {
        title: "Conversion-Focused UX Architecture",
        description: "We map user layouts based on conversion intent, putting clear CTAs and trust elements exactly where visitors look."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "UX & Conversion Audit",
        description: "We review your site's heatmaps, load speeds, device performance, and click-through dropoffs."
      },
      {
        step: "02",
        title: "Interactive Wireframing",
        description: "We map out clean layouts, structured navigation, and copywriting wires."
      },
      {
        step: "03",
        title: "Custom Visual Design",
        description: "We apply the premium, luxury glassmorphism theme, custom graphics, and animations."
      },
      {
        step: "04",
        title: "Next.js Build & Deploy",
        description: "We write clean TypeScript code, optimize assets, and deploy to ultra-fast static servers."
      }
    ],
    featureCards: [
      {
        title: "Premium UI/UX Architecture",
        description: "Immersive layouts built with luxurious design elements and smooth interactive micro-animations.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "A/B test-ready page components, interactive forms, and clear user navigation paths.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Next-Gen Headless Speed",
        description: "Perfect 100/100 Google Lighthouse and Core Web Vitals performance score to boost SEO.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Redesigning a landing page portfolio for 142% conversion lift",
      subtitle: "Uptrix Technologies redesigned an enterprise landing page ecosystem using Next.js and Tailwind CSS.",
      overview: "The client had a bloated WordPress site loading in 4.8s. By rebuilding it as a custom Next.js static application with psychological copy, their conversion rate rose from 1.4% to 3.4%.",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80",
      client: "CloudSphere Security",
      quote: "The site Uptrix Technologies built feels premium, loads instantly, and has consistently doubled our web demo signups.",
      metrics: [
        { label: "Conversion Lift", value: "142%" },
        { label: "Page Load Time", value: "0.4s" },
        { label: "Bounce Rate Reduction", value: "38%" }
      ]
    },
    roiStats: [
      { label: "Avg Conversion Increase", value: "85%" },
      { label: "Mobile Bounce Reduction", value: "44%" }
    ],
    testimonials: [
      {
        quote: "Our new website instantly positions us as the enterprise leader. The speed is phenomenal, and it has set a new standard for our marketing.",
        author: "David Kovacs",
        role: "Head of Digital",
        company: "SecureLink"
      }
    ],
    faqItems: [
      {
        id: "cw-1",
        question: "Can you migrate our existing CMS content?",
        answer: "Yes, we migrate your data to headless systems like Sanity, Contentful, or database systems to keep page management simple."
      },
      {
        id: "cw-2",
        question: "How do you ensure the site stays optimized?",
        answer: "We code using strict Next.js standards, optimizing scripts, dynamic styling assets, and fonts to ensure static deployment remains fast."
      }
    ]
  },
  {
    slug: "ai-lead-conversion-system",
    title: "AI Lead Conversion System",
    subtitle: "Leads Not Turning Into Sales?",
    badge: "AI Automation",
    description: "Automate prospect qualification and follow-up. Using custom AI agents and CRM triggers, we nurture cold and warm leads into booked sales calls 24/7/365.",
    bestFor: "Sales-led services or enterprise organizations losing high volumes of leads due to slow speed-to-lead times.",
    features: ["CRM", "Automation", "AI Nurture", "Follow Up"],
    cta: "See Full Solution",
    iconName: "Cpu",
    iconColor: "rgba(120, 170, 255, 0.2)",
    headline: "Nurture & Convert Leads Automatically 24/7 With Custom AI Agents",
    heroDescription: "Eliminate response lag. Our AI system handles inbound inquiries, schedules meetings, qualifies prospects, and maintains custom follow-up loops instantly.",
    problems: [
      {
        title: "Slow response times lose customers",
        description: "If an inbound lead waits over 5 minutes for a response, conversion chances drop by 80%. Sales teams can't be online 24/7."
      },
      {
        title: "Sales teams waste time on unqualified calls",
        description: "A high volume of booked meetings are poor fits. Sales reps waste time that could have been spent closing."
      }
    ],
    systemSolutions: [
      {
        title: "Custom AI Agent Qualification",
        description: "We build interactive AI agents that chat with incoming prospects, scoring them against your ideal customer profile (ICP)."
      },
      {
        title: "Multi-Channel Automation Playbooks",
        description: "We deploy immediate automated sequences across SMS, email, and WhatsApp to confirm booking steps."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Workflow Mapping",
        description: "We diagram your lead flow from opt-in to sales handoff to isolate communication gaps."
      },
      {
        step: "02",
        title: "AI Character Training",
        description: "We train custom AI models on your product knowledge, customer case studies, and brand tone."
      },
      {
        step: "03",
        title: "CRM Integration",
        description: "We sync automation layers directly to HubSpot, Salesforce, or custom backends."
      },
      {
        step: "04",
        title: "Live Testing",
        description: "We test AI agent conversations, scoring rules, and alert pathways to guarantee smooth handoffs."
      }
    ],
    featureCards: [
      {
        title: "AI Agent Triage & Nurture",
        description: "Converse with leads via text/chat to pre-qualify and handle objections before booking.",
        image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "CRM Automation Triggering",
        description: "Automatically route qualified deals and sync contact properties without manual CRM entries.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Omnichannel Follow-Up Sequences",
        description: "Maintain contact frequency using automated email, SMS, and calendar notifications.",
        image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "How an enterprise team reduced lead response time to 12 seconds",
      subtitle: "Uptrix Technologies automated inbound scheduling and pre-qualification using custom AI agent scripts.",
      overview: "The client was manually routing incoming website leads to reps. During off-hours, leads waited up to 14 hours. Our AI lead system qualified prospects instantly, booking 68% more calls.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      client: "OmniCorp Services",
      quote: "Our speed-to-lead became non-existent. The AI books qualified calls directly onto our sales reps' calendars while they sleep.",
      metrics: [
        { label: "Booked Call Volume", value: "+68%" },
        { label: "Lead Response Time", value: "12s" },
        { label: "Sales Team Hours Saved", value: "34/wk" }
      ]
    },
    roiStats: [
      { label: "Booked Meeting Boost", value: "+68%" },
      { label: "Response Lag Decrease", value: "99.2%" }
    ],
    testimonials: [
      {
        quote: "Uptrix Technologies completely automated our sales qualification. The lead scoring is accurate, and we only talk to enterprise buyers now.",
        author: "Rebecca Thorne",
        role: "Director of Business Development",
        company: "Apex Global"
      }
    ],
    faqItems: [
      {
        id: "ac-1",
        question: "Does the AI sound robotic?",
        answer: "No, we use advanced NLP and custom styling prompts configured with your brand guidelines so emails and messages sound human."
      },
      {
        id: "ac-2",
        question: "Can we review the AI's conversations?",
        answer: "Absolutely. All transcripts are logged inside your CRM in real time, giving your sales reps full context before calls start."
      }
    ]
  },
  {
    slug: "growth-foundation-system",
    title: "Growth Foundation System",
    subtitle: "No Marketing Strategy?",
    badge: "Go-To-Market Strategy",
    description: "Define your positioning, build your competitive strategy, and establish a clear 90-day execution roadmap. We help you transition from random tactics to a systemic growth architecture.",
    bestFor: "Enterprise ventures, scaleups, or companies entering new markets requiring strong market positioning.",
    features: ["Consulting", "Positioning", "Go To Market", "90 Day Roadmap"],
    cta: "See Full Solution",
    iconName: "Compass",
    iconColor: "rgba(87, 148, 255, 0.2)",
    headline: "Transition From Random Tactics To Structured Category Dominance",
    heroDescription: "We design data-backed go-to-market strategies, positioning playbooks, and structured 90-day action roadmaps so your team executes with absolute alignment.",
    problems: [
      {
        title: "Random acts of marketing",
        description: "You execute seo, social, and paid ads, but they lack a unified message. You burn budget without understanding what drives growth."
      },
      {
        title: "Vague, copycat positioning",
        description: "Your site sounds exactly like your competitors. Enterprise prospects struggle to understand why they should pay you a premium."
      }
    ],
    systemSolutions: [
      {
        title: "Category-Defining Positioning",
        description: "We audit competitors and restructure your value proposition so you own a distinct market angle."
      },
      {
        title: "90-Day Execution Blueprints",
        description: "We map out exact deliverables, resourcing requirements, and KPIs so your marketing team stays aligned."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Market Audit",
        description: "We conduct deep customer interviews, competitive reviews, and channel opportunity assessments."
      },
      {
        step: "02",
        title: "Positioning Sprint",
        description: "We build your narrative guide, category description, and key visual assets."
      },
      {
        step: "03",
        title: "Funnel Mapping",
        description: "We design the buyer journey and identify target pages and content required."
      },
      {
        step: "04",
        title: "Roadmap Hand-off",
        description: "We deliver a detailed 90-day growth roadmap complete with task boards and dashboards."
      }
    ],
    featureCards: [
      {
        title: "GTM Playbook Strategy",
        description: "Step-by-step launch playbooks designed to capture market share with low acquisition costs.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Message & Category Positioning",
        description: "Differentiate your brand from copycats by defining a premium category you can dominate.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "90-Day Growth Roadmap",
        description: "Tactical, weekly sprint items that coordinate content, design, and ad budgets into one plan.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Building a category launch roadmap for 3.5x revenue scale",
      subtitle: "Uptrix Technologies developed the go-to-market playbook and visual positioning for a scaling fintech startup.",
      overview: "The client was struggling to stand out in a crowded space. Our strategic alignment defined a new product category, directing their design and SEO sprints to secure market share.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80",
      client: "PayStone Technologies",
      quote: "Uptrix Technologies gave us the clarity we were missing. We finally stopped guessing and started executing a strategy that won.",
      metrics: [
        { label: "Revenue Scaling", value: "3.5x" },
        { label: "GTM Launch Window", value: "45 Days" },
        { label: "Organic Interest", value: "+180%" }
      ]
    },
    roiStats: [
      { label: "Category Launch Success", value: "100%" },
      { label: "Team Execution Efficiency", value: "+52%" }
    ],
    testimonials: [
      {
        quote: "If you are scaling and don't have a structured strategy, hire Uptrix Technologies. Their roadmap saved us months of trial and error.",
        author: "Marcus Vance",
        role: "Chief Executive Officer",
        company: "PayStone"
      }
    ],
    faqItems: [
      {
        id: "gf-1",
        question: "Is this only consulting, or do you execute too?",
        answer: "This system provides the strategy and roadmap. We can then execute it using our specialized Solution Systems (Demand, Conversion, paid growth) or support your team."
      },
      {
        id: "gf-2",
        question: "How long does a positioning sprint take?",
        answer: "A standard Go-To-Market and positioning sprint takes 4-6 weeks to complete, delivering the full GTM playbook and execution roadmap."
      }
    ]
  },
  {
    slug: "ai-marketing-system",
    title: "AI Marketing System",
    subtitle: "Falling Behind in AI?",
    badge: "AI Operations",
    description: "Modernize your marketing operations with advanced AI. We audit, implement, and train teams on AI search optimization, custom agents, and automated content hubs.",
    bestFor: "Forward-thinking teams looking to reduce marketing overhead by 30-50% while scaling output quality.",
    features: ["AI Audit", "Automation", "AI Search", "AI Content"],
    cta: "See Full Solution",
    iconName: "Sparkles",
    iconColor: "rgba(96, 166, 255, 0.2)",
    headline: "Unleash Advanced Generative AI to Triple Content Production",
    heroDescription: "We build custom generative AI workflows, train internal AI assistants, and optimize your assets for AI-powered search engines (GEO/SGE).",
    problems: [
      {
        title: "Content creation is slow and costly",
        description: "Your team spends days drafting blogs, copy, and ads. The cost is high, and output volume is too low to test effectively."
      },
      {
        title: "AI search engines are stealing traffic",
        description: "Google's SGE and Perplexity answer search queries directly. Standard SEO keywords are losing traffic to AI aggregators."
      }
    ],
    systemSolutions: [
      {
        title: "Generative Engine Optimization (GEO)",
        description: "We optimize your domain metadata, citations, and structure to ensure you are recommended in AI summaries."
      },
      {
        title: "Custom AI Agent Content Hubs",
        description: "We build secure AI models trained on your brand guidelines to generate blogs and social posts automatically."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "AI Readiness Audit",
        description: "We review your content production workflows to identify areas where AI can cut costs by 50%."
      },
      {
        step: "02",
        title: "Agent Engineering",
        description: "We code custom GPTs, automated APIs, and content databases matching your brand's voice."
      },
      {
        step: "03",
        title: "GEO Alignment",
        description: "We restructure your site content so SGE and LLMs can crawl and cite your brand."
      },
      {
        step: "04",
        title: "Workflow Training",
        description: "We run training sessions with your marketing team to ensure secure and efficient AI operations."
      }
    ],
    featureCards: [
      {
        title: "Generative Engine Optimization",
        description: "Align your website elements to rank as recommended citations inside ChatGPT, Gemini, and Perplexity.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Generative Content Pipelines",
        description: "Automate blog post and social copy generation using secure custom brand LLMs.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Operational AI Training",
        description: "Equip your marketing team with custom prompts, secure tools, and workflows to triple output.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Scaling content output by 400% while cutting costs by 62%",
      subtitle: "Uptrix Technologies engineered a custom LLM blog generator and citation strategy for an e-commerce brand.",
      overview: "The client was spending $8,000/mo on freelance content writers. By building a custom generative pipeline, we increased weekly blog output from 2 to 10 articles, with a 62% reduction in monthly spend.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      client: "FreshLife Organic",
      quote: "The content is on-brand, high-quality, and ranks. Uptrix Technologies helped us use AI safely to gain a massive competitive advantage.",
      metrics: [
        { label: "Content Velocity", value: "4x" },
        { label: "Production Cost", value: "-62%" },
        { label: "AI Search Referrals", value: "+190%" }
      ]
    },
    roiStats: [
      { label: "Overhead Reduction", value: "62%" },
      { label: "Content Volume Boost", value: "4.0x" }
    ],
    testimonials: [
      {
        quote: "Our organic traffic from AI search engines exploded after Uptrix Technologies optimized our structure. They understand the future of search.",
        author: "Daniel Mercer",
        role: "Head of Marketing",
        company: "FreshLife Co."
      }
    ],
    faqItems: [
      {
        id: "ai-1",
        question: "Is AI-generated content safe from Google penalties?",
        answer: "Yes, Google's guidelines prioritize high-quality, helpful content regardless of how it's created. We focus on search intent and topical accuracy to maintain search authority."
      },
      {
        id: "ai-2",
        question: "What is Generative Engine Optimization (GEO)?",
        answer: "GEO is the process of optimizing site content so it is crawled and selected as references and source links within AI chatbots like ChatGPT and Perplexity."
      }
    ]
  },
  {
    slug: "revenue-operations-system",
    title: "Revenue Operations System",
    subtitle: "Growth Hard To Manage?",
    badge: "RevOps & Analytics",
    description: "Unify your marketing, sales, and success systems. We build end-to-end attribution pipelines, custom dashboards, and automated lead routing so leaders can manage growth by the numbers.",
    bestFor: "Mid-market to enterprise companies with messy CRM data, siloed teams, or broken pipeline reporting.",
    features: ["CRM", "Workflows", "Dashboards", "Pipeline"],
    cta: "See Full Solution",
    iconName: "Layers",
    iconColor: "rgba(0, 102, 255, 0.2)",
    headline: "Unify Your Tech Stack And Track Funnel Performance With Accuracy",
    heroDescription: "Eliminate blind spots. We build custom multi-touch attribution reporting, clean CRM properties, and automated alerts so you scale campaigns using accurate ROI data.",
    problems: [
      {
        title: "Broken pipeline and data reporting",
        description: "Your sales team uses one CRM, marketing uses ad accounts, and analytics are disconnected. You can't track which ad campaign drove revenue."
      },
      {
        title: "Manual CRM updates slow down sales",
        description: "Reps spend hours copying data, assigning tags, and routing leads manually, resulting in lead leaks and slow response times."
      }
    ],
    systemSolutions: [
      {
        title: "Multi-Touch Revenue Attribution",
        description: "We connect UTM parameters, ad platforms, and CRM deals to track conversion pathways from first touch to closed won."
      },
      {
        title: "Automated Lead Routing Playbooks",
        description: "We write automated routing code to assign inbound accounts to reps instantly based on territory and size."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Stack Audit",
        description: "We audit your integrations, duplicate CRM fields, and data attribution gaps."
      },
      {
        step: "02",
        title: "Data Schema Design",
        description: "We align properties and lifecycle stages across HubSpot, Salesforce, and analytics dashboards."
      },
      {
        step: "03",
        title: "Attribution Pipelines",
        description: "We deploy custom analytics code to capture and record user click history."
      },
      {
        step: "04",
        title: "RevOps Dashboard",
        description: "We build live, interactive dashboards reporting CAC, LTV, pipeline velocity, and campaign ROI."
      }
    ],
    featureCards: [
      {
        title: "Multi-Touch Attribution Analytics",
        description: "Identify the exact ad campaigns, search phrases, and content posts driving closed revenue.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "CRM Lifecycle Optimization",
        description: "Unify HubSpot or Salesforce to automatically track pipeline stages, velocity, and owner routing.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Live Operations Dashboards",
        description: "Interactive visual reports tracking real-time pipeline value, acquisition costs, and team performance.",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Consolidating siloed operations for a 52% RevOps efficiency boost",
      subtitle: "Uptrix Technologies unified Salesforce and Google Analytics to track multi-touch pipelines.",
      overview: "The client was struggling to identify their highest-performing ad channels due to attribution data loss. We restructured their lead object schemas and built live visual pipelines, increasing lead velocity by 52%.",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
      client: "Innovo Industrial",
      quote: "We finally have one source of truth. Uptrix Technologies aligned our datasets so we can make spend decisions based on closed won pipeline.",
      metrics: [
        { label: "Data Accuracy", value: "99.8%" },
        { label: "Lead Velocity Boost", value: "+52%" },
        { label: "Hours of Manual Work Saved", value: "24/wk" }
      ]
    },
    roiStats: [
      { label: "Lead Velocity Increase", value: "+52%" },
      { label: "Reporting Accuracy Achieved", value: "99.8%" }
    ],
    testimonials: [
      {
        quote: "Our data was a complete mess. Uptrix Technologies cleaned our CRM systems, mapped our fields, and built custom dashboards that we review daily.",
        author: "Jonathan Pierce",
        role: "Chief Operating Officer",
        company: "Innovo Corp"
      }
    ],
    faqItems: [
      {
        id: "ro-1",
        question: "Do you build custom APIs for disconnected software?",
        answer: "Yes, we write custom integrations and webhook workflows if standard software connectors are unavailable for your platforms."
      },
      {
        id: "ro-2",
        question: "Which CRMs do you support?",
        answer: "We specialize in HubSpot and Salesforce, but we support any modern CRM system with open REST APIs."
      }
    ]
  }
];

export const SOLUTIONS_BY_SLUG: Record<string, SolutionConfig> = Object.fromEntries(
  SOLUTIONS.map((s) => [s.slug, s])
);
