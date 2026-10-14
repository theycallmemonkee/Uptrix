// Must match the title.template suffix in app/layout.tsx.
const BRAND_SUFFIX = " | Uptrix Technologies";
const MAX_TITLE_LENGTH = 60;

/**
 * Appends the brand suffix only when the full title still fits in Google's
 * ~60 char display; otherwise renders the title alone so it isn't truncated.
 */
export function seoTitle(title: string): string | { absolute: string } {
  return title.length + BRAND_SUFFIX.length <= MAX_TITLE_LENGTH ? title : { absolute: title };
}
