

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
    badge: "Demand Generation System",
    description: "Most businesses run scattered tactics that do not add up. We build one connected engine that brings customers to you on repeat, every single month.",
    bestFor: "Businesses that rely on referrals or unpredictable pipeline, and want control over how many leads arrive each month.",
    features: ["SEO", "AI Search", "Paid Ads", "Content", "Automation"],
    cta: "Contact Us",
    iconName: "TrendingUp",
    iconColor: "rgba(0, 102, 255, 0.2)",
    headline: "Tired of Wondering Where Your Next Customer Will Come From?",
    heroDescription: "Most businesses run scattered tactics and pray something works. We build one connected engine that brings customers to you on repeat, every single month.",
    problems: [
      {
        title: "Referral Dependency",
        description: "Word of mouth is a bonus, not a system. It creates an unpredictable pipeline with no monthly floor you can count on."
      },
      {
        title: "Siloed Channels and Leaks",
        description: "SEO traffic with no conversion path is wasted. Ads with no dedicated landing pages are burned budget."
      },
      {
        title: "Empty Pipeline and No Data",
        description: "Vague dashboards that track impressions instead of cost per lead and real sales conversations."
      }
    ],
    systemSolutions: [
      {
        title: "Compounding Lead Engine",
        description: "Organic authority and AI search citations that grow your reach without raising monthly ad costs."
      },
      {
        title: "Unified Conversion Layers",
        description: "Every touchpoint connected to lead capture and instant automated follow up."
      },
      {
        title: "One Accountable Number",
        description: "One team answerable to a single growth metric: cost per qualified lead."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We audit your search visibility, look at where leads should come from, and find exactly where your current pipeline is leaking."
      },
      {
        step: "02",
        title: "System Architecture",
        description: "We map your system: which modules, which traffic sources, what budget and what cost per lead target, before anything is built."
      },
      {
        step: "03",
        title: "Engine Implementation",
        description: "Every asset built and connected. Landing pages, paid search accounts, AI search setup and tracking."
      },
      {
        step: "04",
        title: "Optimisation and Scaling",
        description: "Weekly performance work, fresh creative and tracking checks that bring your cost to acquire a customer down over time."
      }
    ],
    featureCards: [
      {
        title: "Search Visibility Engine",
        description: "Get found on classic search engines and modern AI tools like ChatGPT, Gemini and Perplexity. A steady flow of organic, high intent buyers looking for answers now.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Paid Acquisition Engine",
        description: "Paid campaigns managed strictly against your target cost to acquire a customer. Immediate lead volume that keeps your calendar full while organic compounds.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Authority Content Loop",
        description: "Content built around the exact questions your buyers are asking. Higher conversion rates and lower overall paid advertising costs.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Lead Capture and Funnel Automation",
        description: "Fast landing pages, lead capture and instant automated follow up. Fast loading pages with round the clock lead scoring and routing.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Building a predictable lead engine",
      subtitle: "Real results from the demand generation system when every module runs together.",
      overview: "Here is what the demand generation system has delivered. 3.21x ROAS across D2C and paid social. 955 percent ROAS on ecommerce search ads. 1.9M views in 90 days with zero ad budget, content and social engine only.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      client: "Growing Brands",
      quote: "We had no idea why leads disappeared some months. The system shows us exactly where they come from now.",
      metrics: [
        { label: "ROAS", value: "3.21x" },
        { label: "Search ROAS", value: "955%" },
        { label: "Content Views", value: "1.9M" }
      ]
    },
    roiStats: [
      { label: "Cost Per Lead", value: "$2.27" },
      { label: "Qualified Leads", value: "3.4x" }
    ],
    testimonials: [
      {
        quote: "We had no idea why leads disappeared some months. The system shows us exactly where they come from now and we can predict next month.",
        author: "Business Owner",
        role: "Founder",
        company: "Growing Brand"
      }
    ],
    faqItems: [
      {
        id: "dg-1",
        question: "How long before we see qualified leads?",
        answer: "Paid channels usually generate active leads within the first 14 to 21 days of launching. Organic search authority compounding starts scaling around month 3 to 4."
      },
      {
        id: "dg-2",
        question: "Do you build the landing pages and creatives?",
        answer: "Yes, our team handles all design, copywriting, Next.js implementation, and creative variables to keep execution speeds high."
      },
      {
        id: "dg-3",
        question: "What if we only need one module, not the whole system?",
        answer: "Individual modules work better as part of the full system. If you only need one piece fixed, like ads or website conversion, see the focused systems instead."
      },
      {
        id: "dg-4",
        question: "How much does this cost?",
        answer: "It depends on your goals and current state. On the call we audit your situation and tell you what the full system costs before anything starts."
      },
      {
        id: "dg-5",
        question: "Can you work with a small budget?",
        answer: "Yes, if the budget is realistic for your market. A small budget inside a proper system beats a large budget on autopilot. We tell you honestly what your budget can achieve."
      },
      {
        id: "dg-6",
        question: "How long is the commitment?",
        answer: "We recommend 90 days minimum to see the system compound. Most improvements show in 30 to 45 days, then scaling from there."
      },
      {
        id: "dg-7",
        question: "Do you manage the ads yourself or train my team?",
        answer: "We run the system. Many clients hand it to us and we handle it month to month. Some want their team trained. We do both."
      },
      {
        id: "dg-8",
        question: "What happens if the leads dry up?",
        answer: "You see it the same week we do. Weekly reports, open data, no black box. If something underperforms we fix it or replace it fast."
      }
    ]
  },
  {
    slug: "paid-growth-engine",
    title: "Paid Growth System",
    subtitle: "Ads Not Converting?",
    badge: "Paid Growth System",
    description: "Spending on ads but not seeing sales? We find what is breaking and rebuild your Meta, Google and LinkedIn ads into one revenue system.",
    bestFor: "Businesses already spending on ads that are not paying off.",
    features: ["Meta", "Google", "LinkedIn", "Retargeting", "Tracking", "Testing"],
    cta: "Contact Us",
    iconName: "Target",
    iconColor: "rgba(100, 150, 255, 0.2)",
    headline: "Spending on Ads but Not Seeing It in Your Bank Account?",
    heroDescription: "Your dashboard shows clicks and reach. Your revenue shows nothing. The problem is rarely the ads themselves. It is the system around them. We rebuild it so every rupee you spend is tied to a real sale.",
    problems: [
      {
        title: "Spending Without a System",
        description: "Boosting posts and random campaigns with no structure. Money goes out. Nobody can prove what came back."
      },
      {
        title: "The Scaling Trap",
        description: "Returns look fine on a small budget, then collapse the moment you spend more. Cold traffic with stale creative kills the numbers."
      },
      {
        title: "No Tracking, No Truth",
        description: "Platform dashboards flatter themselves with clicks and reach. Without real tracking you cannot see which ad drove an actual sale."
      }
    ],
    systemSolutions: [
      {
        title: "One Connected Engine",
        description: "Targeting, creative, landing pages and tracking built to work together, not as separate parts."
      },
      {
        title: "Test and Scale on Data",
        description: "A weekly testing rhythm that finds winning ads early and scales them before they burn out."
      },
      {
        title: "Every Sale Traced",
        description: "Real attribution so budget moves toward what actually makes money, never toward vanity metrics."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We audit your ad account live on the call and show you exactly where budget is leaking before you decide anything."
      },
      {
        step: "02",
        title: "System Architecture",
        description: "We map the platforms, budget split, creative testing calendar and your target cost per lead, all agreed before launch. You see the whole plan first."
      },
      {
        step: "03",
        title: "Rebuild and Launch",
        description: "Tracking and attribution first. Then campaigns. Then the testing rhythm. Building in this order is why the system works and random ad management does not."
      },
      {
        step: "04",
        title: "Optimisation and Scaling",
        description: "Weekly optimisation on live data. Leads get worked fast, because businesses that respond within 5 minutes are 9X more likely to convert them. Monthly reporting on cost per lead and revenue, never impressions."
      }
    ],
    featureCards: [
      {
        title: "Platform Engine",
        description: "The right platforms for your buyer, not every platform at once. We build the targeting and campaign structure and manage it all against one number, your target cost to get a lead.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Creative and Testing Engine",
        description: "The hooks, angles and formats that stop the scroll, tested every week. Winners scale. Losers get cut fast before they waste budget.",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Conversion Layer",
        description: "The ad is half the job. The page it lands on is the other half. We align the page to the ad, then recapture everyone who did not buy with retargeting that runs on its own.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Attribution Engine",
        description: "Every sale traced to the exact ad, audience and creative that produced it. No more guessing. Budget follows proof.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "Finding the leak in an ad account",
      subtitle: "Rebuilt tracking, testing and scaling for a profitable ad engine.",
      overview: "Ecommerce brand on search ads, rebuilt into one tracked system. Real results from a system where every module runs together. 955 percent ROAS. Cost per lead stable as budget rose.",
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1200&q=80",
      client: "Growth Brand",
      quote: "We had no idea where our budget was going. Uptrix Technologies rebuilt the whole system and now every rupee is traced to a real customer.",
      metrics: [
        { label: "ROAS", value: "955%" },
        { label: "Monthly Spend", value: "$10K" },
        { label: "Cost Per Lead", value: "Stable" }
      ]
    },
    roiStats: [
      { label: "ROAS Achieved", value: "955%" },
      { label: "ROAS Multiple", value: "6X" }
    ],
    testimonials: [
      {
        quote: "We had no idea where our budget was going. Uptrix Technologies rebuilt the whole system and now every rupee is traced to a real customer.",
        author: "Growth Brand",
        role: "Founder",
        company: "Growth"
      }
    ],
    faqItems: [
      {
        id: "pg-1",
        question: "How much should I spend on ads monthly?",
        answer: "Enough to give the system data to optimise, and not a rupee more than your numbers support. On the roadmap call we work backward from your target cost per lead and tell you the realistic figure. If your budget cannot support paid ads yet, we say so honestly."
      },
      {
        id: "pg-2",
        question: "What is a good return on ad spend for my business?",
        answer: "It varies. Ecommerce usually needs three times spend or more to profit after costs. High margin services can win at two times. Lead based businesses measure cost per qualified lead instead. We benchmark your specific numbers on the call, not a figure that means nothing."
      },
      {
        id: "pg-3",
        question: "Should I hire an agency or a freelancer for my ads?",
        answer: "A freelancer manages a platform. This system needs platforms, creative testing, landing pages and tracking working together with one party accountable for revenue. That is the difference. Many clients came to us after two or three freelancers who each managed one piece."
      },
      {
        id: "pg-4",
        question: "How long until my ad performance improves?",
        answer: "Tracking fixes show cleaner data within days. Meaningful improvement usually lands within 30 to 45 days as the testing rhythm finds winners. Scaling comes after that, built on proof. We set exact expectations for your account before launch."
      },
      {
        id: "pg-5",
        question: "Do you work with small ad budgets?",
        answer: "Yes, if the budget matches realistic targets for your market. A small budget run inside a proper system beats a large budget run on autopilot. The roadmap call tells you honestly what your budget can and cannot achieve."
      },
      {
        id: "pg-6",
        question: "Which platforms are right for my business?",
        answer: "Wherever your buyer decides. Ecommerce brands usually win on Meta. Local services win on Google. Professional services win on search and LinkedIn. We pick the mix from your buyer data, not from what is fashionable this year."
      },
      {
        id: "pg-7",
        question: "How is Uptrix Technologies different from a regular ads agency?",
        answer: "A regular agency manages campaigns and reports on clicks. We run a revenue system with over 2.5M in spend managed behind our process, judged on one number you actually care about. Cost per lead, tied to real sales."
      },
      {
        id: "pg-8",
        question: "What if my ads still do not perform?",
        answer: "You will see it the same week we do. Weekly data reviews are open to you. Underperforming parts get fixed or replaced fast. We keep clients through results, not lock in contracts."
      }
    ]
  },
  {
    slug: "conversion-website-system",
    title: "Conversion Website System",
    subtitle: "Website Not Converting?",
    badge: "Conversion Website System",
    description: "Getting traffic but no enquiries? We design and build your site around one job. Turning the people who land on it into customers who contact you.",
    bestFor: "Businesses getting visitors who are not turning into enquiries. If nobody is visiting yet, the page is not your first problem.",
    features: ["Web Design", "Development", "Conversion Copy", "User Experience", "Conversion Optimisation", "Landing Pages", "Speed", "Lead Capture"],
    cta: "Contact Us",
    iconName: "Globe",
    iconColor: "rgba(80, 130, 255, 0.2)",
    headline: "Getting Visitors but No One Ever Reaches Out?",
    heroDescription: "A website that looks beautiful but never turns a visitor into an enquiry is a cost, not an asset. We design and build your site around one job. Turning the people who land on it into customers who contact you.",
    problems: [
      {
        title: "Built to Look Good, Not to Sell",
        description: "Pretty design with no clear path for the visitor to take the next step. Beauty does not convert."
      },
      {
        title: "No Clear Next Step",
        description: "Visitors arrive, get no reason to act and no obvious way to enquire, so they simply leave."
      },
      {
        title: "Slow and Confusing",
        description: "Pages that load slowly or confuse the visitor lose the sale in the first few seconds, before your offer is even seen."
      }
    ],
    systemSolutions: [
      {
        title: "Designed Around the Buyer",
        description: "Every page mapped to what your visitor needs to see to take the next step toward contacting you."
      },
      {
        title: "One Clear Path",
        description: "A single obvious journey on every page that leads the visitor to enquire, with no dead ends."
      },
      {
        title: "Fast and Frictionless",
        description: "Pages that load in seconds and remove every obstacle between the visitor and the contact form."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We review your current site live, find where visitors drop off and show you exactly why they are not converting."
      },
      {
        step: "02",
        title: "System Architecture",
        description: "We map every page, the journey on each, the copy and the conversion points, all agreed before any design begins. You see the full plan first."
      },
      {
        step: "03",
        title: "Design, Build and Launch",
        description: "We design, write, build and connect the whole site. Pages, copy, forms and lead capture, all wired to your follow up from day one."
      },
      {
        step: "04",
        title: "Optimisation and Scaling",
        description: "We keep testing what makes more visitors enquire. Speed matters too, because businesses that respond within 5 minutes are 9X more likely to convert a lead, so we wire fast capture into every form."
      }
    ],
    featureCards: [
      {
        title: "Conversion Design and Build",
        description: "We design and build your site from the ground up around one goal, turning visitors into enquiries. Clean, modern and structured so every page guides the visitor forward. Outcome: A website that looks credible and is built to move people to act.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Conversion Copy and Messaging",
        description: "Words that speak to your buyer, answer their doubts and lead them to the next step. The design pulls them in. The copy makes them stay and act. Outcome: Visitors who understand what you do and why they should contact you.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Experience and Optimisation",
        description: "We map the journey, remove friction and keep testing what makes more visitors enquire. The site gets better at converting over time, not worse. Outcome: A rising conversion rate, so more of the same traffic turns into leads.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Speed and Lead Capture",
        description: "Fast loading pages, clear forms and lead capture connected straight to your follow up. No visitor lost to a slow page or a clunky form. Outcome: Every interested visitor captured and sent into your pipeline instantly.",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80"
      }
    ],
    caseStudy: {
      title: "A site built to convert, not just to look good",
      subtitle: "Here is what happens when the website is built to convert, not just to look good.",
      overview: "3.21X ROAS on a D2C brand where the system included the landing pages the ads sent traffic to. Page and ad aligned. 1.9M views in 90 days for a service brand whose content engine sent traffic to pages built to capture it. Real estate account where landing pages held the conversion rate as traffic grew.",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80",
      client: "Growing Brands",
      quote: "We had traffic but nobody was reaching out. Once the site was built around one job, enquiries started coming the first week.",
      metrics: [
        { label: "ROAS", value: "3.21X" },
        { label: "Content Views", value: "1.9M" },
        { label: "Monthly Spend Scaled", value: "$10K" }
      ]
    },
    roiStats: [
      { label: "ROAS Delivered", value: "3.21X" },
      { label: "Views in 90 Days", value: "1.9M" }
    ],
    testimonials: [
      {
        quote: "We had traffic but nobody was reaching out. Once the site was built around one job, enquiries started coming the first week.",
        author: "Business Owner",
        role: "Founder",
        company: "Growing Brand"
      }
    ],
    faqItems: [
      {
        id: "cw-1",
        question: "How much does a high converting website cost?",
        answer: "It depends on the number of pages and the complexity of your offer. On the roadmap call we scope your site and give you a clear figure before any work starts. We price for the conversion outcome, not by the hour, so you know exactly what you are paying for."
      },
      {
        id: "cw-2",
        question: "Should I redesign my website or just optimise the one I have?",
        answer: "It depends on the foundation. If your current site is fast and well structured but underperforming, optimisation is faster and cheaper. If it is slow, dated or built wrong, a rebuild pays for itself. We tell you honestly which one your site needs on the call."
      },
      {
        id: "cw-3",
        question: "How long does a business website take to build?",
        answer: "A focused conversion site usually takes four to eight weeks depending on page count and content readiness. Landing pages can be faster. We give you an exact timeline in the architecture stage before design begins, so there are no surprises."
      },
      {
        id: "cw-4",
        question: "Why does my website get traffic but no enquiries?",
        answer: "Usually because the site was built to look good, not to convert. No clear next step, weak copy, slow pages or a confusing journey. Traffic is not the problem. The page is. We find the exact leak and fix it."
      },
      {
        id: "cw-5",
        question: "Will this work for my type of business?",
        answer: "If your buyers research or buy online, yes. We build conversion sites for ecommerce, local services, professional services, startups and regulated industries. The design changes by business. The goal of turning visitors into enquiries does not."
      },
      {
        id: "cw-6",
        question: "Do you only build new sites or improve existing ones?",
        answer: "Both. Sometimes the fastest win is optimising what you have. Sometimes a rebuild is the right call. We start by reviewing your current site and recommend the path that gets you more enquiries for the lowest sensible cost."
      },
      {
        id: "cw-7",
        question: "Do you write the copy too, or just design?",
        answer: "Both, together. Design and copy cannot be separated in a converting site. The design pulls the visitor in and the words move them to act. We handle both as one system, not as separate jobs handed to separate people."
      },
      {
        id: "cw-8",
        question: "What happens after the site launches?",
        answer: "The launch is the start, not the end. We keep testing what makes more visitors enquire and refine the pages on real data. A converting site gets better over time, and you see the conversion rate move month to month."
      }
    ]
  },
  {
    slug: "growth-foundation-system",
    title: "Growth Foundation System",
    subtitle: "No Marketing Strategy?",
    badge: "Growth Foundation System",
    description: "Wasting money on random marketing? We build your positioning, go to market plan and 90 day roadmap so every decision has a clear purpose.",
    bestFor: "Businesses at the very start of their marketing, whether planning or just launched. Not for businesses that already have a working marketing system.",
    features: ["Positioning", "Market and Competitor Research", "Channel Plan", "Funnel Design", "Budget Plan", "90 Day Roadmap"],
    cta: "Contact Us",
    iconName: "Compass",
    iconColor: "rgba(87, 148, 255, 0.2)",
    headline: "Not Sure Where to Start With Your Marketing?",
    heroDescription: "Whether you are still planning your business or you have just launched and feel invisible, the hardest part is the same. You do not know where to begin, and everyone gives different advice. We sit with you and build the plan, so every step has a reason behind it.",
    problems: [
      {
        title: "Too Much Conflicting Advice",
        description: "Every expert, course and agency says something different, so you never know who to trust or what to do first."
      },
      {
        title: "Random Spending",
        description: "Trying a bit of everything with no plan, watching the budget vanish with nothing to show for it."
      },
      {
        title: "No Clear Starting Point",
        description: "You know you need marketing but have no idea which step actually comes first for your business."
      }
    ],
    systemSolutions: [
      {
        title: "One Clear Plan",
        description: "A single roadmap built for your business, so you always know the next right move."
      },
      {
        title: "Spend With Purpose",
        description: "A budget plan that puts your money where it will actually work, in the right order."
      },
      {
        title: "A Real Starting Point",
        description: "Step one, step two, step three, mapped out, so you start with confidence instead of confusion."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We understand where you are, what you are building and what is making marketing feel overwhelming right now."
      },
      {
        step: "02",
        title: "Research and Discovery",
        description: "We dig into your market, your competitors and your customer, then bring back what we find. This is the groundwork your whole plan stands on."
      },
      {
        step: "03",
        title: "Build the Foundation Together",
        description: "In working sessions we shape your positioning, your channels and your budget together, so you understand every decision and why it was made."
      },
      {
        step: "04",
        title: "Roadmap Handoff",
        description: "We hand over your 90 day roadmap and walk you through it, step by step. You leave knowing exactly what to do next, and you can run it yourself or have us run it for you."
      }
    ],
    featureCards: [
      {
        title: "Discovery",
        description: "We start by understanding your business, your goals, your customer and what makes you different. You do the talking. We ask the questions that uncover what your marketing should be built on. You get: total clarity on where you stand and where you want to go.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Market and Competitor Research",
        description: "We research your market, study your competitors and find the gaps you can win in. This is the work most new founders cannot do alone, and it shapes everything that follows. You get: a clear picture of your market and where your opening is.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Positioning and Messaging",
        description: "We define who you are, who you serve and the exact words that make your buyer pay attention. You walk away knowing how to talk about your business with confidence. You get: your positioning and the core message you lead with everywhere.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Go To Market Plan",
        description: "Which channels to use first, why those channels, what to spend and what success looks like at 30, 60 and 90 days. A plan made for your business, not a template. You get: a clear channel and budget plan you can act on immediately.",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    caseStudy: {
      title: "Your Positioning",
      subtitle: "Who you are, who you serve and the words that make them listen. The foundation everything else is built on.",
      overview: "At the end of the engagement you do not have a vague strategy document. You have three things you can use the next morning. Your positioning statement, your go to market plan, and your 90 day roadmap. Built by a team that has managed over 2.5M in ad spend and guided businesses across global markets. You are not getting theory. You are getting a plan from people who have done it.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80",
      client: "Growing Brands",
      quote: "We built the foundation with Uptrix Technologies and then moved into their Demand Generation system to execute it.",
      metrics: [
        { label: "Deliverable", value: "Positioning" },
        { label: "Deliverable", value: "Go To Market Plan" },
        { label: "Deliverable", value: "90 Day Roadmap" }
      ]
    },
    roiStats: [
      { label: "Ad Spend Managed", value: "$2.5M+" },
      { label: "Businesses Guided", value: "Global" }
    ],
    testimonials: [
      {
        quote: "We built the foundation with Uptrix Technologies and it changed everything. Now we move into their execution systems with total clarity.",
        author: "Founder",
        role: "CEO",
        company: "Growing Brand"
      }
    ],
    faqItems: [
      {
        id: "gf-1",
        question: "How much does a marketing consultant cost?",
        answer: "It depends on the depth of the engagement. The Growth Foundation is a fixed scope project with a clear price, not an open ended hourly bill. On the call we tell you the exact figure before anything starts, so you know precisely what you are investing and what you get for it."
      },
      {
        id: "gf-2",
        question: "What should my marketing budget be?",
        answer: "That is one of the things we figure out together. The right budget depends on your business, your goals and your stage. We build a budget plan as part of your foundation, so you spend the right amount on the right channels in the right order, instead of guessing."
      },
      {
        id: "gf-3",
        question: "What is the difference between a marketing strategy and a marketing plan?",
        answer: "A strategy is the thinking, who you serve and how you win. A plan is the doing, the channels, budget and weekly actions. Most new businesses need both, and a foundation gives you both, connected. Strategy without a plan is just theory. A plan without strategy is just guessing."
      },
      {
        id: "gf-4",
        question: "I have not launched yet. Is this still for me?",
        answer: "Yes, this is one of the best times to do it. Building your foundation before you launch means you start right instead of wasting money fixing mistakes later. We help you enter the market with a clear plan from day one."
      },
      {
        id: "gf-5",
        question: "I just launched but have no marketing. Can you help?",
        answer: "Absolutely. If you are live but invisible, this gives you the plan you skipped at the start. We build your positioning and roadmap so you stop guessing and start growing with direction."
      },
      {
        id: "gf-6",
        question: "Do you just give me a plan, or do you run it too?",
        answer: "We build the plan with you, and you can take it from there yourself or have us run it. Many clients build the foundation with us and then move into our Demand Generation or Paid Growth systems to execute it. The choice is yours."
      },
      {
        id: "gf-7",
        question: "Will I understand the plan, or is it full of jargon?",
        answer: "You will understand all of it. We build it with you in plain language, not consultant speak. The whole point is that you walk away knowing your own plan and why every part of it is there, so you feel in control of your marketing."
      },
      {
        id: "gf-8",
        question: "How long does the engagement take?",
        answer: "Most foundations are completed within two to three weeks, depending on how quickly we can schedule the working sessions. You walk away with your positioning, your go to market plan and your 90 day roadmap ready to use."
      }
    ]
  },
  {
    slug: "ai-marketing-system",
    title: "AI Marketing System",
    subtitle: "Falling Behind in AI?",
    badge: "AI Marketing System",
    description: "Competitors using AI and you are not? We audit your marketing and implement AI systems that produce real revenue, not idle tools.",
    bestFor: "Businesses that know AI matters but have not put it to work in any real way. Not for businesses looking for a magic button.",
    features: ["AI Audit", "Workflow Automation", "AI Content", "AI Search Visibility", "AI Lead Scoring", "Tool Setup", "Team Training"],
    cta: "Contact Us",
    iconName: "Sparkles",
    iconColor: "rgba(96, 166, 255, 0.2)",
    headline: "Worried Your Competitors Are Winning With AI While You Watch?",
    heroDescription: "AI is not about collecting tools. It is about putting the right ones to work on the parts of your marketing that actually move revenue. We audit where AI will help you most, then build it into your business so it produces results, not just hype.",
    problems: [
      {
        title: "Too Many Tools, No Direction",
        description: "A new AI tool every week and no idea which ones actually matter for your business."
      },
      {
        title: "Falling Behind Quietly",
        description: "A growing worry that competitors are using AI to move faster while you stay stuck doing things manually."
      },
      {
        title: "Invisible in AI Search",
        description: "Buyers now ask ChatGPT and AI tools for recommendations, and your business is nowhere in the answers."
      }
    ],
    systemSolutions: [
      {
        title: "The Right Tools Only",
        description: "We find the few AI tools that move your revenue and ignore the rest, so you stop chasing every shiny new thing."
      },
      {
        title: "AI Built Into Your Work",
        description: "Automation and AI handed to you inside your actual workflow, producing real output, not sitting unused."
      },
      {
        title: "Visible Where Buyers Ask",
        description: "Your business optimised to show up and get recommended inside ChatGPT, Perplexity and AI search."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We look at your marketing and find where AI will genuinely help, and just as importantly, where it will not."
      },
      {
        step: "02",
        title: "AI Opportunity Map",
        description: "We audit your workflows, content and search presence and bring back a clear map of the highest impact AI moves for your business."
      },
      {
        step: "03",
        title: "Build and Implement",
        description: "We set up the tools, build the automations and content engine, and optimise your AI search visibility. Everything connected to how you already work."
      },
      {
        step: "04",
        title: "Train and Optimise",
        description: "We train you and your team so the system sticks, then keep improving it. AI search matters here, because AI driven search traffic tends to convert far higher than ordinary clicks."
      }
    ],
    featureCards: [
      {
        title: "AI Opportunity Audit",
        description: "We look at your whole marketing and find the few places where AI will actually save time or make money. No guessing, no chasing trends. A clear map of where AI fits your business. Outcome: A focused plan of the highest impact AI moves for your specific business.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Workflow Automation",
        description: "We automate the repetitive work that eats your week, from lead handling to reporting to content production, and set up the tools so they run inside how you already work. Outcome: Hours saved every week and fewer things done by hand.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "AI Content Engine",
        description: "We build a system that produces quality content faster using AI, guided by your brand and your buyer, so you publish more without burning out or losing your voice. Outcome: More content, produced faster, that still sounds like you.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "AI Search Visibility",
        description: "We optimise your business to be found and recommended inside ChatGPT, Perplexity and Google AI answers, where over half of buyers now begin their research. Outcome: Your business showing up and getting cited where buyers now ask.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    caseStudy: {
      title: "Put AI to work and scale content output without burning out",
      subtitle: "Uptrix Technologies built an AI content engine and search visibility system.",
      overview: "The client was overwhelmed by AI tools and falling behind. We audited their marketing, found the highest impact AI opportunities, built an automated content engine, and optimized them for AI search. Result: more content, less manual work, and visible where buyers now ask.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      client: "Growing Marketing Team",
      quote: "We finally know which AI actually matters. Uptrix Technologies cut through the noise and put AI to work in our actual workflow.",
      metrics: [
        { label: "Content Produced", value: "1.9M views" },
        { label: "Cost Per Lead", value: "$2.27" },
        { label: "Organic Reach", value: "385K views" }
      ]
    },
    roiStats: [
      { label: "Content Views in 90 Days", value: "1.9M" },
      { label: "Organic Reach Growth", value: "385K" }
    ],
    testimonials: [
      {
        quote: "We were drowning in AI tools that did nothing. Uptrix Technologies found the few that actually matter and built them into how we work.",
        author: "Growth Marketing Lead",
        role: "VP of Marketing",
        company: "Growth-Focused Brand"
      }
    ],
    faqItems: [
      {
        id: "ai-1",
        question: "What is GEO and does my business need it?",
        answer: "GEO means optimising your business to be found inside AI search tools like ChatGPT and Perplexity, the way SEO optimises you for Google. Over half of buyers now start research in AI tools, so if you sell to people who research before buying, yes, your business needs it."
      },
      {
        id: "ai-2",
        question: "How much do AI marketing services cost?",
        answer: "It depends on how much you want to implement. We scope your AI opportunities first and give you a clear figure before any work starts. We focus on the moves that pay for themselves in time saved or revenue earned, so the system is an investment, not a cost."
      },
      {
        id: "ai-3",
        question: "Which AI tools should my business use?",
        answer: "That depends entirely on your business, and the honest answer is far fewer than the internet suggests. Most businesses need a small set used well, not dozens used badly. We find the right few for you in the audit, so you stop wasting money on tools you do not need."
      },
      {
        id: "ai-4",
        question: "How do I get my business mentioned in ChatGPT?",
        answer: "By being the kind of clear, credible source AI tools pull from. We structure your content and online presence so AI engines can find, understand and cite you when buyers ask questions in your space. It is a growing channel, and early movers have a real advantage."
      },
      {
        id: "ai-5",
        question: "Will AI replace my marketing team?",
        answer: "No. AI makes good marketers faster, it does not replace strategy or judgement. The businesses winning with AI use it to do more with the people they have, not to remove them. We build AI around your team so they produce more, not so they disappear."
      },
      {
        id: "ai-6",
        question: "I tried AI tools and they did not help. Why would this be different?",
        answer: "Because tools alone do not work. Buying ChatGPT access is not a strategy. The difference is a system, the right tools chosen for your business, built into your workflow, with training so they actually stick. That is what turns AI from a novelty into a result."
      },
      {
        id: "ai-7",
        question: "Is my data safe with AI tools?",
        answer: "It depends on the tools and how they are set up. We choose tools and configurations that protect your data and your customers, which matters even more in regulated industries. Safe, compliant AI setup is part of how we build the system."
      },
      {
        id: "ai-8",
        question: "How long until AI starts helping my business?",
        answer: "Some wins, like automating a repetitive task, show up almost immediately. AI search visibility builds over a few months. We sequence the quick wins first so you feel the benefit early, then build the longer term advantages on top."
      }
    ]
  },
  {
    slug: "revenue-operations-system",
    title: "Revenue Operations System",
    subtitle: "Growth Hard to Manage?",
    badge: "Revenue Operations System",
    description: "Scaling but everything is breaking? We build RevOps systems that align sales and marketing so you grow without chaos or extra headcount.",
    bestFor: "Growing businesses whose systems cannot keep up. Not for businesses just starting out.",
    features: ["CRM Architecture", "Sales Process", "Marketing and Sales Alignment", "Lead Routing", "Automation", "Revenue Dashboards", "Pipeline Management"],
    cta: "Contact Us",
    iconName: "Layers",
    iconColor: "rgba(0, 102, 255, 0.2)",
    headline: "Growing Fast but Everything Feels Like It Is Breaking?",
    heroDescription: "More customers should feel like winning. Instead it feels like chaos. Leads slip through cracks, teams pull in different directions, and you are hiring more people without seeing more profit. We build the systems underneath your growth so it scales smoothly instead of breaking.",
    problems: [
      {
        title: "Leads Lost Between Teams",
        description: "Marketing hands off to sales and leads fall through the cracks, because nothing connects the two cleanly."
      },
      {
        title: "No Single Source of Truth",
        description: "Sales and marketing report different numbers and nobody knows which to trust, so decisions get made on guesses."
      },
      {
        title: "Hiring Instead of Fixing",
        description: "Throwing more people at a broken system, watching costs rise faster than profit."
      }
    ],
    systemSolutions: [
      {
        title: "Connected Teams and Tools",
        description: "Sales and marketing working from one system with leads routed cleanly, so nothing gets dropped."
      },
      {
        title: "One Clear View",
        description: "Dashboards everyone trusts, showing the real numbers, so decisions are made on facts not opinions."
      },
      {
        title: "Scale Without Chaos",
        description: "Systems and automation that let you handle more customers without hiring for every new problem."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Growth Roadmap Call",
        description: "60 minutes. We map how your business runs today and find exactly where growth is creating chaos and costing you money."
      },
      {
        step: "02",
        title: "Operations Audit and Architecture",
        description: "We map your tools, teams and processes, then design the system that connects them, all agreed before anything is built."
      },
      {
        step: "03",
        title: "Build and Connect",
        description: "We set up your central system, connect your tools, align your teams and build your dashboards. Everything wired together and working."
      },
      {
        step: "04",
        title: "Optimise and Scale",
        description: "We refine the system as you grow. Speed of response is part of it, because businesses that reach a lead within 5 minutes are 9X more likely to convert, so clean routing is built in."
      }
    ],
    featureCards: [
      {
        title: "CRM and Systems Architecture",
        description: "We design the central system that everything runs through, and connect your tools so your data lives in one place instead of scattered across spreadsheets and apps. Outcome: One clean system of record that your whole business runs on.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Sales and Marketing Alignment",
        description: "We define how leads move from marketing to sales, who owns what, and how handoffs happen, so leads stop falling through the cracks between teams. Outcome: Marketing and sales working as one engine, not two silos.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Automation and Workflows",
        description: "We automate the manual work that slows your team and creates errors, from data entry to routing to reporting, so your people spend time on what actually grows the business. Outcome: Less manual work, fewer mistakes, more time for real work.",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Dashboards and Forecasting",
        description: "We build the dashboards that show your real numbers in one place, so you can see what is working, forecast with confidence and make decisions on facts. Outcome: One clear view of your revenue that everyone trusts.",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    caseStudy: {
      title: "Consolidated siloed operations into one scaled system",
      subtitle: "Uptrix Technologies unified sales, marketing and operations.",
      overview: "The client was growing but losing leads between teams, had no unified pipeline view, and was hiring constantly to cover process gaps. We built a connected system with clean lead routing, unified dashboards and automated workflows. Result: more customers with existing team size.",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80",
      client: "Growing B2B SaaS",
      quote: "Everything was breaking as we scaled. Uptrix Technologies built the systems that let us grow without chaos.",
      metrics: [
        { label: "Ad Spend Managed", value: "$2.5M+" },
        { label: "Systems Built", value: "7 complete" },
        { label: "Pipeline Visibility", value: "100%" }
      ]
    },
    roiStats: [
      { label: "Revenue Managed", value: "$2.5M+" },
      { label: "ROAS Achieved", value: "6.0x" }
    ],
    testimonials: [
      {
        quote: "Growth itself was becoming the problem. Uptrix Technologies built the operational foundation that lets us scale smoothly.",
        author: "Operations Leader",
        role: "Chief Operating Officer",
        company: "Growing SaaS"
      }
    ],
    faqItems: [
      {
        id: "ro-1",
        question: "What is revenue operations and does my business need it?",
        answer: "Revenue operations is the system that connects your marketing, sales and tools so your business runs as one engine instead of disconnected parts. If you are growing and it feels like things are breaking or leads are getting lost, yes, you need it. If you are just starting out, you need leads first."
      },
      {
        id: "ro-2",
        question: "How much does revenue operations consulting cost?",
        answer: "It depends on the size and complexity of your business and systems. We scope your operations first and give you a clear figure before any work starts. The system usually pays for itself by recovering lost leads and saving the cost of hires you would otherwise need to make."
      },
      {
        id: "ro-3",
        question: "How can I scale my business without hiring more people?",
        answer: "By fixing the system instead of adding bodies to a broken one. Most growing businesses hire to cover for manual work and dropped leads. We automate that work and connect your teams, so you handle more customers with the people you already have. Hiring becomes a choice, not a patch."
      },
      {
        id: "ro-4",
        question: "My sales and marketing teams blame each other. Can you fix that?",
        answer: "Yes, and it is one of the most common reasons businesses come to us. The blame usually comes from no shared system and no agreement on who owns what. We define the handoff, connect the tools and build one set of numbers both teams trust, so they work together instead of against each other."
      },
      {
        id: "ro-5",
        question: "What does a revenue operations system actually include?",
        answer: "Your central system and connected tools, a clear sales process, aligned marketing and sales handoffs, clean lead routing, automation of manual work, and dashboards that show your real numbers. Together they let your business scale smoothly instead of breaking as you grow."
      },
      {
        id: "ro-6",
        question: "Will this work with the tools I already use?",
        answer: "Usually yes. We work with your existing tools wherever they are right for you, and only recommend changes where something is genuinely holding you back. The goal is to connect and improve what you have, not to force an expensive rebuild you do not need."
      },
      {
        id: "ro-7",
        question: "How long does it take to build?",
        answer: "It depends on the complexity of your business, but most systems are built and connected within four to eight weeks. We sequence it so you feel relief early, fixing the most painful bottleneck first, then building the full system around it."
      },
      {
        id: "ro-8",
        question: "Is this only for big companies?",
        answer: "No. Any business growing fast enough that its systems are straining can benefit, often well before it feels big. The earlier you build the operational foundation, the smoother your scaling will be. Fixing it early is far cheaper than fixing it in crisis."
      }
    ]
  }
];

export const SOLUTIONS_BY_SLUG: Record<string, SolutionConfig> = Object.fromEntries(
  SOLUTIONS.map((s) => [s.slug, s])
);
