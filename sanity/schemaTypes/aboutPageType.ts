import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Page Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroBody',
      title: 'Page Body',
      type: 'text',
      rows: 3,
    }),

    // ── Stats counters ────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats (Animated Counters)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. "99%", "150+")', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      validation: (r) => r.max(4),
    }),

    // ── Company values ────────────────────────────────────────
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'iconName', title: 'Icon Name (lucide)', type: 'string', description: 'e.g. Target, Zap, Globe, TrendingUp' },
            { name: 'title', title: 'Value Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),

    // ── Timeline ──────────────────────────────────────────────
    defineField({
      name: 'timeline',
      title: 'Company Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'title', title: 'Milestone Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'year', subtitle: 'title' } },
        },
      ],
    }),

    // ── Enterprise Stats ──────────────────────────────────────
    defineField({
      name: 'enterpriseStats',
      title: 'Enterprise Stats (bottom bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. "2.5M+")', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),

    // ── Portfolio Showcase ────────────────────────────────────
    defineField({
      name: 'portfolioShowcase',
      title: 'Portfolio Showcase Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string' },
            { name: 'description', title: 'Card Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
