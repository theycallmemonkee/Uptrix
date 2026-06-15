/**
 * CSRF protection: verify request Origin or Referer against the Host header.
 */
export function verifyCsrf(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  if (!origin && !referer) {
    return false; // Reject requests with no origin/referer (typical of programmatic bot tools)
  }

  try {
    if (origin) {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return false;
      }
    } else if (referer) {
      const refererHost = new URL(referer).host;
      if (refererHost !== host) {
        return false;
      }
    }
  } catch (err) {
    return false; // Catch malformed URLs
  }

  return true;
}

/**
 * XSS prevention: strips script and HTML tags from string inputs.
 */
export function sanitizeInput(str: string): string {
  if (!str || typeof str !== "string") return str;
  return str
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "") // Remove scripts
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .trim();
}

/**
 * Gibberish/Keysmash detector to filter out fake submissions.
 * Checks for:
 * 1. Very low vowel density (e.g. "sdfghjk")
 * 2. Repeating consonant strings
 * 3. Repetitive characters (e.g. "aaaaa")
 */
export function isGibberish(text: string): boolean {
  if (!text || text.trim().length < 5) return false;
  const clean = text.replace(/[^a-zA-Z]/g, "");
  if (clean.length < 5) return false;

  // Repetitive letters (e.g. "aaaaa")
  if (/(.)\1{4,}/.test(clean.toLowerCase())) {
    return true;
  }

  // Common keyboard keysmash patterns
  const keysmashes = [
    /asdf/i,
    /sdfg/i,
    /dfgh/i,
    /fghj/i,
    /ghjk/i,
    /hjkl/i,
    /qwerty/i,
    /werty/i,
    /zxcv/i,
    /xcvb/i,
    /cvbn/i,
    /vbnm/i,
  ];
  for (const regex of keysmashes) {
    if (regex.test(clean)) {
      return true;
    }
  }

  // Low vowel density (typical indicator of keysmashes like "qwrthgfds")
  const vowels = clean.match(/[aeiouyAEIOUY]/g);
  const vowelCount = vowels ? vowels.length : 0;
  const vowelDensity = vowelCount / clean.length;

  if (clean.length > 8 && vowelDensity < 0.12) {
    return true;
  }

  return false;
}

/**
 * E.164 standard phone validator.
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  // Strip spaces, dashes, brackets
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  return /^\+?[1-9]\d{1,14}$/.test(cleanPhone);
}
