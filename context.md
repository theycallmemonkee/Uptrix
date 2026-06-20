# Uptrix Rebuild — Session Context

## What was done in this chat

---

### 1. Homepage Hero — Replaced with Premium "REAL RESULTS" Design
**File:** `components/cinematic-hero.tsx`

Replaced the original two-column hero with a new centered-left design:
- **Headline:** REAL RESULTS. / REAL GROWTH. / REAL SYSTEMS. (stacked, 96px, weight 800)
- "REAL SYSTEMS." has blue gradient (#9CC0FF → #4B7FFF)
- Right column replaced with ambient particles, twinkling stars, depth orbs — no images
- Buttons: "VIEW CASE STUDIES ↓" + "BOOK FREE CONSULTATION ↗"
- Stars + "Trusted by growth-focused brands worldwide" below buttons

---

### 2. Homepage Hero — RESTORED to Original
**File:** `components/cinematic-hero.tsx`

The user asked to undo step 1 and restore the original design (reference screenshot provided).

Restored via `git show 4bacdbb:components/cinematic-hero.tsx`:
- Two-column layout (left text + right image card)
- Headline: "Marketing Feels / Broken?" with glass pill highlight on "Broken?"
- Subheadline: "Most businesses stitch together random tactics..."
- Buttons: "Contact Us →" + "Find Your System →"
- Right side: large rounded image card (Unsplash team photo) with cinematic blue overlay
- Floating metric card: 3.21X ROAS Delivered (bottom-left of image)
- Avatar group + ★★★★★ + "Trusted by growing brands worldwide"
- Mouse-reactive glow, animated grid, 3D tilt on image card

**Current state of cinematic-hero.tsx = original pre-session version.**

---

### 3. Metrics & Logo Strip — Reordered
**File:** `components/trusted-companies.tsx`

Changed order from:
1. Logo slider
2. Metrics ($2.5M+, 3.21x, 955%, 50+)

To:
1. Metrics first
2. Logo slider second (80px below)

Other changes:
- Separator line: `border-white/8` → `border-white/[0.05]` (more subtle)
- Added `items-center` to metrics grid for vertical alignment
- `mt-20` (80px) gap between metrics and logo strip

---

### 4. Portfolio Hero — Rebuilt (Centered Premium Style)
**File:** `components/portfolio/portfolio-hero.tsx`

Replaced the old two-column layout (with dashboard screenshot + floating metric cards) with a centered premium hero:
- Badge: ✦ PORTFOLIO
- Headline: "Real Campaigns. / Real Results. / Real Growth." — last line gets #9CC0FF → #5A8FFF gradient
- 96px desktop, weight 800, line-height 0.92, tracking -0.05em
- Subheadline about Uptrix services
- Buttons: "View Case Studies ↗" (primary blue) + "Book Free Consultation ↗" (ghost)
- ★★★★★ + "Trusted by growth-focused brands worldwide"
- Background: 80 twinkling stars (deterministic), FloatingParticles, pulsing radial blue glow
- Removed: dashboard screenshots, browser mockup, all 4 floating stat badges, image rotation timer

---

### 5. Portfolio Showcase — First Redesign (Glass Cards with Lightbox)
**File:** `components/portfolio/portfolio-showcase.tsx`

Replaced the tab-filtered showcase with 5 vertical glass cards (one per category):
- Alternating image-left / content-right layout
- Each card: `rounded-[32px]`, dark gradient bg, `border-white/[0.07]`, blue ambient glow
- Content: category badge, client name, "Overcoming Challenges..." subhead, takeaway bullets, 3 metrics, CTA
- Image: featured image + thumbnail strip + fullscreen lightbox (dot nav, keyboard arrows)
- Website Development block: 3×3 grid of all 9 website screenshots

Categories used:
1. Moderna Health Technologies (AI SEO) — ai-seo/5.png
2. Creda Global FinTech (Google Ads) — google-ads/4.jpg
3. LuxeWear Premium Retail (Meta Ads) — meta-ads/4-dashboard.jpg
4. Apex Fitness Platforms (Social Media) — social/4-dashboard.jpg
5. Uptrix Technologies Portfolio (Websites) — 3×3 grid of all website screenshots

---

### 6. Portfolio Showcase — Second Redesign (17 Individual Project Blocks)
**File:** `components/portfolio/portfolio-showcase.tsx`

Complete rewrite. User wanted every image = one independent project section (Ramotion-style).

**17 project blocks, zero sliders/carousels/lightboxes:**

| # | Client | Category | Image |
|---|--------|----------|-------|
| 1 | Toplimo | SEO | ai-seo/5.png — **full-width hero block** |
| 2 | MSG Canada Insurance | SEO | ai-seo/6.png |
| 3 | Affinoz | SEO | ai-seo/7.png |
| 4 | Avant Pharmacy | SEO | ai-seo/8.png |
| 5 | DotNetTricks | SEO | ai-seo/9.png |
| 6 | Creda Global FinTech | Google Ads | google-ads/4.jpg |
| 7 | LuxeWear Premium Retail | Meta Ads | meta-ads/4-dashboard.jpg |
| 8 | Apex Fitness Platforms | Social Media | social/4-dashboard.jpg |
| 9 | Jazzo Store | Website | websites/jazzo.jpg |
| 10 | Big Blare Innovations | Website | websites/bigblare.jpg |
| 11 | Vastra Store | Website | websites/vastra.jpg |
| 12 | Vodaiq | Website | websites/vodaiq.jpg |
| 13 | Klevrax | Website | websites/klevrax.jpg |
| 14 | Uptrix Technologies | Website | websites/uptrix.jpg |
| 15 | Ecofitz | Website | websites/ecofitz.jpg |
| 16 | Lebodee | Website | websites/lebodee.jpg |
| 17 | T-Adda | Website | websites/t-adda.jpg |

**Layout:**
- Block 1 (Toplimo): Full-bleed 21:8 hero image, gradient overlay, content anchored bottom-left
- Blocks 2–17: 50/50 alternating split — odd index = image left, even = content left
- Each card: `rounded-[32px]`, dark bg, subtle border, side-specific blue glow

**Each block contains:**
- Animated pulse badge (e.g. "SEO Portfolio")
- Large client name heading
- Short description paragraph
- 4 achievement bullet points (• style)
- 3-stat row (value + label)
- "View Case Study →" blue CTA button

---

## Current File States

| File | Status |
|------|--------|
| `components/cinematic-hero.tsx` | Restored to original (two-column, "Marketing Feels Broken?") |
| `components/trusted-companies.tsx` | Modified — metrics above logo strip, 80px gap, subtler border |
| `components/portfolio/portfolio-hero.tsx` | Rebuilt — centered, ✦ PORTFOLIO badge, 3-line headline |
| `components/portfolio/portfolio-showcase.tsx` | Rebuilt — 17 individual project blocks, no slider |

---

## Project Structure Reference

```
/components
  cinematic-hero.tsx          ← Homepage hero
  trusted-companies.tsx        ← Metrics + logo strip
  /portfolio
    portfolio-hero.tsx         ← Portfolio page hero
    portfolio-showcase.tsx     ← 17 project blocks (current)
    portfolio-cta.tsx
    portfolio-preview.tsx
    case-study-client.tsx
    website-showcase.tsx

/data
  portfolio-data.ts            ← 5 case study definitions (AI SEO, Google Ads, Meta Ads, Social, Websites)
  website-data.ts              ← 9 website project definitions

/public/portfolio
  /ai-seo/     5.png–10.png   (6 analytics screenshots)
  /google-ads/ 4.jpg–13.jpg   (10 dashboard/report screenshots)
  /meta-ads/   3.jpg, 5.jpg, 3-dashboard.jpg, 4-dashboard.jpg × 5  (8 images)
  /social/     4.jpg, 6–10.jpg, 4-dashboard.jpg  (7 images)
  /websites/   jazzo, bigblare, vastra, vodaiq, klevrax, uptrix, ecofitz, lebodee, t-adda  (9 screenshots)
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **CMS:** Sanity (integrated, schemas exist)
- **Language:** TypeScript
- **Images:** Next.js `<Image>` with remote Unsplash + local `/public/portfolio/`

---

## Build Status

All changes verified with `npm run build` — passes clean with 37 static pages generated.
