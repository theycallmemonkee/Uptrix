import { Resend } from "resend";

const CONTACT_FROM = "Uptrix <onboarding@resend.dev>";
/** Temporary: all submissions go here until production domain is verified in Resend. */
const CONTACT_TO = "mehtay393@gmail.com";

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
  const from = CONTACT_FROM;
  const to = [CONTACT_TO];

  console.info("[contact/email] Resend send attempt", { from, to });

  const result = await resend.emails.send({
    from,
    to,
    replyTo: params.email,
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

  if (result.error) {
    console.error("[contact/email] Resend error", {
      name: result.error.name,
      message: result.error.message,
      statusCode: "statusCode" in result.error ? result.error.statusCode : undefined,
      error: result.error,
    });
    return { ok: false as const, error: result.error };
  }

  console.info("[contact/email] Resend response", result.data);
  return { ok: true as const, data: result.data };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
