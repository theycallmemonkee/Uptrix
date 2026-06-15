import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    // ── Identity ───────────────────────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Must match the URL: seo, social-media, ppc, branding, ai-ugc-video-ads, business-automation',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortLabel',
      title: 'Short Label (nav)',
      type: 'string',
    }),
    defineField({
      name: 'cardCategory',
      title: 'Card Category Tag',
      type: 'string',
    }),
    defineField({
      name: 'dropdownDescription',
      title: 'Dropdown Description',
      type: 'string',
      description: 'Short line shown in the nav dropdown',
    }),

    // ── Hero ───────────────────────────────────────────────────
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'highlightedKeyword',
      title: 'Highlighted Keyword (in headline)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'heroMetrics',
      title: 'Hero Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),

    // ── Why Section ────────────────────────────────────────────
    defineField({
      name: 'whyTitle',
      title: 'Why Section Title',
      type: 'string',
    }),
    defineField({
      name: 'whyDescription',
      title: 'Why Section Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whyBullets',
      title: 'Why Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ── Feature Cards ──────────────────────────────────────────
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Card Title', type: 'string' },
            { name: 'description', title: 'Card Description', type: 'text', rows: 2 },
            {
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: { hotspot: true },
            },
            { name: 'imageUrl', title: 'Or Image URL', type: 'url', description: 'Fallback if no Sanity image uploaded' },
          ],
          preview: { select: { title: 'title', media: 'image' } },
        },
      ],
    }),

    // ── Card / Overview ────────────────────────────────────────
    defineField({
      name: 'cardTitle',
      title: 'Services Overview Card Title',
      type: 'string',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Services Overview Card Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cardImage',
      title: 'Services Overview Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cardImageUrl',
      title: 'Or Card Image URL',
      type: 'url',
    }),

    // ── Final CTA ──────────────────────────────────────────────
    defineField({ name: 'finalCtaTitle', title: 'Final CTA Title', type: 'string' }),
    defineField({ name: 'finalCtaDescription', title: 'Final CTA Description', type: 'text', rows: 2 }),

    // ── Optional Sections ──────────────────────────────────────
    defineField({
      name: 'problems',
      title: 'Problems Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Problem Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Solution Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number (e.g. "01")', type: 'string' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'step', subtitle: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Benefit Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'overview', title: 'Overview', type: 'text', rows: 2 },
        { name: 'client', title: 'Client', type: 'string' },
        { name: 'quote', title: 'Client Quote', type: 'text', rows: 3 },
        {
          name: 'image',
          title: 'Case Study Image',
          type: 'image',
          options: { hotspot: true },
        },
        { name: 'imageUrl', title: 'Or Image URL', type: 'url' },
        {
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'value', title: 'Value', type: 'string' },
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqItems',
      title: 'Service-specific FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    // ── SEO ────────────────────────────────────────────────────
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
})
