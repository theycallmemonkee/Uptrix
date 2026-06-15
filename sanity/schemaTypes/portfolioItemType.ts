import { defineField, defineType } from 'sanity'

export const portfolioItemType = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI SEO', value: 'ai-seo' },
          { title: 'Google Ads', value: 'google-ads' },
          { title: 'Meta Ads', value: 'meta-ads' },
          { title: 'Social Media', value: 'social' },
          { title: 'Website Development', value: 'websites' },
          { title: 'Business Automation', value: 'automation' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'approach',
      title: 'Approach / Process',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
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
      name: 'takeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Project Screenshots / Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show on the homepage portfolio preview',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'clientQuote',
      title: 'Client Testimonial Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  orderings: [
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  },
})
