import { defineType, defineField } from 'sanity';
import { LinkCaseDescription, buttonPrefix, content, imagePrefix } from '../../utils/commons';

const ToolCard = {
    type: "object",
    name: "toolCard",
    title: "Tool Card",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "string", name: "link", title: "Link(URL)" }),
        defineField({ ...imagePrefix, name: "img", title: "Image" }),
        defineField({
            type: "array",
            name: "content",
            title: "Content Sections",
            of: [content],
        }),
    ]
}

export const tool = defineType({
    type: "document",
    name: "tool",
    title: "Tools Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ ...buttonPrefix, name: "button", title: "Button", description: LinkCaseDescription }),
        defineField({
            type: "array",
            name: "toolCards",
            title: "Tool Cards Cards",
            of: [ToolCard],
        }),
    ],
});
