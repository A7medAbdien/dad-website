import { defineType, defineField } from 'sanity';
import { LinkCaseDescription, buttonPrefix, content, imagePrefix } from '../../utils/commons';

const CaseCard = {
    type: "object",
    name: "caseCard",
    title: "Case Study Card",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ ...buttonPrefix, name: "button", title: "Button", description: LinkCaseDescription }),
        defineField({ type: "string", name: "category", title: "Category" }),
        defineField({ ...imagePrefix, name: "img", title: "Image" }),
        defineField({
            type: "array",
            name: "content",
            title: "Content Sections",
            of: [content],
        }),
    ]
}

export const caseStudy = defineType({
    type: "document",
    name: "case",
    title: "Case Studies Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "string", name: "mutedText", title: "Small text above the Tile" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({
            type: "array",
            name: "caseCards",
            title: "Case Studies Cards",
            description: "The first three cards will be shown in the landing page",
            of: [CaseCard],
        }),
    ],
});
