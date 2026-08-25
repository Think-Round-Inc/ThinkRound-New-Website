import {defineField, defineType} from 'sanity'

export const virtualExhibition = defineType({
  name: 'virtualExhibition',
  title: 'Virtual Exhibition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().error('Name of virtual exhibition is required'),
    }),
    defineField({
      name: 'virtualExhibitLink',
      type: 'url',
      validation: (rule) => rule.required().error('Link of virtual exhibition is required'),
    })
  ],
})