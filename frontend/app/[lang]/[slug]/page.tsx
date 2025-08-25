import type {Metadata} from 'next'
import Head from 'next/head'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{lang: string, slug: string}>
}

// Helper function to convert frontend lang to backend lang
function mapLanguage(lang: string): string {
    switch (lang.toLowerCase()) {
        case 'en':
            return 'EN';
        case 'ar':
            return 'AR';
        default:
            return 'EN';
    }
}

// Helper function to validate language
function isValidLanguage(lang: string): boolean {
    return ['en', 'ar'].includes(lang.toLowerCase());
}

/**
 * Generate the static params for the page.
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })

  // Generate params for both languages
  const params = [];
  for (const page of data || []) {
    params.push({ lang: 'en', slug: page.slug });
    params.push({ lang: 'ar', slug: page.slug });
  }

  return params;
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { lang, slug } = params;

  if (!isValidLanguage(lang)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found'
    };
  }

  const mappedLang = mapLanguage(lang);

  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: { slug },
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const { lang, slug } = params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  const mappedLang = mapLanguage(lang);

  const [{data: page}] = await Promise.all([sanityFetch({
    query: getPageQuery,
    params: { slug }
  })])

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {page.heading}
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
