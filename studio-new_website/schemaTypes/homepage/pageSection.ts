import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content Blocks',
      type: 'array',
      description: 'Add text, image, video, and button blocks in the order they should appear.',
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
      content: 'content',
    },
    prepare(selection) {
      const itemCount = Array.isArray(selection.content) ? selection.content.length : 0
      return {
        title: 'Section',
        subtitle: `${itemCount} content block${itemCount === 1 ? '' : 's'}`,
      }
    },
  },
})
