import { defineType, defineField } from 'sanity'
import { buttonPrefix, imagePrefix } from '../../utils/commons'


const numberCard = {
    type: "object",
    name: "numberCard",
    title: "Numbers",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "number", name: "number", title: "Number" }),
        defineField({ type: "string", name: "numberUnit", title: "Unit" }),
    ]
}
const introCard = {
    type: "object",
    name: "introCard",
    title: "Landing Page Card",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ ...imagePrefix, name: "img", title: "Image" }),
    ]
}

export const intro = defineType({
    type: "document",
    name: "intro",
    title: "Landing Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "string", name: "mutedText", title: "Small text above the Tile" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ ...buttonPrefix, name: "primaryButton", title: "Colored Button" }),
        defineField({ ...buttonPrefix, name: "secondaryButton", title: "Outlined Button" }),
        defineField({ ...imagePrefix, name: "introImage", title: "Landing Page Image" }),
        defineField({
            type: "array",
            name: "introCards",
            title: "Landing Page Cards",
            of: [introCard],
            validation: Rule => Rule.min(3).max(3) // Ensures array length is exactly 3
        }),
        defineField({
            type: "array",
            name: "numbers",
            title: "Landing Numbers",
            of: [numberCard],
            validation: Rule => Rule.min(4).max(4)
        }),
    ],
});