import type { Metadata } from "next";
import { getContactPage, getGlobalSettings } from "@/lib/sanity";
import { ContactUsClient } from "@/components/contact-us/contact-us-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uptrix Technologies. Share your goals and our team will respond with a tailored growth strategy within 24 hours.",
};

export default async function ContactUsPage() {
  const [contactData, globalSettings] = await Promise.all([
    getContactPage(),
    getGlobalSettings(),
  ]);

  return <ContactUsClient contactData={contactData} globalSettings={globalSettings} />;
}
