type SecurityEventType =
  | "SPAM_ATTEMPT"
  | "RATE_LIMIT_VIOLATION"
  | "INVALID_CAPTCHA"
  | "BLOCKED_REQUEST"
  | "SUSPICIOUS_LEAD"
  | "UNAUTHORIZED_ACCESS"
  | "SYSTEM_AUDIT";

interface SecurityLogParams {
  type: SecurityEventType;
  ip?: string;
  email?: string;
  details?: Record<string, any>;
  path?: string;
  requestId?: string;
}

/**
 * Standardized security logger for auditable JSON output.
 * In production environments (like Vercel, AWS CloudWatch, Datadog),
 * stdout/stderr JSON structures are automatically parsed and indexed.
 */
export function logSecurityEvent({
  type,
  ip = "unknown",
  email = "N/A",
  details = {},
  path = "N/A",
  requestId = "N/A",
}: SecurityLogParams) {
  const timestamp = new Date().toISOString();
  const logMessage = {
    timestamp,
    level: "SECURITY",
    type,
    ip,
    email,
    path,
    requestId,
    details,
  };

  // Ensure security alerts stand out in the server log streams
  console.warn(`[SECURITY_ALERT] ${JSON.stringify(logMessage)}`);
}
