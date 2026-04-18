import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'paradiseProject',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'subHeader',
      title: 'Sub-Header (e.g., A Think Round exhibit)',
      type: 'string',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body Text',
      type: 'text',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Enter Paradise',
    }),
  ],
  preview: {
    select: {
      media: 'heroImage',
    },
    prepare({media}) {
      return {
        title: 'Home Page',
        media,
      }
    }
  }
})
