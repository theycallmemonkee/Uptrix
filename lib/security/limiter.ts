const ipTracker = new Map<string, number[]>();
const emailTracker = new Map<string, number>();

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Checks rate limits for a given client IP and email target.
 * Constraints:
 * 1. Rapid repeated submissions: Block if last submission was < 10s ago from this IP/email.
 * 2. Hourly limit: Max 3 submissions per IP per hour.
 * 3. Daily limit: Max 10 submissions per IP per day (24 hours).
 */
export function checkRateLimit(ip: string, email: string): RateLimitResult {
  // Relax rate limiting in local development to allow testing forms without lockouts
  if (process.env.NODE_ENV === "development") {
    return { allowed: true };
  }

  const now = Date.now();

  // Clean email input to avoid whitespace anomalies
  const cleanEmail = email.trim().toLowerCase();

  // 1. Rapid submission by same email
  const lastEmailTime = emailTracker.get(cleanEmail);
  if (lastEmailTime && now - lastEmailTime < 10000) {
    return {
      allowed: false,
      reason: "Please wait 10 seconds before submitting another request.",
    };
  }

  // 2. IP History checking
  const timestamps = ipTracker.get(ip) ?? [];

  // Filter out timestamps older than 24 hours to prevent memory leaks
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const freshTimestamps = timestamps.filter((ts) => ts > oneDayAgo);

  // Rapid submission by same IP
  const lastIpTime = freshTimestamps[freshTimestamps.length - 1];
  if (lastIpTime && now - lastIpTime < 10000) {
    return {
      allowed: false,
      reason: "Please wait 10 seconds before submitting another request.",
    };
  }

  // Hourly check: Max 3 submissions per IP per hour
  const oneHourAgo = now - 60 * 60 * 1000;
  const hourlySubmissions = freshTimestamps.filter((ts) => ts > oneHourAgo);
  if (hourlySubmissions.length >= 3) {
    return {
      allowed: false,
      reason: "Too many requests. You can submit up to 3 times per hour. Please try again later.",
    };
  }

  // Daily check: Max 10 submissions per IP per day
  if (freshTimestamps.length >= 10) {
    return {
      allowed: false,
      reason: "Daily submission limit reached. You can submit up to 10 forms per day. Please contact us directly if this is urgent.",
    };
  }

  // Allow and track
  freshTimestamps.push(now);
  ipTracker.set(ip, freshTimestamps);
  emailTracker.set(cleanEmail, now);

  return { allowed: true };
}
