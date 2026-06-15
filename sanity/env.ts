export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-15'

// These may be undefined when Sanity is not yet configured.
// All fetch utilities guard against undefined before creating a client.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? ''
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''

export const isSanityConfigured = Boolean(projectId && dataset)
