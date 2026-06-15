import { defineField, defineType } from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page Context',
      type: 'string',
      options: {
        list: [
          { title: 'Global / Home', value: 'global' },
          { title: 'Services (general)', value: 'services' },
          { title: 'SEO Service', value: 'seo' },
          { title: 'Social Media Service', value: 'social-media' },
          { title: 'PPC Service', value: 'ppc' },
          { title: 'Branding Service', value: 'branding' },
          { title: 'AI UGC Video Ads', value: 'ai-ugc-video-ads' },
          { title: 'Business Automation', value: 'business-automation' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'global',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Order (asc)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'page' },
  },
})
