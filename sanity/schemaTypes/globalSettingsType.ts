import { defineField, defineType } from 'sanity'

export const globalSettingsType = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Displayed in FAQ contact card and contact page (e.g. +91 87961 60561)',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Primary contact email shown on the contact page',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      description: 'Short tagline shown below the logo in the footer',
    }),
    defineField({
      name: 'footerCtaHeadline',
      title: 'Footer CTA Headline',
      type: 'string',
      description: 'Large CTA text in footer (e.g. "Let\'s Talk About Your Business With Us")',
    }),
    defineField({
      name: 'footerCtaButtonLabel',
      title: 'Footer CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'footerNavLinks',
      title: 'Footer Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'footerSystems',
      title: 'Footer Services/Systems Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Global Settings' }),
  },
})
