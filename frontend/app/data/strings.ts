import { Lang, Link } from "./types";

const Pages: {
  [K in Lang]: Link[];
} = {
    'ar': [
        { text: "الرئيسية", link: "/" },
        { text: "دراسات الحالة", link: "/case" },
        { text: "تعرف علي", link: "/about" },
        { text: "أدوات", link: "/tool" },
        { text: "المدونات", link: "/blog" },
        { text: "الأسئلة الشائعة", link: "/faq" },
        { text: "اتصل بنا", link: "/contact" },
    ],
    'en': [
        { text: "Home", link: "/" },
        { text: "Case Studies", link: "/case" },
        { text: "About Me", link: "/about" },
        { text: "Tools", link: "/tool" },
        { text: "Blogs", link: "/blog" },
        { text: "FAQs", link: "/faq" },
        { text: "Contact Us", link: "/contact" },
    ]
}

// it being used in useQuery key too
const PagesObj = {
    Home: { text: "layout", link: "/" },
    Intro: { text: "intro", link: "/" },
    Cases: { text: "case", link: "/case" },
    Tools: { text: "tool", link: "/tool" },
    Blogs: { text: "blog", link: "/blog" },
    FAQs: { text: "faq", link: "/faq" },
    ContactUs: { text: "contact", link: "/contact" },
    AboutMe: { text: "aboutMe", link: "/about" },
}

// Layout
// const layout = await getLayout()

// const NavbarStrings = {
//     Logo: urlForImage(layout.logo),
//     links: Pages
// }

export {
  Pages,
  // NavbarStrings,
  PagesObj,
};
