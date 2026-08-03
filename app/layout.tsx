import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollRestoration } from "@/components/scroll-restoration";

// ── Typography ──────────────────────────────────────────────────────────────
// Caveat removed — it was loaded but never referenced in active components.
// Adding it back is a one-liner when needed.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

// ── Global metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Uptrix Technologies | AI Powered Growth Systems Partner",
    template: "%s | Uptrix Technologies",
  },
  description:
    "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  metadataBase: new URL("https://uptrixtechnologies.com"),
  alternates: { canonical: "https://uptrixtechnologies.com" },
  openGraph: {
    siteName: "Uptrix Technologies",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uptrix Technologies — AI Powered Growth Marketing Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@uptrixtechnologies",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4fTWd9X25lUEgqKMjkQfFuzMjLKz4qnWtBKEPE-jxEg",
  },
};

// ── JSON-LD structured data ─────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uptrix Technologies",
  url: "https://uptrixtechnologies.com",
  logo: "https://uptrixtechnologies.com/Uptrix.png",
  description:
    "Uptrix Technologies is a growth marketing company. One team owns your brand, marketing and performance from first strategy call to scale.",
  sameAs: [
    "https://www.facebook.com/uptrixtechnologies",
    "https://www.instagram.com/uptrixtechnologies",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uptrix Technologies",
  url: "https://uptrixtechnologies.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://uptrixtechnologies.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ── Root layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to external origins used above the fold */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* GTM noscript fallback — must be first child of body */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQVW8VT8" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />

        <ScrollRestoration />
        {children}

        {/* GTM — afterInteractive: runs after Next.js hydration, non-blocking */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MQVW8VT8');`,
          }}
        />

        {/* Cloudflare Turnstile — lazyOnload: loads after page is interactive */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
