type Lang = 'en' | 'ar'

// Backend language values (Sanity uses uppercase)
type BackendLang = 'EN' | 'AR'

type Link = { text: string, link: string }

type Button = { text: string, link: string }

type Content = {
    title: string;
    description: string;
    media: string;
    isVideo?: boolean;
    video?: string;
}

// Cards
type BlogCard = {
    _key: string;
    title: string;
    date: { day: number; month: string } | string;
    link?: string;
    img: any;
    category: string;
    content?: Content[];
}

type CaseSectionCard = {
    _key: string;
    title: string;
    description: string;
    button: { text: string; link: string };
    img: any;
    category: string;
    content?: Content[];
}

type IntroCard = {
    _key: string;
    title: string;
    description: string;
    img: any;
}

type NumberCard = {
    _key: string;
    title: string;
    number: number;
    numberUnit: string;
}

type ToolCard = {
    _key: string;
    title: string;
    link: string;
    img: any;
    content?: Content[];
}

type FQACard = {
    _key: string;
    question: string,
    answer: string
}

// Sections
interface FAQSection {
    title: string,
    description: string,
    faqCards: FQACard[],
}

type CardSection = {
    secondaryButton?: Button,
    primaryButton?: Button,
    button?: Button,
    mutedText: string,
    title: string,
    description: string,
    cards: any[]
}

type IntroSectionContent = {
    mutedText: string;
    title: string;
    description: string;
    primaryButton: { text: string; link: string };
    secondaryButton: { text: string; link: string };
    img: any;
    introCards: IntroCard[];
}

type SectionContent = {
    mutedText?: string,
    title: string,
    description: string,
    button: Button
}

type SocialMedia = {
    _key: string,
    icon: any,
    link: string
}

// API
interface layout {
    logo: any;
    phone: string;
    address: string;
    email: string;
    socialMedia: {
        _key: string;
        link: string;
        platform: string;
        media: string;
    }[]
}

interface intro {
    title: string,
    mutedText: string,
    description: string,
    primaryButton: Button,
    secondaryButton: Button,
    introImage: any,
    introCards: IntroCard[],
    numbers: NumberCard[],
}


interface tool {
    title: string,
    description: string,
    button: Button,
    toolCards: ToolCard[],
}

interface caseStudy {
    title: string,
    mutedText: string,
    description: string,
    caseCards: CaseSectionCard[],
}

interface blog {
    title: string,
    mutedText: string,
    description: string,
    blogCards: BlogCard[],
}
/**
 * Footer
 * Navbar - Logo
 * FQAs Section
 */

export type {
    Lang,
    BackendLang,
    BlogCard,
    Button,
    CardSection,
    CaseSectionCard,
    Content,
    FAQSection,
    IntroCard,
    IntroSectionContent,
    Link,
    NumberCard,
    SectionContent,
    SocialMedia,
    ToolCard,
    layout,
    intro,
    tool,
    caseStudy,
    blog
}
