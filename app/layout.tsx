import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/providers/custom-cursor";
import { LoadingScreen } from "@/components/providers/loading-screen";
import { ScrollProgress } from "@/components/providers/scroll-progress";

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
        <CustomCursor />
        <LoadingScreen />
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
