import {defineField, defineType} from 'sanity'

type VideoFeatureParent = {
  sourceType?: 'url' | 'upload'
}

export default defineType({
  name: 'videoFeatureBlock',
  title: 'Video + Content Block',
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
      hidden: ({parent}) => (parent as VideoFeatureParent | undefined)?.sourceType !== 'url',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as VideoFeatureParent | undefined
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
      hidden: ({parent}) => (parent as VideoFeatureParent | undefined)?.sourceType !== 'upload',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as VideoFeatureParent | undefined
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
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Video Left, Content Right', value: 'videoLeft'},
          {title: 'Content Left, Video Right', value: 'videoRight'},
        ],
        layout: 'radio',
      },
      initialValue: 'videoLeft',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'posterImage',
      layout: 'layout',
    },
    prepare(selection) {
      const layoutLabel = selection.layout === 'videoRight' ? 'content left' : 'video left'
      return {
        title: selection.title || 'Video + Content Block',
        subtitle: layoutLabel,
        media: selection.media,
      }
    },
  },
})
