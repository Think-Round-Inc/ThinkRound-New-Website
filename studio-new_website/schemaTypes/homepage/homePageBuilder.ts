import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePageBuilder',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Add text, images, videos, and button rows in display order.',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
        defineArrayMember({type: 'videoBlock'}),
        defineArrayMember({type: 'videoFeatureBlock'}),
        defineArrayMember({type: 'buttonRow'}),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare(selection) {
      const count = Array.isArray(selection.content) ? selection.content.length : 0
      return {
        title: selection.title || 'Homepage',
        subtitle: `${count} block${count === 1 ? '' : 's'}`,
      }
    },
  },
})
