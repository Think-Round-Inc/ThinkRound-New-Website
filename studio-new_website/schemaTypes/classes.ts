import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'classes',
  title: 'Classes',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading text (e.g., "We offer private and group lessons for all ages in the following areas:")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'programs',
      title: 'Programs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of programs/classes offered',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'footerMessage',
      title: 'Footer Message',
      type: 'text',
      description: 'Message displayed at the bottom of the classes page',
    }),
  ],
})

