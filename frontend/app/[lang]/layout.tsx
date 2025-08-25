import { notFound } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

// Valid languages
const validLanguages = ['en', 'ar'];

export default async function LangLayout({ children, params }: Props) {
    const { lang } = await params;

    // Validate language parameter
    if (!validLanguages.includes(lang.toLowerCase())) {
        notFound();
    }

    return (
        <div lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {children}
        </div>
    );
}
