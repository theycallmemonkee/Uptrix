import { type SchemaTypeDefinition } from 'sanity'

// Existing blog schemas
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'

// Site content schemas
import { globalSettingsType } from './globalSettingsType'
import { homePageType } from './homePageType'
import { aboutPageType } from './aboutPageType'
import { contactPageType } from './contactPageType'
import { faqItemType } from './faqItemType'
import { testimonialType } from './testimonialType'
import { serviceType } from './serviceType'
import { solutionType } from './solutionType'
import { portfolioItemType } from './portfolioItemType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog
    blockContentType,
    categoryType,
    postType,
    authorType,
    // Site content
    globalSettingsType,
    homePageType,
    aboutPageType,
    contactPageType,
    faqItemType,
    testimonialType,
    serviceType,
    solutionType,
    portfolioItemType,
  ],
}
