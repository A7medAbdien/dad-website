import { defineField, defineType } from "sanity";
import { imagePrefix } from "../../utils/commons";

const images = {
    type: "array",
    name: "images",
    title: "Images",
    of: [imagePrefix],
}

const timeline = {
    type: "object",
    name: "timeline",
    title: "Timeline",
    fields: [
        defineField({ type: "string", name: "title", title: "Timeline Section Title" }),
        defineField({ type: "text", name: "description", title: "Timeline Section Description" }),
        defineField({ ...images }),
    ],
}

export const AboutMe = defineType({
    type: "document",
    name: "AboutMe",
    title: "About Me Page",
    fields: [
        defineField({
            type: "string",
            name: "name",
            title: "Page Name",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            type: "string",
            name: "heading",
            title: "Page Heading",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            type: "string",
            name: "subheading",
            title: "Page Subheading"
        }),
        defineField({
            type: "text",
            name: "description",
            title: "Page Description"
        }),
        defineField({
            type: "array",
            name: "timeline",
            title: "Timeline Content",
            of: [timeline],
        }),
    ],
});
