import { defineType, defineField, defineArrayMember } from 'sanity'

export const plan = defineType({
  type: "document",
  name: "plan",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ type: "string", name: "description" }),
    defineField({ type: "number", name: "price" }),
    defineField({
      type: "array",
      name: "features",
      of: [defineArrayMember({ type: "reference", to: [{ type: "feature" }] })],
    }),
  ],
});

