/**
 * A static set of popular disposable/temporary email domains.
 * Checked in a case-insensitive manner.
 */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "trashmail.com",
  "sharklasers.com",
  "guerrillamail.com",
  "dispostable.com",
  "getairmail.com",
  "generator.email",
  "maildrop.cc",
  "boun.cr",
  "mytrashmail.com",
  "tempmailaddress.com",
  "crazymailing.com",
  "throwawaymail.com",
  "mailnesia.com",
  "mailcatch.com",
  "dropmail.me",
]);

/**
 * Returns true if the email domain matches a known disposable email provider.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const parts = email.trim().split("@");
  if (parts.length < 2) return false;
  const domain = parts[parts.length - 1].toLowerCase();
  return DISPOSABLE_DOMAINS.has(domain);
}
