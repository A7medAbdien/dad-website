import { defineType, defineField } from 'sanity';
import { LinkCaseDescription, content, imagePrefix } from '../../utils/commons';

const BlogCard = {
    type: "object",
    name: "blogCard",
    title: "Blog Card",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "string", name: "category", title: "Category" }),
        defineField({ type: "string", name: "link", title: "Link(URL)", description: LinkCaseDescription }),
        defineField({ ...imagePrefix, name: "img", title: "Image" }),
        defineField({
            title: 'Release date',
            name: 'date',
            type: 'date',
            options: {
                dateFormat: 'MMM-DD',
            },
        }),
        defineField({
            type: "array",
            name: "content",
            title: "Content Sections",
            of: [content],
        }),
    ]
}

export const blog = defineType({
    type: "document",
    name: "blog",
    title: "Blogs Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "string", name: "mutedText", title: "Small text above the Tile" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({
            type: "array",
            name: "blogCards",
            title: "Blog Cards",
            description: "The first three cards will be shown in the landing page",
            of: [BlogCard],
        }),
    ],
});
