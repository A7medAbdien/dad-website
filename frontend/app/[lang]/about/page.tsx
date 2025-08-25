import { Timeline } from "@/app/components/Timeline";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutMeQuery } from "@/sanity/lib/queries";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ lang: string }>
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
    return [
        { lang: 'en' },
        { lang: 'ar' }
    ];
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { lang } = params;

    if (!isValidLanguage(lang)) {
        return {
            title: 'About Me',
            description: 'Learn more about me'
        };
    }

    const mappedLang = mapLanguage(lang);

    const { data } = await sanityFetch({
        query: aboutMeQuery,
        params: { lang: mappedLang },
        stega: false,
    });

    return {
        title: data?.heading || 'About Me',
        description: data?.subheading || data?.description || 'Learn more about me',
    };
}

export default async function AboutPage(props: Props) {
    const params = await props.params;
    const { lang } = params;

    // Validate language parameter
    if (!isValidLanguage(lang)) {
        notFound();
    }

    const mappedLang = mapLanguage(lang);

    const { data } = await sanityFetch({
        query: aboutMeQuery,
        params: { lang: mappedLang },
        perspective: 'published',
        stega: false,
    });

    if (!data?._id) {
        return (
            <div className="py-40">
                <div className="container">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                        About Me
                    </h1>
                    <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600">
                        Content not found for {lang.toUpperCase()}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-12 lg:my-24">
            <div className="">
                <div className="container">
                    <div className="pb-6 border-b border-gray-100">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                                {data.heading}
                            </h2>
                            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                                {data.subheading}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Timeline {...data} currentLang={lang} />
        </div>
    );
}
