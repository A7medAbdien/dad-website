import { defineType, defineField } from 'sanity'
import { imagePrefix } from '../../utils/commons';

const socialMedia = {
    type: "object",
    name: "socialMediaLink",
    title: "Social Media",
    fields: [
        defineField({ type: "string", name: "platform", title: "Platform" }),
        defineField({ type: "string", name: "link", title: "Link/Url" }),
        defineField({ ...imagePrefix, name: "media", title: "Image" }),
    ]
}

export const layout = defineType({
    type: "document",
    name: "layout",
    title: "General Information",
    fields: [
        defineField({ ...imagePrefix, name: "logo", title: "Logo" }),
        defineField({ type: "string", name: "phone", title: "Phone" }),
        defineField({ type: "string", name: "address", title: "Address" }),
        defineField({ type: "string", name: "email", title: "Email" }),
        defineField({
            type: "array",
            name: "socialMedia",
            title: "Social Media",
            of: [socialMedia],
        }),
    ],
});
