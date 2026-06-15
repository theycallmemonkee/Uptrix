import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small badge above headline (e.g. "Contact Uptrix")',
    }),
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',
      description: 'Main headline (e.g. "Let\'s Talk Growth")',
    }),
    defineField({
      name: 'body',
      title: 'Subtitle / Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'Contact Email (displayed)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone (displayed)',
      type: 'string',
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time Badge',
      type: 'string',
      description: 'e.g. "Within 24 business hours"',
    }),
    defineField({
      name: 'formSuccessTitle',
      title: 'Form Success Modal Title',
      type: 'string',
    }),
    defineField({
      name: 'formSuccessBody',
      title: 'Form Success Modal Body',
      type: 'text',
      rows: 2,
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
