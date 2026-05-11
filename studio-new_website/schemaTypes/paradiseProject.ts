import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'paradiseProject',
  title: 'Paradise Project',
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
    defineField({
      name: 'communities',
      title: 'Communities',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'community',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'slug',
              title: 'Slug (used in URL)',
              type: 'slug',
              options: {
                source: (_doc: unknown, context: { parent?: { name?: string } }) =>
                  context.parent?.name ?? '',
              },
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'familyCount',
              title: 'Number of Families',
              type: 'number',
            }),
            defineField({
              name: 'paintingCount',
              title: 'Number of Paintings',
              type: 'number',
            }),
            defineField({
              name: 'comingSoon',
              title: 'Coming Soon',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'launchDate',
              title: 'Launch Date (shown when Coming Soon is on)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'name', media: 'image'},
          },
        },
      ],
    }),
    defineField({
      name: 'viewAll',
      title: 'View All Card',
      type: 'object',
      fields: [
        defineField({
          name: 'familyCount',
          title: 'Total Number of Families',
          type: 'number',
        }),
        defineField({
          name: 'paintingCount',
          title: 'Total Number of Paintings',
          type: 'number',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'heroImage',
    },
    prepare({media}) {
      return {
        title: 'Paradise Project',
        media,
      }
    },
  },
})
