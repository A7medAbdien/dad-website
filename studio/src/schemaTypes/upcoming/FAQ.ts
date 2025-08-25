import { defineType, defineField } from 'sanity';

const FAQCard = {
    type: "object",
    name: "faqCard",
    title: "FAQ Card",
    fields: [
        defineField({ type: "string", name: "question", title: "Question" }),
        defineField({ type: "text", name: "answer", title: "Answer" }),
    ]
}

export const faq = defineType({
    type: "document",
    name: "faq",
    title: "FAQ Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({
            type: "array",
            name: "faqCards",
            title: "FAQ Cards",
            of: [FAQCard],
        }),
    ],
});
