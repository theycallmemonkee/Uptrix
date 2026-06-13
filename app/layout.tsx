import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LoadingScreen } from "@/components/providers/loading-screen";
import { ScrollProgress } from "@/components/providers/scroll-progress";

export const metadata: Metadata = {
  title: {
    default: "Uptrix Technologies — AI-Powered Digital Marketing Agency",
    template: "%s | Uptrix Technologies",
  },
  description:
    "India's leading AI-powered digital marketing agency. We build precision AI SEO, PPC automation, social media, and branding systems for enterprise-scale growth.",
  metadataBase: new URL("https://uptrixtechnologies.com"),
  openGraph: {
    siteName: "Uptrix Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQVW8VT8" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        {/* Global providers — order matters */}
        <LenisProvider />
        <ScrollProgress />
        <LoadingScreen />
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
