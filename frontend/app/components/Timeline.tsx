"use client";

import clsx from "clsx";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import BasicAppearance from "@/app/animation/BasicAppearance";
import Image from "@/app/components/Image";
import { urlForImage } from "@/sanity/lib/utils";
import type { AboutMeQueryResult } from "@/sanity.types";

type ITimeline = AboutMeQueryResult & {
    showOnly?: number;
    currentLang?: string;
};

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline: React.FC<ITimeline> = ({
    timeline,
    heading,
    description,
    showOnly = 0,
    currentLang = 'en',
}) => {
    const lang = currentLang;

    // Handle null timeline safely
    if (!timeline || timeline.length === 0) {
        return (
            <div className="w-full md:px-10">
                <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 md:px-8 lg:px-10">
                    <h1 className="text-5xl lg:text-7xl mb-4 font-bold max-w-4xl">
                        {heading || 'About Me'}
                    </h1>
                    <p className="text-md lg:text-x max-w-sm">
                        {description || 'No content available'}
                    </p>
                </div>
            </div>
        );
    }

    const data: TimelineEntry[] = timeline
        .slice(-1 * showOnly)
        .map((item, index) => ({
            title: item.title || `Timeline Item ${index + 1}`,
            content: (
                <>
                    <p className="text-neutral-800  text-lg md:text-xl font-normal mb-8">
                        {item.description || ''}
                    </p>
                    {item.images && item.images.length > 0 && (
                        <BasicAppearance className="grid grid-cols-2 gap-4">
                            {item.images.map((image, imageIndex) => (
                                <Image
                                    key={imageIndex + index}
                                    src={urlForImage(image) as any}
                                    alt={`image ${imageIndex}`}
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34, _42, _53, _0.06),_0_1px_1px_rgba(0, _0, _0, _0.05),_0_0_0_1px_rgba(34, _42, _53, _0.04),_0_0_4px_rgba(34, _42, _53, _0.08),_0_16px_68px_rgba(47, _48, _55, _0.05),_0_1px_0_rgba(255, _255, _255, _0.1)_inset]"
                                />
                            ))}
                        </BasicAppearance>
                    )}
                </>
            ),
        }));

    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full md:px-10" ref={containerRef}>
            <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 md:px-8 lg:px-10">
                <h1 className="text-5xl lg:text-7xl mb-4 font-bold max-w-4xl">
                    {heading || 'About Me'}
                </h1>
                <p className="text-md lg:text-x max-w-sm">
                    {description || 'No description available'}
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        {/* Dot */}
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div
                                className={clsx(
                                    "h-10 absolute w-10 rounded-full bg-white flex items-center justify-center",
                                    { "left-3": lang == "en" },
                                    { "right-3": lang == "ar" }
                                )}
                            >
                                <div className="h-4 w-4 rounded-full bg-primary-500 border border-primary-300 p-2" />
                            </div>
                            <h3
                                className={clsx(
                                    "hidden md:block text-xl md:text-5xl font-bold text-primary-500",
                                    { "md:pl-20": lang == "en" },
                                    { "md:pr-20": lang == "ar" }
                                )}
                            >
                                {item.title}
                            </h3>
                        </div>

                        {/* Content */}
                        <div
                            className={clsx(
                                "relative  w-full",
                                { "pl-20 pr-4 md:pl-4": lang == "en" },
                                { "pr-20 pl-4 md:pr-4": lang == "ar" }
                            )}
                        >
                            <h3
                                className={clsx(
                                    "md:hidden block text-2xl mb-4 text-left font-bold text-primary-800",
                                    { "text-left": lang == "en" },
                                    { "text-right": lang == "ar" }
                                )}
                            >
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className={clsx(
                        "absolute left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]",
                        { "left-8": lang == "en" },
                        { "right-8": lang == "ar" }
                    )}
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
