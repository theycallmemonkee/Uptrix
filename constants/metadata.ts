export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uptrixtechnologies.com";

export const DEFAULT_SEO = {
  title: "Uptrix Technologies | AI Powered Growth Systems Partner",
  description: "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  openGraph: {
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description: "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/Uptrix.png", width: 1200, height: 630, alt: "Uptrix Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptrix Technologies | AI Powered Growth Systems Partner",
    description: "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
    images: ["/Uptrix.png"],
  },
};
