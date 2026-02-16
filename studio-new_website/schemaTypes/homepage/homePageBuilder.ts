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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Add sections in display order from top to bottom.',
      of: [
        defineArrayMember({
          name: 'sectionItem',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Editor-only label to identify this section in the list.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content Blocks',
              type: 'array',
              description:
                'Add text, image, video, and button blocks in the order they should appear.',
              of: [
                defineArrayMember({type: 'richTextBlock'}),
                defineArrayMember({type: 'imageBlock'}),
                defineArrayMember({type: 'videoBlock'}),
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
              const itemCount = Array.isArray(selection.content) ? selection.content.length : 0
              return {
                title: selection.title || 'Section',
                subtitle: `${itemCount} content block${itemCount === 1 ? '' : 's'}`,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
    },
    prepare(selection) {
      const count = Array.isArray(selection.sections) ? selection.sections.length : 0
      return {
        title: selection.title || 'Homepage',
        subtitle: `${count} section${count === 1 ? '' : 's'}`,
      }
    },
  },
})
