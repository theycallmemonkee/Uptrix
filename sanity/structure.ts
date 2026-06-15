import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Uptrix CMS')
    .items([
      // ── Singletons ────────────────────────────────────────────
      S.listItem()
        .title('Global Settings')
        .id('globalSettings')
        .child(
          S.document()
            .schemaType('globalSettings')
            .documentId('singleton-global-settings')
            .title('Global Settings'),
        ),
      S.divider(),

      // ── Pages ─────────────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .id('homePage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('singleton-home-page')
                    .title('Home Page'),
                ),
              S.listItem()
                .title('About Page')
                .id('aboutPage')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('singleton-about-page')
                    .title('About Page'),
                ),
              S.listItem()
                .title('Contact Page')
                .id('contactPage')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('singleton-contact-page')
                    .title('Contact Page'),
                ),
            ]),
        ),
      S.divider(),

      // ── Services ───────────────────────────────────────────────
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('solution').title('Solutions'),
      S.divider(),

      // ── Content ────────────────────────────────────────────────
      S.documentTypeListItem('faqItem').title('FAQs'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('portfolioItem').title('Portfolio Items'),
      S.divider(),

      // ── Blog ───────────────────────────────────────────────────
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),
    ])
