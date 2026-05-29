/**
 * Server-side environment variable helpers.
 *
 * Read timing (Next.js on Vercel):
 * - API routes / Server Components: `process.env` is read at **request runtime** in the serverless function.
 * - `NEXT_PUBLIC_*` client bundles: inlined at **build time** only (not used by /api/* routes).
 *
 * Configure variables in: Vercel → Project → Settings → Environment Variables
 * (Project-level vars apply to this app. Team Shared Variables also work if linked to the project.)
 * After adding or changing vars, **redeploy** — existing deployments do not pick up new values.
 */

export const SERVER_ENV_KEYS = {
  /** Required for /api/contact email delivery */
  RESEND_API_KEY: "RESEND_API_KEY",
  /** Optional — database storage for contact submissions */
  NEXT_PUBLIC_SUPABASE_URL: "NEXT_PUBLIC_SUPABASE_URL",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  SUPABASE_SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY",
  /** Optional site URL override */
  NEXT_PUBLIC_SITE_URL: "NEXT_PUBLIC_SITE_URL",
} as const;

export type ServerEnvKey = keyof typeof SERVER_ENV_KEYS;

const REQUIRED_FOR_CONTACT_EMAIL: ServerEnvKey[] = ["RESEND_API_KEY"];

const OPTIONAL_FOR_CONTACT: ServerEnvKey[] = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

/** True if the variable is a non-empty string (never logs the value). */
export function isEnvSet(name: string): boolean {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0;
}

export function getMissingRequiredForContact(): ServerEnvKey[] {
  return REQUIRED_FOR_CONTACT_EMAIL.filter((key) => !isEnvSet(SERVER_ENV_KEYS[key]));
}

export function hasSupabaseServerEnv(): boolean {
  return (
    isEnvSet(SERVER_ENV_KEYS.NEXT_PUBLIC_SUPABASE_URL) &&
    isEnvSet(SERVER_ENV_KEYS.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    isEnvSet(SERVER_ENV_KEYS.SUPABASE_SERVICE_ROLE_KEY)
  );
}

export function isContactEmailReady(): boolean {
  return getMissingRequiredForContact().length === 0;
}

/** Safe audit for debug endpoints — boolean presence only, no secret values. */
export function getServerEnvAudit() {
  const allKeys = Object.values(SERVER_ENV_KEYS);
  const present = Object.fromEntries(allKeys.map((key) => [key, isEnvSet(key)])) as Record<
    ServerEnvKey,
    boolean
  >;

  const missingRequired = getMissingRequiredForContact();

  return {
    present,
    required: {
      forContactEmail: REQUIRED_FOR_CONTACT_EMAIL,
      missing: missingRequired,
      ready: missingRequired.length === 0,
    },
    optional: {
      forContactDatabase: OPTIONAL_FOR_CONTACT,
      supabaseReady: hasSupabaseServerEnv(),
    },
    meta: {
      /** Server API routes always read env at request runtime */
      readPhase: "runtime" as const,
      nodeEnv: process.env.NODE_ENV ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      vercelUrl: process.env.VERCEL_URL ?? null,
      vercelRegion: process.env.VERCEL_REGION ?? null,
    },
    guidance: {
      whereToSet:
        "Vercel → Project → Settings → Environment Variables (enable Production, Preview, Development)",
      teamSharedVariables:
        "Team Shared Variables work if attached to this project; otherwise use project-level vars.",
      afterChange: "Redeploy required after adding or updating environment variables.",
    },
  };
}
