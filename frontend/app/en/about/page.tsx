import { Timeline } from "@/app/components/Timeline";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutMeQuery } from "@/sanity/lib/queries";
import type { Metadata } from 'next';

/**
 * Generate metadata for the English about page.
 */
export async function generateMetadata(): Promise<Metadata> {
    const { data } = await sanityFetch({
        query: aboutMeQuery,
        params: { lang: 'EN' },
        stega: false,
    });

    return {
        title: data?.heading || 'About Me',
        description: data?.subheading || data?.description || 'Learn more about me',
    };
}

export default async function AboutPageEN() {
    const { data } = await sanityFetch({
        query: aboutMeQuery,
        params: { lang: 'EN' },
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
                        Content not found for English
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-12 lg:my-24" lang="en" dir="ltr">
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
            <Timeline {...data} currentLang="en" />
        </div>
    );
}
