/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'
import { structure } from './src/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import { assist } from '@sanity/assist'
import { langField } from './src/utils/lang'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string, lang?: string): string | undefined {
  const language = lang?.toLowerCase() || 'en'; // Default to English

  switch (documentType) {
    case 'post':
      return slug ? `/${language}/posts/${slug}` : undefined
    case 'page':
      return slug ? `/${language}/${slug}` : undefined
    case 'AboutMe':
      return `/${language}/about`
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

const noLangSchemasNames = [
  'page',
  'post',
  'person',
  'settings',
]
// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'Sanity + Next.js Starter Template',

  projectId,
  dataset,

  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "settings" && _id == "siteSettings"`,
          },
          {
            route: '/:lang/about',
            filter: `_type == "AboutMe" && lang == upper($lang)`,
          },
          {
            route: '/about',
            filter: `_type == "AboutMe" && lang == "EN"`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'This document is used on all pages',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: `${doc?.title || 'Untitled'} (EN)`,
                  href: resolveHref('post', doc?.slug, 'en')!,
                },
                {
                  title: `${doc?.title || 'Untitled'} (AR)`,
                  href: resolveHref('post', doc?.slug, 'ar')!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
          AboutMe: defineLocations({
            select: {
              heading: 'heading',
              lang: 'lang',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: `About Me (${doc?.lang || 'EN'})`,
                  href: resolveHref('AboutMe', undefined, doc?.lang)!,
                },
                {
                  title: 'Home',
                  href: '/',
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes.map((schema) => {
      // Only add language field to document types, not objects or other types
      if (schema.type === 'document' && !noLangSchemasNames.includes(schema.name)) {
        return {
          ...schema,
          fields: [langField, ...schema.fields],
          preview: {
            ...schema.preview,
            select: {
              ...schema.preview?.select,
              lang: 'lang'
            },
            prepare: (selection: any) => {
              const { lang, ...rest } = selection
              const originalPrepare = schema.preview?.prepare
              const basePreview = originalPrepare ? originalPrepare(selection) : { title: rest.title || rest.name || lang }

              return {
                title: lang || basePreview.title,
                subtitle: lang ? `Language: ${lang}${(basePreview as any).subtitle ? ` • ${(basePreview as any).subtitle}` : ''}` : (basePreview as any).subtitle,
                media: (basePreview as any).media
              }
            }
          }
        }
      }
      return schema
    }),
  },
})
