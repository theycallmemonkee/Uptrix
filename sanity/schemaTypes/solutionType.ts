import { defineField, defineType } from 'sanity'

export const solutionType = defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL slug — e.g. demand-generation-system, paid-growth-engine',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Solution Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      description: 'Shown in the solutions dropdown/mega-menu',
    }),
    defineField({
      name: 'headline',
      title: 'Page Headline',
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
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'problemStatement',
      title: 'Problem Statement',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'systemComponents',
      title: 'System Components',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Component Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Expected Results / Outcomes',
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
    defineField({
      name: 'faqItems',
      title: 'Solution FAQs',
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
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
})
