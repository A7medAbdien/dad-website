import { defineField, defineType } from "sanity";
import { imagePrefix } from "../../utils/commons";

export const content = defineType({
    type: "document",
    name: "content",
    title: "Content Section",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "content", title: "Content" }),
        defineField({ ...imagePrefix, name: "media", title: "Image" }),
    ]
});
