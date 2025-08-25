import { redirect } from 'next/navigation';

export default function AboutRedirect() {
    // Redirect to the default language (English)
    redirect('/en/about');
}
