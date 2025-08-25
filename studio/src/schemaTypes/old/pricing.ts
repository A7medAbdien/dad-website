import { defineType, defineField, defineArrayMember } from 'sanity'

export const pricing = defineType({
  type: "document",
  name: "pricing",
  title: "Pricing page",
  fields: [
    defineField({ type: "string", name: "title" }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ type: "string", name: "description" }),
    defineField({
      type: "array",
      name: "plans",
      of: [defineArrayMember({ type: "reference", to: [{ type: "plan" }] })],
    }),
  ],
});

