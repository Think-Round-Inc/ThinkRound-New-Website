import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'familyArtsProgram',
  title: 'Family Arts Program',
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
      name: 'paragraph1',
      title: 'Paragraph 1',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'image',
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraph 2',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'image',
    }),
    defineField({
      name: 'paragraph3',
      title: 'Paragraph 3',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image3',
      title: 'Image 3',
      type: 'image',
    }),
    defineField({
      name: 'paragraph4',
      title: 'Paragraph 4',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'linkname',
          title: 'Link Name',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        },
      ],
    }),
    defineField({
      name: 'paragraph5',
      title: 'Paragraph 5',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image4',
      title: 'Image 4',
      type: 'image',
    }),
    defineField({
      name: 'paragraph6',
      title: 'Paragraph 6',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
