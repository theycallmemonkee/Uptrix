import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import { ScrollRestoration } from "@/components/scroll-restoration";

export const metadata: Metadata = {
  title: {
    default: "Uptrix Technologies | AI Powered Growth Systems Partner",
    template: "%s | Uptrix Technologies",
  },
  description:
    "Uptrix Technologies builds AI powered growth systems that bring you leads, convert customers and scale revenue. Your growth partner, not another agency.",
  metadataBase: new URL("https://uptrixtechnologies.com"),
  openGraph: {
    siteName: "Uptrix Technologies",
    type: "website",
    images: [{ url: "/Uptrix.png", width: 1200, height: 630, alt: "Uptrix Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/Uptrix.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MQVW8VT8');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="google-site-verification" content="4fTWd9X25lUEgqKMjkQfFuzMjLKz4qnWtBKEPE-jxEg" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQVW8VT8" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
