import {defineField, defineType} from 'sanity'

export const virtualExhibitions3D = defineType({
  name: 'virtualExhibitions3D',
  title: 'Virtual Exhibitions in 3D',
  type: 'document',
  fields: [
    defineField({
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      validation: (rule) => rule.required().error('Main title is required'),
    }),
    defineField({
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
      validation: (rule) => rule.required().error('Sub title is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },  
      validation: (rule) => rule.required().error('Image is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required().error('Description is required'),
    }),
    defineField({
      name: 'virtualExhibitions',
      title: 'Virtual Exhibitions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'exhibitionTitle',
              title: 'Exhibition Title',
              type: 'string',
              validation: (rule) => rule.required().error('Exhibition title is required'),
            }),
            defineField({
              name: 'exhibitionUrl',
              title: 'Exhibition URL',
              type: 'url',
              validation: (rule) => rule.required().error('Exhibition URL is required'),
            }),
          ],
          preview: {
            select: {
              title: 'exhibitionTitle',
              subtitle: 'exhibitionUrl',
            },
          },
        }
      ],
      validation: (rule) => rule.required().error('At least one virtual exhibition is required'),
    }),
  ],
})