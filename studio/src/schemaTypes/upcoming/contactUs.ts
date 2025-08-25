import { defineField, defineType } from "sanity";

export const contactUs = defineType({
    type: "document",
    name: "contact",
    title: "Contact Us Page",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ type: "string", name: "location", title: "Location Link" }),
    ],
});