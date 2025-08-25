import { person } from './documents/person'
import { page } from './documents/page'
import { post } from './documents/post'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { settings } from './singletons/settings'
import { link } from './objects/link'
import { blockContent } from './objects/blockContent'
import { layout } from './old/layout'
import { intro } from './old/intro'
import { tool } from './old/tool'
import { caseStudy } from './old/caseStudy'
import { blog } from './old/blog'
import { faq } from './old/FAQ'
import { contactUs } from './old/contactUs'
import { AboutMe } from './old/aboutMr'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  // old
  layout,
  intro,
  tool,
  caseStudy,
  blog,
  faq,
  contactUs,
  AboutMe
]
