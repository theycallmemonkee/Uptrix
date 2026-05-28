import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient() {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Missing required environment variable: RESEND_API_KEY");
  resendClient = new Resend(apiKey);
  return resendClient;
}

export async function sendContactNotificationEmail(params: {
  name: string;
  email: string;
  message: string;
  timestampIso: string;
}) {
  const resend = getResendClient();
  const to = ["meenakshimehta07303@gmail.com", "mehtay393@gmail.com", "connect@uptrixtechnologies.com"];
  const from = process.env.CONTACT_FROM_EMAIL ?? "Uptrix Contact <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: "New Uptrix Contact Form Submission",
    text: [
      "New contact form submission",
      "",
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      `Timestamp: ${params.timestampIso}`,
      "",
      "Message:",
      params.message,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin-bottom:12px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(params.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
        <p><strong>Timestamp:</strong> ${escapeHtml(params.timestampIso)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${escapeHtml(
          params.message,
        )}</pre>
      </div>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
