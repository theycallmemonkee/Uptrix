import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      description: 'Small badge above headline (e.g. "AI Powered Growth Systems Partner")',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (full, for reference)',
      type: 'string',
      description: 'Full headline e.g. "Marketing Feels Broken?" — used as reference only',
    }),
    defineField({
      name: 'heroHeadlinePart1',
      title: 'Hero Headline — Line 1',
      type: 'string',
      description: 'First line before the highlighted word (e.g. "Marketing Feels")',
    }),
    defineField({
      name: 'heroHeadlineHighlight',
      title: 'Hero Headline — Highlighted Word',
      type: 'string',
      description: 'The word shown in the highlighted/glowing box (e.g. "Broken?")',
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body Copy',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Hero Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'heroCta1Href',
      title: 'Hero Primary CTA URL',
      type: 'string',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Hero Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'heroCta2Href',
      title: 'Hero Secondary CTA URL',
      type: 'string',
    }),
    defineField({
      name: 'heroMetricBadge',
      title: 'Hero Metric Badge',
      type: 'string',
      description: 'Small stat badge below CTAs (e.g. "3.21X ROAS Delivered On D2C campaigns")',
    }),
    defineField({
      name: 'heroSocialProofText',
      title: 'Hero Social Proof Text',
      type: 'string',
      description: 'Text below star rating (e.g. "Trusted by growing brands worldwide")',
    }),

    // ── AI / Why Section ──────────────────────────────────────
    defineField({
      name: 'aiSectionEyebrow',
      title: 'Why Uptrix Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'aiSectionHeadline',
      title: 'Why Uptrix Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'aiSectionBody',
      title: 'Why Uptrix Section Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aiSectionCtaLabel',
      title: 'Why Uptrix CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'aiSectionCtaHref',
      title: 'Why Uptrix CTA URL',
      type: 'string',
    }),

    // ── Problem Router Cards ──────────────────────────────────
    defineField({
      name: 'problemCards',
      title: 'Problem / Solution Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'problem', title: 'Problem (headline)', type: 'string' },
            { name: 'solution', title: 'Solution Name', type: 'string' },
            { name: 'description', title: 'Card Description', type: 'text', rows: 2 },
            { name: 'href', title: 'Link URL', type: 'string' },
          ],
          preview: {
            select: { title: 'problem', subtitle: 'solution' },
          },
        },
      ],
    }),

    // ── Industries Strip ──────────────────────────────────────
    defineField({
      name: 'industriesEyebrow',
      title: 'Industries Section Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'industriesHeadline',
      title: 'Industries Section Headline',
      type: 'string',
    }),
    defineField({
      name: 'industriesBody',
      title: 'Industries Section Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'industries',
      title: 'Industry Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
