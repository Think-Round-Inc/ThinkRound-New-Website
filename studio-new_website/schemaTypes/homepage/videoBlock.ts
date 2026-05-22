import {defineField, defineType} from 'sanity'

type VideoBlockParent = {
  sourceType?: 'url' | 'upload'
}

export default defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  fields: [
    defineField({
      name: 'sourceType',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          {title: 'External URL', value: 'url'},
          {title: 'Upload to Sanity', value: 'upload'},
        ],
        layout: 'radio',
      },
      initialValue: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => (parent as VideoBlockParent | undefined)?.sourceType !== 'url',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as VideoBlockParent | undefined
          if (parent?.sourceType === 'url' && !value) {
            return 'Video URL is required when source is External URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => (parent as VideoBlockParent | undefined)?.sourceType !== 'upload',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as VideoBlockParent | undefined
          if (parent?.sourceType === 'upload' && !value) {
            return 'Video file is required when source is Upload to Sanity'
          }
          return true
        }),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false}),
    defineField({name: 'muted', title: 'Muted', type: 'boolean', initialValue: false}),
    defineField({name: 'loop', title: 'Loop', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {
      sourceType: 'sourceType',
      media: 'posterImage',
    },
    prepare(selection) {
      const sourceLabel = selection.sourceType === 'upload' ? 'Upload' : 'URL'
      return {
        title: `Video Block (${sourceLabel})`,
        media: selection.media,
      }
    },
  },
})
