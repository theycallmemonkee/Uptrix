import type { Metadata } from "next";
import ContactUsPage from "@/app/contact-us/page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uptrix Technologies. Share your goals and our team will respond with a tailored growth strategy within 24 hours.",
  alternates: { canonical: "/contact-us" },
};

export default ContactUsPage;
