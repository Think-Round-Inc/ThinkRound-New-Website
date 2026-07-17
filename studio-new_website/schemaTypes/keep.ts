import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'keep',
  title: 'Keep',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'link1',
      title: 'Link1',
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
    }),
    defineField({
      name: 'image1',
      title: 'Image 1',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption1',
      title: 'Caption 1',
      type: 'string',
    }),
    defineField({
      name: 'image2',
      title: 'Image 2',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption2',
      title: 'Caption 2',
      type: 'string',
    }),
    defineField({
      name: 'image3',
      title: 'Image 3',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption3',
      title: 'Caption 3',
      type: 'string',
    }),
    defineField({
      name: 'image4',
      title: 'Image 4',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image5',
      title: 'Image 5',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption5',
      title: 'Caption 5',
      type: 'string',
    }),
    defineField({
      name: 'image6',
      title: 'Image 6',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'link2',
      title: 'Link2',
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
    }),
  ],
})
