import { defineType, defineField } from 'sanity'

export const feature = defineType({
  type: "document",
  name: "feature",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({ type: "string", name: "description" }),
  ],
});

