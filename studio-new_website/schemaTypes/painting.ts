import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'painting',
  title: 'Painting',
  type: 'document',
  fields: [
    defineField({
      name: 'communitySlug',
      title: 'Community',
      type: 'string',
      description: 'Which community does this painting belong to?',
      options: {
        list: [
          {title: 'Christians', value: 'christians'},
          {title: 'Hindus / Sikhs', value: 'hindus-sikhs'},
          {title: 'Indigenous', value: 'indigenous'},
          {title: 'Jews', value: 'jews'},
          {title: 'Muslims', value: 'muslims'},
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Painting Title',
      type: 'string',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
    }),
    defineField({
      name: 'dateProduced',
      title: 'Date Produced',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Backyards, Fathers & Mothers, Girl & Boy Groups',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artistName',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
