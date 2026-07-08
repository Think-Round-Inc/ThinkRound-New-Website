import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'turningTheTide',
  title: 'Turning The Tide of Trauma',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'quote1',
      title: 'Quote 1',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'paragraph3',
      title: 'Paragraph 3',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'quote2',
      title: 'Quote 2',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'linkname',
              title: 'Link Name',
              type: 'string',
            },
            {
              name: 'linkurl',
              title: 'Link URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
