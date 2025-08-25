import { defineField } from "sanity"

export const LinkCaseDescription = "if you added a link to the button, there is no need to add content" 

export const imagePrefix = {
    type: 'image',
    options: {
        hotspot: true // <-- Defaults to false
    },
    fields: [
        {
            name: 'attribution',
            type: 'string',
            title: 'Attribution',
        }
    ]
}

export const videoPrefix = {
    type: 'file',
    options: {
      accept: 'video/*'
    }
}

export const content = {
    type: "object",
    name: "content",
    title: "Content Section",
    fields: [
        defineField({ type: "string", name: "title", title: "Title" }),
        defineField({ type: "text", name: "description", title: "Description" }),
        defineField({ type:"boolean", name: "isVideo", title: "is Video" }),
        defineField({ ...imagePrefix, name: "media", title: "Image" }),
        defineField({ ...videoPrefix, name: "video", title: "Video" }),
    ]
}

export const buttonPrefix = {
    type: "object",
    name: "button",
    title: "Button",
    fields: [
        defineField({ type: "string", name: "text", title: "Text" }),
        defineField({ type: "string", name: "link", title: "Link/Url to another website", description: LinkCaseDescription }),
    ]
}
